import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import './BrowserMenu.css'

type BrowserMenuLink = {
  label: string
  description?: string
  descriptionSpacer?: boolean
  href: string
  external?: boolean
}

export type BrowserMenuItem = {
  label: string
  accent: string
  tagline: string
  taglineSpacer?: boolean
  links: BrowserMenuLink[]
}

type BrowserMenuProps = {
  items?: BrowserMenuItem[]
}

const DEFAULT_ITEMS: BrowserMenuItem[] = [
  {
    label: 'About',
    accent: '#f97316',
    tagline: 'Mission, story, and the humans building EduLab3D.',
    links: [
      { label: 'Creators', description: 'Meet the students behind the experiments.', href: '/creators' },
    ],
  },
  {
    label: 'Experiments',
    accent: '#a855f7',
    tagline: 'Curated simulations grouped by difficulty and topic.',
    links: [
      { label: 'By level', description: 'Pick Beginner, Intermediate, or Advanced.', href: '/experiments?view=levels' },
      { label: 'All experiments', description: 'Browse the full catalogue at once.', href: '/experiments' },
    ],
  },
  {
    label: 'Contact',
    accent: '#22d3ee',
    tagline: 'Get help, share feedback, or contribute.',
    taglineSpacer: false,
    links: [
      { label: 'Email support', description: 'support@edulab3d.tech', descriptionSpacer: true, href: 'mailto:support@edulab3d.tech', external: true},
      { label: 'GitHub', description: 'Open source repo & issues.', descriptionSpacer: true ,href: 'https://github.com/EduLab3D/EduLab3D', external: true },
    ],
  },
]

export default function BrowserMenu({ items = DEFAULT_ITEMS }: BrowserMenuProps) {
  return (
    <section className="browser-menu" aria-label="Browse EduLab3D">
      <div className="browser-menu__heading">
        <p className="browser-menu__eyebrow">Quick navigation</p>
        <h2 className="browser-menu__title">Browse the lab menu</h2>
        <p className="browser-menu__subtitle">
          Jump into the sections you visit the most. Each card reveals focused shortcuts so you can get moving faster.
        </p>
      </div>

      <div className="browser-menu__cards">
        {items.map((item) => (
          <article
            key={item.label}
            className="browser-menu__card"
            style={{ '--browser-menu-accent': item.accent } as CSSProperties}
          >
            <header className="browser-menu__card-header">
              <span className="browser-menu__pill" aria-hidden="true">
                <span className="browser-menu__pill-dot" />
                {item.label}
              </span>
              <p className={`browser-menu__tagline${item.taglineSpacer ? ' browser-menu__tagline--spacer' : ''}`}>{item.tagline}</p>
            </header>
            <ul className="browser-menu__links">
              {item.links.map((link) => (
                <li key={link.label} className="browser-menu__link-item">
                  {link.external ? (
                    <a
                      href={link.href}
                      className="browser-menu__link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>
                        <span className="browser-menu__link-label">{link.label}</span>
                        {link.description && (
                          <span className={`browser-menu__link-description${link.descriptionSpacer ? ' browser-menu__link-description--spacer' : ''}`}>
                            {link.description}
                          </span>
                        )}
                      </span>
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
                    </a>
                  ) : (
                    <Link to={link.href} className="browser-menu__link">
                      <span>
                        <span className="browser-menu__link-label">{link.label}</span>
                        {link.description && (
                          <span className={`browser-menu__link-description${link.descriptionSpacer ? ' browser-menu__link-description--spacer' : ''}`}>
                            {link.description}
                          </span>
                        )}
                      </span>
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
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
