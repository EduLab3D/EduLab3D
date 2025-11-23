import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { Link, Route, Routes} from 'react-router-dom'
import './App.css'
import logo from './assets/logo.svg'
import BrowserMenu from './components/BrowserMenu'
import AboutPage from './pages/About'
import CreatorsPage from './pages/Creators'
import NotFound from './pages/NotFound'
import {IcosahedronGeometry, Vector3, type Group, type Mesh } from 'three'

type ExperimentLevel = 'Beginner' | 'Intermediate' | 'Advanced'

type Experiment = {
  id: string
  title: string
  summary: string
  level: ExperimentLevel
  duration: string
  focus: string
  tags: string[]
}

const EXPERIMENTS: Experiment[] = [
    {
        id: 'state-changes',
        title: "Water State Changes",
        summary: 'Dial temperature and pressure to observe water shifting between ice, liquid, and vapor in real time.',
        level: 'Beginner',
        duration: '7 min',
        focus: 'Thermodynamics',
        tags: ['Phase change', 'Latent heat'],
    },
  {
    id: 'boyles-law',
    title: "Boyle's Law Piston",
    summary: 'Compress or expand a virtual syringe to see the inverse relationship between pressure and volume.',
    level: 'Beginner',
    duration: '6 min',
    focus: 'Physics',
    tags: ['Gas laws', 'Pressure'],
  },
  {
    id: 'planet-orbits',
    title: 'Planet Orbit Sandbox',
    summary: 'Drag planets to adjust orbital radius and watch how period and velocity respond in real time.',
    level: 'Intermediate',
    duration: '8 min',
    focus: 'Astronomy',
    tags: ['Kepler', 'Gravity'],
  },
  {
    id: 'pendulum-playground',
    title: 'Pendulum Playground',
    summary: 'Set length and mass to explore how a pendulum’s period changes and compare runs side by side.',
    level: 'Beginner',
    duration: '5 min',
    focus: 'Physics',
    tags: ['Energy', 'Motion'],
  },
  {
    id: 'refraction-lab',
    title: 'Light Refraction Tank',
    summary: 'Swap materials in a shallow tank to visualize how indices of refraction bend a laser beam.',
    level: 'Intermediate',
    duration: '7 min',
    focus: 'Optics',
    tags: ['Snell’s law', 'Wave'],
  },
  {
    id: 'circuits-mini',
    title: 'Mini Circuit Builder',
    summary: 'Snap in batteries, bulbs, and switches to build simple series or parallel circuits with live current readouts.',
    level: 'Beginner',
    duration: '6 min',
    focus: 'Electronics',
    tags: ['Current', 'Voltage'],
  },
  {
    id: 'plate-tectonics',
    title: 'Plate Tectonics Slider',
    summary: 'Slide continental plates toward, past, or away from each other to see ridges, trenches, and quakes form.',
    level: 'Advanced',
    duration: '9 min',
    focus: 'Earth science',
    tags: ['Geology', 'Forces'],
  },
]

const WATER_TIPS = [
  'Use the sliders to move across the phase boundary and ask students to predict before revealing.',
  'Pause at 100°C to discuss latent heat—temperature stays pinned while phase shifts.',
  'Switch pressure to >2.4 atm and highlight how the boiling point climbs noticeably.'
]

const WATER_FACTS = [
  'Water’s triple point occurs at 0.01°C and 0.006 atm—a tricky scenario that requires vacuum chambers.',
  'Latent heat of vaporization is roughly 2260 kJ/kg, far larger than fusion (334 kJ/kg).',
  'High-pressure cooking works because steam cannot form until the liquid becomes much hotter.'
]

const PHASE_THRESHOLD = {
  minTemp: -40,
  maxTemp: 140,
  minPressure: 0.5,
  maxPressure: 3,
}

type WaterPhaseId = 'ice' | 'liquid' | 'vapor'

type PhaseState = 'solid' | 'liquid' | 'gas'

const PHASE_ANIMATION: Record<PhaseState, {
  noiseAmplitude: number
  noiseFrequency: number
  wobbleSpeed: number
  rotationSpeed: number
  drift: number
}> = {
  solid: {
    noiseAmplitude: 0.04,
    noiseFrequency: 2.5,
    wobbleSpeed: 0.6,
    rotationSpeed: 0.12,
    drift: 0,
  },
  liquid: {
    noiseAmplitude: 0.12,
    noiseFrequency: 3.8,
    wobbleSpeed: 1.2,
    rotationSpeed: 0.22,
    drift: 0.05,
  },
  gas: {
    noiseAmplitude: 0.22,
    noiseFrequency: 5.5,
    wobbleSpeed: 1.6,
    rotationSpeed: 0.35,
    drift: 0.12,
  },
}

const WATER_PHASES: Record<WaterPhaseId, {
  label: string
  description: string
  color: string
  vaporIntensity: number
  density: string
  enthalpy: string
  state: PhaseState
}> = {
  ice: {
    label: 'Solid (Ice)',
    description: 'Hydrogen bonds lock molecules into a lattice. Vibrations slow, density rises, and vapor almost disappears.',
    color: '#4be5ff',
    vaporIntensity: 0.05,
    density: '0.92 g/cm³',
    enthalpy: '334 kJ/kg',
    state: 'solid',
  },
  liquid: {
    label: 'Liquid',
    description: 'Molecules slip past each other; density peaks and surface tension plays a starring role in every lab demo.',
    color: '#4be5ff',
    vaporIntensity: 0.2,
    density: '0.997 g/cm³',
    enthalpy: '4.18 kJ/kg·K',
    state: 'liquid',
  },
  vapor: {
    label: 'Gas (Vapor)',
    description: 'Particles zip apart, filling any container. Pressure dominates behavior and convection cells ignite.',
    color: '#4be5ff',
    vaporIntensity: 0.45,
    density: '0.0006 g/cm³',
    enthalpy: '2260 kJ/kg',
    state: 'gas',
  },
}

const resolveWaterPhase = (temperature: number, pressure: number): WaterPhaseId => {
  if (temperature <= 0 && pressure >= 0.5) {
    return 'ice'
  }

  if (temperature >= 100 && pressure <= 2.4) {
    return 'vapor'
  }

  return 'liquid'
}

const useWaterPhase = () => {
  const [temperature, setTemperature] = useState(24)
  const [pressure, setPressure] = useState(1)
  const phaseId = useMemo(() => resolveWaterPhase(temperature, pressure), [temperature, pressure])
  const phase = WATER_PHASES[phaseId]

  return {
    temperature,
    pressure,
    phase,
    phaseId,
    setTemperature,
    setPressure,
  }
}

const WaterPhaseCard = ({ phase }: { phase: (typeof WATER_PHASES)[WaterPhaseId] }) => (
  <div className="water-phase__card">
    <p className="water-phase__eyebrow">Current Phase</p>
    <h2 className="water-phase__title">{phase.label}</h2>
    <p className="water-phase__copy">{phase.description}</p>
    <div className="water-phase__data">
      <div>
        <p>Density</p>
        <strong>{phase.density}</strong>
      </div>
      <div>
        <p>Energy</p>
        <strong>{phase.enthalpy}</strong>
      </div>
    </div>
  </div>
)

const WaterControls = ({
  temperature,
  pressure,
  setTemperature,
  setPressure,
}: {
  temperature: number
  pressure: number
  setTemperature: (value: number) => void
  setPressure: (value: number) => void
}) => (
  <div className="water-controls">
    <label>
      <span>Temperature ({temperature.toFixed(0)}°C)</span>
      <input
        type="range"
        min={PHASE_THRESHOLD.minTemp}
        max={PHASE_THRESHOLD.maxTemp}
        value={temperature}
        onChange={(event) => setTemperature(Number(event.target.value))}
      />
    </label>
    <label>
      <span>Pressure ({pressure.toFixed(2)} atm)</span>
      <input
        type="range"
        min={PHASE_THRESHOLD.minPressure}
        max={PHASE_THRESHOLD.maxPressure}
        step="0.05"
        value={pressure}
        onChange={(event) => setPressure(Number(event.target.value))}
      />
    </label>
  </div>
)

const TeachingTips = () => (
  <section className="water-section">
    <header>
      <p className="section-eyebrow">Teacher prompts</p>
      <h3>Turn slider moves into a think-pair-share moment.</h3>
    </header>
    <ul>
      {WATER_TIPS.map((tip) => (
        <li key={tip}>{tip}</li>
      ))}
    </ul>
  </section>
)

const WaterFacts = () => (
  <section className="water-section">
    <header>
      <p className="section-eyebrow">Demo nuggets</p>
      <h3>Lean on numbers when curiosity spikes.</h3>
    </header>
    <ul>
      {WATER_FACTS.map((fact) => (
        <li key={fact}>{fact}</li>
      ))}
    </ul>
  </section>
)

function HomePage() {
  return (
    <div className="hero-stage page-enter">
      <div
        style={{
          textAlign: 'center',
          color: '#fff',
          pointerEvents: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.8vw',
        }}
      >
        <div className="hero-lede">
          <p className="hero-lede__eyebrow">Welcome aboard</p>
          <h1>
            Welcome to our Universe,
            <br />
            EduLab3D!
          </h1>
          <p className="hero-lede__description">
            Interactive science experiments built for live class demos.
          </p>
          <div className="hero-lede__actions">
            <Link to="/experiments" className="gradient-button">
              <span>Get Started</span>
            </Link>
            <Link to="/about" className="ghost-button">
              Learn More
            </Link>
          </div>
        </div>

  <BrowserMenu />
      </div>
    </div>
  )
}

type PhaseConfig = (typeof WATER_PHASES)[WaterPhaseId]

const BASE_GEOMETRY = new IcosahedronGeometry(0.9, 3)
const BASE_POSITIONS = BASE_GEOMETRY.attributes.position.array as Float32Array
const VERTEX_DIRECTIONS = (() => {
  const directions = new Float32Array(BASE_POSITIONS.length)
  const temp = new Vector3()
  for (let i = 0; i < BASE_POSITIONS.length; i += 3) {
    temp.set(BASE_POSITIONS[i], BASE_POSITIONS[i + 1], BASE_POSITIONS[i + 2]).normalize()
    directions[i] = temp.x
    directions[i + 1] = temp.y
    directions[i + 2] = temp.z
  }
  return directions
})()

function PhaseBlob({ phase }: { phase: PhaseConfig }) {
     const meshRef = useRef<Mesh | null>(null)
     const wobbleRef = useRef(0)
     const targetPositions = useRef<Float32Array>(Float32Array.from(BASE_POSITIONS))

     useEffect(() => {
         const base = BASE_POSITIONS
         const profile = PHASE_ANIMATION[phase.state]
         const next = new Float32Array(base.length)

         for (let i = 0; i < base.length; i += 3) {
             const sampled =
                 VERTEX_DIRECTIONS[i] * profile.noiseFrequency +
                 VERTEX_DIRECTIONS[i + 1] * profile.noiseFrequency * 1.4 +
                 VERTEX_DIRECTIONS[i + 2] * profile.noiseFrequency * 1.8
             const distortion = 1 + profile.noiseAmplitude * Math.sin(sampled)
             next[i] = base[i] * distortion
             next[i + 1] = base[i + 1] * distortion
             next[i + 2] = base[i + 2] * distortion
         }

         targetPositions.current = next
     }, [phase.state])

     useFrame((_, delta) => {
         if (!meshRef.current) return
         const profile = PHASE_ANIMATION[phase.state]
         wobbleRef.current += delta * profile.wobbleSpeed

         const geometry = meshRef.current.geometry as IcosahedronGeometry
         const positionAttribute = geometry.attributes.position
         const currentArray = positionAttribute.array as Float32Array
         const base = BASE_POSITIONS
         const target = targetPositions.current

         for (let i = 0; i < currentArray.length; i++) {
             const current = currentArray[i]
             const next = base[i] + (target[i] - base[i]) * 0.65
             currentArray[i] = current + (next - current) * Math.min(delta * 4.5, 1)
         }

         positionAttribute.needsUpdate = true
         geometry.computeVertexNormals()

         meshRef.current.scale.setScalar(1)
         meshRef.current.rotation.y += delta * profile.rotationSpeed
         meshRef.current.rotation.x = Math.sin(wobbleRef.current * 0.5) * 0.12
         meshRef.current.position.y = Math.sin(wobbleRef.current) * profile.drift
     })

     return (
         <mesh ref={meshRef} geometry={BASE_GEOMETRY.clone()} castShadow>
             <meshStandardMaterial
                 color={phase.color}
                 metalness={phase.state === 'solid' ? 0.18 : 0.08}
                 roughness={phase.state === 'solid' ? 0.4 : phase.state === 'liquid' ? 0.2 : 0.08}
                 emissive={phase.color}
                 emissiveIntensity={phase.state === 'gas' ? 0.18 : 0.1}
             />
         </mesh>
     )
 }

function VaporParticles({ intensity }: { intensity: number }) {
    const groupRef = useRef<Group | null>(null)
    const particles = useMemo(
        () =>
            Array.from({ length: 36 }, (_, index) => ({
                id: index,
                position: [
                    (Math.random() - 0.5) * 2,
                    Math.random() * 1.6 + 0.3,
                    (Math.random() - 0.5) * 2,
                ] as [number, number, number],
                size: Math.random() * 0.08 + 0.02,
            })),
        [],
    )

    useFrame((_, delta) => {
        if (!groupRef.current) return
        groupRef.current.rotation.y += delta * 0.08
    })

    return (
        <group ref={groupRef} renderOrder={-1}>
            {particles.map((particle) => (
                <mesh key={particle.id} position={particle.position} scale={particle.size} castShadow={false} receiveShadow={false}>
                    <sphereGeometry args={[1, 8, 8]} />
                    <meshStandardMaterial color="#ffffff" transparent opacity={Math.min(intensity, 0.8)} depthWrite={false} />
                </mesh>
            ))}
        </group>
    )
}

function ThermalPlate() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
            <cylinderGeometry args={[1.5, 1.8, 0.08, 64]} />
            <meshStandardMaterial color="#111018" metalness={0.2} roughness={0.7} />
        </mesh>
    )
}

function WaterStatePage() {
  const { temperature, pressure, phase, setTemperature, setPressure } = useWaterPhase()

  return (
    <div className="page-shell water-page">
      <header className="page-header">
        <span className="page-eyebrow">Water State Lab</span>
        <div className="page-header__content">
          <h1 className="page-title">Dial temperature and pressure, watch the phase respond.</h1>
          <p className="page-lede">
            Students see an immediate response in the blob and the live metrics every time you nudge temperature or pressure. Use it to debate
            latent heat, triple points, or why pressure cookers boil higher.
          </p>
        </div>
        <span className="placeholder-pill" aria-label="All experiment copy uses finalized educator prompts">
          Includes guided teacher prompts
        </span>
      </header>

      <section className="water-lab__grid">
        <article className="glass-panel water-lab__panel">
          <WaterPhaseCard phase={phase} />

          <div className="water-metrics">
            <div className="water-metric">
              <p>Temperature</p>
              <strong>{temperature.toFixed(0)}°C</strong>
            </div>
            <div className="water-metric">
              <p>Pressure</p>
              <strong>{pressure.toFixed(2)} atm</strong>
            </div>
          </div>

          <WaterControls temperature={temperature} pressure={pressure} setTemperature={setTemperature} setPressure={setPressure} />

          <div className="water-phase__legend">
            <span className="water-phase__pill">Phase indicator updates with every slider move.</span>
            <Link to="/experiments" className="water-phase__cta">
              Browse other experiments ↗
            </Link>
          </div>
        </article>

        <article className="glass-panel water-lab__panel water-lab__panel--scene">
          <div className="water-lab__canvas">
            <Canvas camera={{ position: [0, 1.4, 3.2], fov: 45 }} shadows>
              <ambientLight intensity={0.55} />
              <directionalLight position={[2.5, 3, 2]} intensity={1.1} castShadow />
              <Suspense fallback={null}>
                <PhaseBlob phase={phase} />
                <VaporParticles intensity={phase.vaporIntensity} />
                <ThermalPlate />
                <Environment preset="city" />
              </Suspense>
              <ContactShadows position={[0, -0.9, 0]} opacity={0.45} blur={1.4} far={3} />
              <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={0.3} />
            </Canvas>
          </div>
          <p className="water-lab__hint">Three.js scene reacts to your slider inputs.</p>
        </article>
      </section>

      <TeachingTips />
      <WaterFacts />
    </div>
  )
}

function ExperimentsPage() {
  const levels: Array<'All' | ExperimentLevel> = ['All', 'Beginner', 'Intermediate', 'Advanced']
  const [activeLevel, setActiveLevel] = useState<'All' | ExperimentLevel>('All')
  const [query, setQuery] = useState('')
  const [focusFilter, setFocusFilter] = useState<'All' | string>('All')

  const focusAreas = useMemo(() => {
    const unique = new Set(EXPERIMENTS.map((experiment) => experiment.focus))
    return ['All', ...Array.from(unique)]
  }, [])

  const visibleExperiments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return EXPERIMENTS.filter((experiment) => {
      const matchesLevel = activeLevel === 'All' || experiment.level === activeLevel
      const matchesFocus = focusFilter === 'All' || experiment.focus === focusFilter
      if (!normalizedQuery) {
        return matchesLevel && matchesFocus
      }
      const haystack = [experiment.title, experiment.summary, experiment.focus, experiment.tags.join(' ')].join(' ').toLowerCase()
      return matchesLevel && matchesFocus && haystack.includes(normalizedQuery)
    })
  }, [activeLevel, focusFilter, query])

  return (
    <div className="experiments-page page-enter">
      <header className="experiments-page__hero">
        <p className="experiments-page__eyebrow">Live catalogue</p>
        <h1>Experiments built for curious classrooms.</h1>
        <p className="experiments-page__lede">
          Filter by level, subject focus, or concept to find the perfect starting point. Every simulation includes pacing tips,
          printable lab notes, and built-in assessment moments.
        </p>
        <div className="experiments-page__filters" role="tablist">
          {levels.map((level) => (
            <button
              key={level}
              type="button"
              role="tab"
              aria-pressed={activeLevel === level}
              className={`experiments-page__filter ${activeLevel === level ? 'is-active' : ''}`}
              onClick={() => setActiveLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="experiments-search">
          <label className="experiments-search__label">
            <span className="experiments-search__label-text">Search experiments</span>
            <div className="experiments-search__input">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.7"
                />
                <path
                  d="M20 20l-4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.7"
                />
              </svg>
              <input
                type="search"
                placeholder="Try “Boyle’s law” or “plasma”"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </label>
          <div className="experiments-search__chips" role="tablist">
            {focusAreas.map((area) => (
              <button
                key={area}
                type="button"
                role="tab"
                aria-pressed={focusFilter === area}
                className={`experiments-search__chip ${focusFilter === area ? 'is-active' : ''}`}
                onClick={() => setFocusFilter(area)}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </header>

      <p className="experiments-page__count">{visibleExperiments.length} matches</p>

      {visibleExperiments.length === 0 ? (
        <div className="experiments-page__empty">No experiments match that search yet. Try another term or focus area.</div>
      ) : (
        <div className="experiments-page__grid">
          {visibleExperiments.map((experiment) => (
            <article key={experiment.id} className="experiment-card">
              <div className="experiment-card__meta">
                <span className={`experiment-card__level level-${experiment.level.toLowerCase()}`}>{experiment.level}</span>
              </div>
              <h2>{experiment.title}</h2>
              <p>{experiment.summary}</p>
              <div className="experiment-card__footer">
                <span className="experiment-card__focus">{experiment.focus}</span>
                <div className="experiment-card__tags">
                  {experiment.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <Link to={`/experiments/${experiment.id}`} className="experiment-card__cta">
                Launch simulation
                <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <>
      <div
        style={{ position: 'absolute', top: '1vw', left: 0, right: 0, zIndex: 40, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}
      >
        <div className="nav-shell">
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="logo" className="nav-logo" />
          </Link>
          <div className="nav-links">
            <Link to="/experiments" className="nav-link nav-link--icon">
              <span>Browse</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experiments" element={<ExperimentsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/creators" element={<CreatorsPage />} />
        <Route path="*" element={<NotFound />} />
          <Route path="/experiments/state-changes" element={<WaterStatePage />} />
      </Routes>
    </>
  )
}

export default App
