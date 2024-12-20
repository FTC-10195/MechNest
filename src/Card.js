import React from 'react';
import { useState } from 'react';
import './Card.css';
import fullScreenButton from './Images/fullscreen.png';
import fullScreenExitButton from './Images/fullscreenexit.png';
function Card({ title, description,imageLink,teamNumber, teamName,teamLink,fusionLink, fusionText, onClick }) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Toggle fullscreen state when button is clicked
    const handleToggleFullscreen = () => {
      setIsFullscreen(!isFullscreen);
    };
    const combinedNameNumber =  teamName + " " + teamNumber;
    return (
        <div className={`card ${isFullscreen ? 'fullscreen' : ''}`}>
            <h3 className = "card-title">{title}</h3>
            <img src={isFullscreen ? fullScreenExitButton   : fullScreenButton} alt="fullscreen-button" className = "fullscreen-button" onClick={handleToggleFullscreen}/>
            <img src={imageLink} alt="image" className = "card-image"/>
            <a
                href={teamLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                 <span className="card-teamNumber">{combinedNameNumber}</span>
            </a>
            <p className = {isFullscreen ? "card-description"   : "card-descriptionTruncate"}>{description}</p>
            <a
                href={fusionLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                 <p className="card-fusion">{fusionText}</p>
            </a>
        </div>
    );
}

export default Card;