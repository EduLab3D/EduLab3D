import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import TextType from './components/TextType';
import CardNav from './components/CardNav';
import Orb from './components/Orb';
import ScrollVelocity from './components/ScrollVelocity';
import About from './pages/About';
import Maker from './pages/Maker';
import './App.css';
function Home() {
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
                { label: "EduLab3D?", ariaLabel: "What is EduLab3D?", href: "/about" },
                { label: "Maker", ariaLabel: "Who is Maker?", href: "/maker" },
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
                <ScrollVelocity
                    texts={['EduLab3D, 3D science experiment  EduLab3D, 3D science experiment, EduLab3D', 'DevLog DevLog & waxifyx DevLog & waxifyx DevLog & waxifyx Hayule & Doyoon']}
                    velocity={120}
                    className="custom-scroll-text"
                />
            </header>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/maker" element={<Maker />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
