import { Suspense, useMemo, useState, lazy } from 'react'
import { Link, Route, Routes} from 'react-router-dom'
import './App.css'
import logo from './assets/logo.svg'
import BrowserMenu from './components/BrowserMenu'

const RefractionLab = lazy(() => import('./experiments/RefractionLab'))
const WaterStatePage = lazy(() => import('./experiments/WaterState'))
const AboutPage = lazy(() => import('./pages/About'))
const CreatorsPage = lazy(() => import('./pages/Creators'))
const NotFound = lazy(() => import('./pages/NotFound'))

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

      <Suspense fallback={<div className="page-enter" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experiments" element={<ExperimentsPage />} />
          <Route path="/experiments/refraction-lab" element={<RefractionLab />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/creators" element={<CreatorsPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/experiments/state-changes" element={<WaterStatePage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
