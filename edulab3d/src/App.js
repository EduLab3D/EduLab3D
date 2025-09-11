import React from 'react';
import logo from './logo.svg';
import TextType from './TextType';
import './App.css';

function App() {
  const messages = [
    'Hello!', 
    'Welcome to join our Universe, EduLab3D!', 
    'You can enjoy science experiences!',
    'Let`s start Today`s science experiences!',
    'Made for Jungheung Middle School',
  ];
  return (
    <div className="App">
      <header className="App-header">
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
          href="https://edulab3d.tech"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to Main page
        </a>
      </header>
    </div>
  );
}

export default App;