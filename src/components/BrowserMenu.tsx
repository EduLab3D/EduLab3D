import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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

export default function BrowserMenu({ items }: BrowserMenuProps) {
  const { t } = useTranslation()

  const defaultItems: BrowserMenuItem[] = [
    {
      label: t('browser_menu.about.label'),
      accent: '#f97316',
      tagline: t('browser_menu.about.tagline'),
      links: [
        { label: t('browser_menu.about.what_is'), description: t('browser_menu.about.what_is_desc'), href: '/about' },
        { label: t('browser_menu.about.creators'), description: t('browser_menu.about.creators_desc'), href: '/creators' },
      ],
    },
    {
      label: t('browser_menu.experiments.label'),
      accent: '#a855f7',
      tagline: t('browser_menu.experiments.tagline'),
      links: [
        { label: t('browser_menu.experiments.by_level'), description: t('browser_menu.experiments.by_level_desc'), href: '/experiments?view=levels' },
        { label: t('browser_menu.experiments.all'), description: t('browser_menu.experiments.all_desc'), href: '/experiments' },
      ],
    },
    {
      label: t('browser_menu.contact.label'),
      accent: '#22d3ee',
      tagline: t('browser_menu.contact.tagline'),
      taglineSpacer: false,
      links: [
        { label: t('browser_menu.contact.email'), description: 'support@edulab3d.tech', descriptionSpacer: true, href: 'mailto:support@edulab3d.tech', external: true},
        { label: t('browser_menu.contact.github'), description: t('browser_menu.contact.github_desc'), descriptionSpacer: true ,href: 'https://github.com/EduLab3D/EduLab3D', external: true },
      ],
    },
  ]

  const menuItems = items || defaultItems

  return (
    <section className="browser-menu" aria-label="Browse EduLab3D">
      <div className="browser-menu__heading">
        <p className="browser-menu__eyebrow">{t('browser_menu.heading.eyebrow')}</p>
        <h2 className="browser-menu__title">{t('browser_menu.heading.title')}</h2>
        <p className="browser-menu__subtitle">
          {t('browser_menu.heading.subtitle')}
        </p>
      </div>

      <div className="browser-menu__cards">
        {menuItems.map((item) => (
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
                      <span className="browser-menu__link-arrow" aria-hidden="true">↗</span>
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
                      <span className="browser-menu__link-arrow" aria-hidden="true">→</span>
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


