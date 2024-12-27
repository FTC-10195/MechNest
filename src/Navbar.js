import { useState } from 'react';
import './Navbar.css';
import './index.css';
//Use the 'App.css to give color, shape, size, style, etc
function Navbar() {
    return (
      <header className="navbar">
      <div className="left-side">
        <span className="header-text">CAD COOP 💀</span>
          <a
            href=" https://docs.google.com/forms/d/e/1FAIpQLSfTPRbnQ86wxPXeoHmyfvKjxQs7hOzbsfSXYbpvG3JEcj7jaw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
          >
        <span className="post-button">Post</span>
        </a>
      </div>
        <a
          href="https://ecgrobotics.org/ftc10195/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={'./Images/nightowlslogo.png'} alt="logo" className = "App-logo"/>
        </a>
      </header>
  );
}

export default Navbar;
