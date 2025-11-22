import { Link } from 'react-router-dom'
import './GetStartedMenu.css'

type StartStep = {
  step: string
  title: string
  description: string
  to: string
  action: string
}

const DEFAULT_STEPS: StartStep[] = [
  {
    step: 'Step 01',
    title: 'Search by concept',
    description: 'Type a law, topic, or learning outcome to surface the right miniature visualization.',
    to: '/search',
    action: 'Open search',
  },
  {
    step: 'Step 02',
    title: 'Stage your demo',
    description: 'Preview pacing cues, safety notes, and projector-friendly controls before class.',
    to: '/experiments',
    action: 'Browse catalog',
  },
  {
    step: 'Step 03',
    title: 'Loop in your learners',
    description: 'Export lab notes or drop the visualization link into your slides for quick follow-ups.',
    to: '/experiments',
    action: 'Share link',
  },
]

type GetStartedMenuProps = {
  steps?: StartStep[]
}

export default function GetStartedMenu({ steps = DEFAULT_STEPS }: GetStartedMenuProps) {
  return (
    <section className="get-started" aria-label="Get started checklist">
      <div className="get-started__glow" aria-hidden="true" />
      <div className="get-started__grid">
        {steps.map((step) => (
          <article key={step.title} className="get-started__card">
            <header>
              <p className="get-started__step">{step.step}</p>
              <h3>{step.title}</h3>
            </header>
            <p className="get-started__description">{step.description}</p>
            <Link className="get-started__action" to={step.to}>
              {step.action}
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
