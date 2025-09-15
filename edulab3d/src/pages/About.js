import React from 'react';
import Orb from './components/Orb';
import CardNav from './components/CardNav';
import logo from './image/logo.png';
function About() {
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
    <div style={{color: '#000', padding: '2rem'}}>
      <div className="orb-bg">
                <Orb
                    hoverIntensity={0.26}
                    rotateOnHover={true}
                    hue={61}
                    forceHoverState={true}
                />
            </div>
            <header className="App-header">
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
        </div>
    );
}

export default About;
