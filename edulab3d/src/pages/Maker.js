import React from "react";
import CardNav from './components/CardNav';
import logo from './image/logo.svg';
const developer = {
  name: "DEVLOG",
  role: "Frontend Developer",
  bio: "안녕하십니까! EduLab3D 총괄 개발자 DEVLOG입니다! 혹시 버그를 발견하셨다면, support@edulab3d.tech로 알려주시면 바로 수정하겠습니다. 감사합니다!",
  avatar: logo,
  socials: [
    { name: "GitHub", url: "https://github.com/logouter024516", icon: "🐙" },
    { name: "E-mail", url: "mailto:mhy9203.develop@gmail.com", icon: "💼" },
    { name: "Twitter", url: "https://x.com/DLKR0_0", icon: "🐦" },
  ],
};
const developer2 = {
  name: "waxifyx",
  role: "Science Experiment Developer",
  bio: "밀랍칠하는중...",
  avatar: logo,
  socials: [
    { name: "GitHub", url: "https://github.com/waxifyx", icon: "🐙" },
    { name: "E-mail", url: "mailto:support@edulab3d.tech", icon: "💼" },
  ],
};
const Maker = () => {
  const items = [
        {
            label: "About",
            bgColor: "#0D0716",
            textColor: "#fff",
            links: [
                { label: "EduLab3D?", ariaLabel: "What is EduLab3D?", href: "/#/about" },
                { label: "Maker", ariaLabel: "Who is Maker?", href: "/#/maker" },
            ]
        },
        {
            label: "Experiments",
            bgColor: "#170D27",
            textColor: "#fff",
            links: [
                { label: "Find by level", ariaLabel: "experiments finder" },
                { label: "All experiments", ariaLabel: "experiments finder" }
            ]
        },
        {
            label: "Contact",
            bgColor: "#271E37",
            textColor: "#fff",
            links: [
                { label: "Email", ariaLabel: "Email us", href: "mailto:support@edulab3d.tech" },
                { label: "Github", ariaLabel: "THIS PROJECT IS OPEN SOURCE!!!!!!!!!!!", href: "https://github.com/EduLab3D/EduLab3D" },
            ]
        }
    ];
  return (
  <div style={{ background: "#181A20", position: "relative", minHeight: "100vh" }}>
  <header className="App-header" style={{ margin: 0, padding: 0, minHeight: 0 }}>
        <CardNav
          logo={logo}
          logoAlt="Company Logo"
          items={items}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />
      </header>
  <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "2rem", flexWrap: "wrap", paddingTop: "140px" }}>
        {[developer, developer2].map((dev, idx) => (
          <div key={dev.name} className="dev-card" style={{ background: "rgba(255,255,255,0.85)", borderRadius: "1.5rem", boxShadow: "0 8px 32px rgba(60,60,120,0.12)", padding: "2.5rem 2rem", width: "350px", height: "420px", textAlign: "center", transition: "box-shadow 0.3s", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <img src={dev.avatar} alt="avatar" style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
            <h2 style={{ margin: "0 0 8px", fontWeight: 700, fontSize: "1.5rem", color: "#222" }}>{dev.name}</h2>
            <h4 style={{ margin: "0 0 16px", fontWeight: 400, color: "#666" }}>{dev.role}</h4>
            <p style={{ fontSize: "1rem", color: "#444", marginBottom: 24 }}>{dev.bio}</p>  
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              {dev.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 24, background: "#f5f6fa", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", transition: "background 0.2s, transform 0.2s" }}
                  className="dev-social"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .dev-card:hover {
          box-shadow: 0 12px 40px rgba(60,60,120,0.22);
        }
        .dev-social:hover {
          background: #e0eafc;
          transform: scale(1.12);
        }
        @media (max-width: 900px) {
          .dev-card {
            margin-bottom: 1.5rem;
          }
        }
        @media (max-width: 600px) {
          .dev-card {
            padding: 1.2rem 0.5rem;
            max-width: 95vw;
          }
          div[style*='display: flex'] {
            flex-direction: column !important;
            align-items: center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Maker;
