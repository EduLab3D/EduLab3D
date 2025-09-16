import React, { useState, useEffect } from 'react';
import logo from './image/logo.svg';
import TextType from './components/TextType';
import CardNav from './components/CardNav';
import Orb from './components/Orb';
import ScrollVelocity from './components/ScrollVelocity';

function Home() {
 const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);

    // cleanup
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

    const messages = [
        'Hello!',
        'Welcome to join our Universe, EduLab3D!',
        'You can enjoy science experiments!',
        'Let`s start Today`s science experiments!',
        'Made for Jungheung Middle School',
    ];

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
        <div className="App">
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
                <img src={logo} className="App-logo" alt="logo" />
                <TextType
                    text={messages}
                    typingSpeed={60}
                    pauseDuration={1500}
                    deletingSpeed={30}
                    cursorCharacter="|"
                />
                <a
                    className="App-link"
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Get Started
                </a>
            </header>
        </div>
    );
}

export default Home;