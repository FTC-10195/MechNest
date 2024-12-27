import React from 'react';
import { useState } from 'react';
import './Card.css';
function Card({ title, description,imageLink,teamNumber, teamName,teamLink,cadLink, cadText, tags, isMobile,season,onClick }) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const handleToggleFullscreen = () => {
      setIsFullscreen(!isFullscreen);
    };
    const combinedNameNumber =  teamName + " " + teamNumber;
    return (
        <div className={`card ${isFullscreen ? 'fullscreen' : ''}`}>
            <h3 className = "card-title">{title}</h3>
            <div className = "season"> {season} </div>
            <img src={isFullscreen ? './Images/fullscreenexit.png'   : './Images/fullscreen.png'} alt="fullscreen-button" className = "fullscreen-button" onClick={handleToggleFullscreen}/>
            <img src={imageLink} alt="image" className = "card-image"/>
            <a
                href={teamLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                 <span className="card-teamNumber">{combinedNameNumber}</span>
            </a>
            <span className="tag-container-large">
            Mechanisms: <br/>
                 <span className="tag-container">
                    {tags.map((tag,index) => (
                        <li key = {index} className="tag">
                            {tag}
                        </li>
                    ))}
                </span>
            </span>
            <p className = {isFullscreen ? "card-description"   : `card-descriptionTruncate`}>{description}</p>
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