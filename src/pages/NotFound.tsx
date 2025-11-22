import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="hero-stage" style={{ minHeight: '70vh', alignItems: 'center' }}>
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
            404
          </h1>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '40%',
            background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: -1
          }} />
        </div>
        
        <h2 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', margin: 0, color: 'rgba(255,255,255,0.9)' }}>
          Lost in the Void
        </h2>
        
        <p style={{ maxWidth: '460px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>
          The coordinates you entered don't match any known sector in our universe. 
          Let's get you back to solid ground.
        </p>
        
        <div style={{ marginTop: '1rem' }}>
          <Link to="/" className="gradient-button">
            <span>Return to Base</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
