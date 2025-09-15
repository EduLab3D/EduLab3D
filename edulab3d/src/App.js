import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Maker from './pages/Maker';
import Home from './pages/Home';
import './App.css';

function App() {
    return (
        <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/maker" element={<Maker />} />
                </Routes>
        </HashRouter>
        
    );
}

export default App;
