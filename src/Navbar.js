import React from 'react';
import './Navbar.css';
import './index.css';
//Use the 'App.css to give color, shape, size, style, etc
function Navbar({isMobile}) {
    return (
      <header className="navbar">
      <div className="left-side">
        <span  className="header-text"><img src={isMobile ? './Images/MechNestLogo.png' : './Images/MechNestText.png'} className={`header ${isMobile ? 'mobile' : 'computer'}`}/></span>
          <a
            href=" https://docs.google.com/forms/d/e/1FAIpQLSfTPRbnQ86wxPXeoHmyfvKjxQs7hOzbsfSXYbpvG3JEcj7jaw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
          >
          <span className="post-button"><img src={'./Images/googleformslogo.png'} className="forms-icon"/>Post</span>
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
