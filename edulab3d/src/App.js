import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Creators from './pages/Creators';
import Home from './pages/Home';
import './App.css';

function App() {
    return (
        <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/creators" element={<Creators />} />
                </Routes>
        </HashRouter>
        
    );
}

export default App;
