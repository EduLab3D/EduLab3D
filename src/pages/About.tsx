import '../App.css'

export default function AboutPage() {
  return (
    <div className="experiments-page page-enter">
      <header className="experiments-page__hero" style={{ maxWidth: '800px' }}>
        <p className="experiments-page__eyebrow">About Us</p>
        <h1>Empowering the next generation of scientists.</h1>
        <p className="experiments-page__lede">
          EduLab3D is an open-source initiative built by students, for students. 
          Our mission is to make high-quality science education accessible to everyone, 
          anywhere, through interactive 3D simulations.
        </p>
      </header>

      <div className="experiments-page__grid" style={{ marginTop: '4rem', gridTemplateColumns: '1fr' }}>
        <section style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          padding: '2rem', 
          borderRadius: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h2 style={{ marginTop: 0, fontSize: '1.8rem' }}>Our Story</h2>
          <p style={{ lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.8)' }}>
            It started with a simple question: "Why are science labs so expensive?" 
            We realized that many schools lack the resources to provide hands-on 
            experiments for their students. By leveraging modern web technologies, 
            we can bring the lab to the browser, free of charge.
          </p>
          <p style={{ lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.8)' }}>
            What began as a small hackathon project has grown into a platform 
            used by classrooms around the world. We believe that visual learning 
            is key to understanding complex scientific concepts.
          </p>
        </section>

        <section style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          padding: '2rem', 
          borderRadius: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h2 style={{ marginTop: 0, fontSize: '1.8rem' }}>Get Involved</h2>
          <p style={{ lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.8)' }}>
            We are always looking for contributors! Whether you are a developer, 
            designer, or teacher, there is a place for you in our community.
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <a href="mailto:support@edulab3d.tech" className="gradient-button">
              Contact Us
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
