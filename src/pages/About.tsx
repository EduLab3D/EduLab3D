import { useTranslation } from 'react-i18next'
import '../App.css'

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <div className="experiments-page page-enter">
      <header className="experiments-page__hero" style={{ maxWidth: '800px' }}>
        <p className="experiments-page__eyebrow">{t('about_page.eyebrow')}</p>
        <h1>{t('about_page.title')}</h1>
        <p className="experiments-page__lede">
          {t('about_page.lede')}
        </p>
      </header>

      <div className="experiments-page__grid" style={{ marginTop: '4rem', gridTemplateColumns: '1fr' }}>
        <section style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          padding: '2rem', 
          borderRadius: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h2 style={{ marginTop: 0, fontSize: '1.8rem' }}>{t('about_page.story_title')}</h2>
          <p style={{ lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.8)' }}>
            {t('about_page.story_p1')}
          </p>
          <p style={{ lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.8)' }}>
            {t('about_page.story_p2')}
          </p>
        </section>

        <section style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          padding: '2rem', 
          borderRadius: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h2 style={{ marginTop: 0, fontSize: '1.8rem' }}>{t('about_page.involved_title')}</h2>
          <p style={{ lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.8)' }}>
            {t('about_page.involved_p')}
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <a href="mailto:support@edulab3d.tech" className="gradient-button">
              {t('about_page.contact_us')}
            </a>
            <a href="https://github.com/EduLab3D/EduLab3D" target="_blank" rel="noreferrer" className="ghost-button">
              GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
