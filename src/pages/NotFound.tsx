import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="hero-stage page-enter" style={{ minHeight: '70vh', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ position: 'relative' }}>
          <h1 style={{ 
            fontSize: 'clamp(6rem, 15vw, 10rem)', 
            margin: 0, 
            lineHeight: 0.9, 
            fontWeight: 800,
            background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.4) 100%)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.1))'
          }}>
            {t('not_found.title')}
          </h1>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
            filter: 'blur(20px)',
            zIndex: -1
          }} />
        </div>
        
        <h2 style={{ fontSize: '1.5rem', fontWeight: 500, color: '#fff', margin: 0 }}>
          {t('not_found.subtitle')}
        </h2>
        
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '400px', margin: 0 }}>
          {t('not_found.desc')}
        </p>

        <Link to="/" className="gradient-button" style={{ marginTop: '1rem' }}>
          {t('not_found.back_home')}
        </Link>
      </div>
    </div>
  )
}
