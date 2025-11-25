import { useTranslation } from 'react-i18next'
import '../App.css'

export default function CreatorsPage() {
  const { t } = useTranslation()
  return (
    <div className="experiments-page page-enter">
      <header className="experiments-page__hero" style={{ maxWidth: '800px' }}>
        <p className="experiments-page__eyebrow">{t('creators_page.eyebrow')}</p>
        <h1>{t('creators_page.title')}</h1>
        <p className="experiments-page__lede">
          {t('creators_page.lede')}
        </p>
      </header>

      <div className="experiments-page__grid" style={{ marginTop: '4rem' }}>
        <article className="experiment-card" style={{ minHeight: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1rem' }}>
            <img 
              src="https://avatar-cyan.vercel.app/api/pfp/1231926157876920412/smallimage" 
              alt="devlog" 
              style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }}
            />
            <div>
              <h2 style={{ fontSize: '2rem', margin: 0, lineHeight: 1.1 }}>devlog</h2>
              <span className="experiment-card__level level-advanced" style={{ display: 'inline-block', marginTop: '0.5rem' }}>{t('creators_page.devlog.role')}</span>
            </div>
          </div>
          <p style={{ marginBottom: '1.5rem' }}>
            {t('creators_page.devlog.desc')}
          </p>
          <div className="experiment-card__footer">
            <div className="experiment-card__tags">
              <span>UI/UX</span>
              <span>Frontend</span>
              <span>Design</span>
            </div>
            <a 
              href="https://discord.com/users/1231926157876920412" 
              target="_blank" 
              rel="noreferrer"
              className="experiment-card__cta"
              style={{ marginLeft: 'auto' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
              </svg>
              {t('creators_page.discord')}
            </a>
          </div>
        </article>

        <article className="experiment-card" style={{ minHeight: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1rem' }}>
            <img 
              src="https://avatar-cyan.vercel.app/api/pfp/1140093179597688904/smallimage" 
              alt="Waxify" 
              style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }}
            />
            <div>
              <h2 style={{ fontSize: '2rem', margin: 0, lineHeight: 1.1 }}>Waxify</h2>
              <span className="experiment-card__level level-advanced" style={{ display: 'inline-block', marginTop: '0.5rem' }}>{t('creators_page.waxify.role')}</span>
            </div>
          </div>
          <p style={{ marginBottom: '1.5rem' }}>
            {t('creators_page.waxify.desc')}
          </p>
          <div className="experiment-card__footer">
            <div className="experiment-card__tags">
              <span>Physics</span>
              <span>Simulations</span>
              <span>Logic</span>
            </div>
            <a 
              href="https://discord.com/users/1140093179597688904" 
              target="_blank" 
              rel="noreferrer"
              className="experiment-card__cta"
              style={{ marginLeft: 'auto' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
              </svg>
              Discord
            </a>
          </div>
        </article>
      </div>
    </div>
  )
}
