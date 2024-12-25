import React from 'react';
import { useState } from 'react';
import './Card.css';
import fullScreenButton from './Images/fullscreen.png';
import fullScreenExitButton from './Images/fullscreenexit.png';
function Card({ title, description,imageLink,teamNumber, teamName,teamLink,cadLink, cadText, tags, isMobile, onClick }) {
    const [isFullscreen, setIsFullscreen] = useState(false);
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
                 <span className="tag-container">
                    Tags: <br/>
                    {tags.map((tag,index) => (
                        <li key = {index} className="tag">
                            {tag}
                        </li>
                    ))}
                </span>
            <p className = {isFullscreen ? "card-description"   : `card-descriptionTruncate ${isMobile ? 'mobile' : 'computer' }`}>{description}</p>
            <a
                href={cadLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                 <p className="card-fusion">{cadText}</p>
            </a>
        </div>
    );
}

export default Card;