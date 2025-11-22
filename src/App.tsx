import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { Link, Route, Routes} from 'react-router-dom'
import './App.css'
import logo from './assets/logo.svg'
import BrowserMenu from './components/BrowserMenu'
import CreatorsPage from './pages/Creators'
import NotFound from './pages/NotFound'
import type { Group, Mesh } from 'three'

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
  }
]




const CREATOR_SHOWCASE = [
  {
    name: 'DEVLOG',
    role: 'Creative Technologist',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium ligula risus, nec semper sem iaculis a.',
    tags: ['PM', 'Front-End', 'Experiments'],
  },
  {
    name: 'WAXIFYX',
    role: 'Learning Experience Lead',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dapibus suscipit justo, non posuere arcu pretium vel.',
    tags: ['PL', 'FullStack', 'Experiments'],
  },
]

const CREATOR_STACK = [
  {
    title: 'Toolchain',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc molestie sed ipsum eget feugiat.',
  },
  {
    title: 'Feedback loops',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst.',
  },
  {
    title: 'Pilot partner wishlist',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pretium mollis risus vitae facilisis.',
  },
]

type WaterPhaseId = 'ice' | 'liquid' | 'vapor'

const WATER_PHASES: Record<WaterPhaseId, { label: string; description: string; color: string; scale: number; vaporIntensity: number }> = {
  ice: {
    label: 'Solid (Ice)',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere augue elit, a semper libero tempor vitae.',
    color: '#8ecae6',
    scale: 0.85,
    vaporIntensity: 0.05,
  },
  liquid: {
    label: 'Liquid',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim libero nec orci eleifend venenatis.',
    color: '#38bdf8',
    scale: 1.1,
    vaporIntensity: 0.2,
  },
  vapor: {
    label: 'Gas (Vapor)',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra purus eget augue porta scelerisque.',
    color: '#f472b6',
    scale: 1.35,
    vaporIntensity: 0.45,
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

function HomePage() {
  return (
    <div className="hero-stage">
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
    <div className="experiments-page">
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
              <a href={`/experiments/${experiment.id}`} className="experiment-card__cta">
                Launch simulation
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function AboutPage() {
  return (
    <div className="page-shell about-page">
      <header className="page-header">
        <span className="page-eyebrow">About EduLab3D</span>
        <div className="page-header__content">
          <h1 className="page-title">A sandbox for every curious classroom.</h1>
          <p className="page-lede">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae purus nec lectus mollis elementum.</p>
        </div>
        <span className="placeholder-pill" aria-label="All sample copy uses lorem ipsum">
          Lorem ipsum placeholder copy
        </span>
      </header>

      <section className="about-metrics">
        {ABOUT_METRICS.map((metric) => (
          <article key={metric.label} className="glass-panel metric-card">
            <span className="metric-card__value">{metric.value}</span>
            <p className="metric-card__label">{metric.label}</p>
          </article>
        ))}
      </section>

      <section className="about-grid">
        {ABOUT_HIGHLIGHTS.map((highlight) => (
          <article key={highlight.title} className="glass-panel about-grid__card">
            <h2>{highlight.title}</h2>
            <p>{highlight.body}</p>
          </article>
        ))}
      </section>

      <section className="about-timeline">
        {ABOUT_MILESTONES.map((milestone) => (
          <article key={milestone.title} className="glass-panel timeline-card">
            <div className="timeline-card__label">{milestone.label}</div>
            <div>
              <h3>{milestone.title}</h3>
              <p>{milestone.body}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

function CreatorsPage() {
  return (
    <div className="page-shell creators-page">
      <header className="page-header">
        <span className="page-eyebrow">Creator Studio</span>
        <div className="page-header__content">
          <h1 className="page-title">Meet the builders behind the sims.</h1>
          <p className="page-lede">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius varius risus, quis accumsan dolor mattis vel.</p>
        </div>
        <span className="placeholder-pill" aria-label="All creator bios are lorem ipsum placeholders">
          Lorem ipsum placeholder copy
        </span>
      </header>

      <section className="creators-grid">
        {CREATOR_SHOWCASE.map((creator) => (
          <article key={creator.name} className="glass-panel creator-card">
            <div className="creator-avatar" aria-hidden="true">
              {creator.name
                .split(' ')
                .map((part) => part[0])
                .join('')}
            </div>
            <div className="creator-card__body">
              <div className="creator-card__meta">
                <h2>{creator.name}</h2>
                <p>{creator.role}</p>
              </div>
              <p>{creator.bio}</p>
              <div className="creator-card__tags">
                {creator.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="creator-stack">
        {CREATOR_STACK.map((panel) => (
          <article key={panel.title} className="glass-panel creator-stack__card">
            <h3>{panel.title}</h3>
            <p>{panel.body}</p>
          </article>
        ))}
      </section>
    </div>
  )
}

type PhaseConfig = (typeof WATER_PHASES)[WaterPhaseId]

function PhaseBlob({ phase }: { phase: PhaseConfig }) {
  const meshRef = useRef<Mesh | null>(null)
  const wobbleRef = useRef(0)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    wobbleRef.current += delta * 0.8
    const eased = meshRef.current.scale.x + (phase.scale - meshRef.current.scale.x) * Math.min(delta * 6, 1)
    meshRef.current.scale.setScalar(eased + Math.sin(wobbleRef.current) * 0.02)
    meshRef.current.rotation.y += delta * 0.25
    meshRef.current.rotation.x = Math.sin(wobbleRef.current * 0.5) * 0.15
  })

  return (
    <mesh ref={meshRef} castShadow>
      <icosahedronGeometry args={[0.9, 3]} />
      <meshStandardMaterial
        color={phase.color}
        metalness={phase.label === 'Solid (Ice)' ? 0.15 : 0.05}
        roughness={phase.label === 'Solid (Ice)' ? 0.4 : 0.15}
        emissive={phase.color}
        emissiveIntensity={0.12}
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
  const [temperature, setTemperature] = useState(24)
  const [pressure, setPressure] = useState(1)
  const phaseId = useMemo(() => resolveWaterPhase(temperature, pressure), [temperature, pressure])
  const phase = WATER_PHASES[phaseId]

  return (
    <div className="page-shell water-page">
      <header className="page-header">
        <span className="page-eyebrow">Water State Lab</span>
        <div className="page-header__content">
          <h1 className="page-title">Dial temperature and pressure, watch the phase respond.</h1>
          <p className="page-lede">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mattis, orci at elementum placerat, nisi lorem facilisis risus, ut
            feugiat lorem ipsum ut massa.
          </p>
        </div>
        <span className="placeholder-pill" aria-label="All experiment copy uses lorem ipsum placeholders">
          Lorem ipsum placeholder copy
        </span>
      </header>

      <section className="water-lab__grid">
        <article className="glass-panel water-lab__panel">
          <div>
            <p className="water-phase__eyebrow">Current Phase</p>
            <h2 className="water-phase__title">{phase.label}</h2>
            <p className="water-phase__copy">{phase.description}</p>
          </div>

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

          <div className="water-controls">
            <label>
              <span>Temperature ({temperature.toFixed(0)}°C)</span>
              <input
                type="range"
                min="-40"
                max="140"
                value={temperature}
                onChange={(event) => setTemperature(Number(event.target.value))}
              />
            </label>
            <label>
              <span>Pressure ({pressure.toFixed(2)} atm)</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.05"
                value={pressure}
                onChange={(event) => setPressure(Number(event.target.value))}
              />
            </label>
          </div>

          <div className="water-phase__legend">
            <span className="water-phase__pill">Phase indicator updates with Lorem Ipsum copy.</span>
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
          <Link to="/" className="nav-logo-link">
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
        <Route path="*" element={<HomePage />} />
        <Route path="/experiments" element={<ExperimentsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/creators" element={<CreatorsPage />} />
        <Route path="/experiments/state-changes" element={<WaterStatePage />} />
      </Routes>
    </>
  )
}

export default App
