import React from 'react';
import { useState } from 'react';
import './Card.css';
function Card({ title, description,imageLink,teamNumber, teamName,teamLink,cadLink, cadText, tags, isMobile,season,onClick }) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const handleToggleFullscreen = () => {
      setIsFullscreen(!isFullscreen);
    };
    const combinedNameNumber =  teamName + " " + teamNumber;
function getCardType(){
        if (isFullscreen){
            return 'fullscreen'
        }
        if (isMobile){
            return 'mobile'
        }else {
            return 'computer'
        }
    }
    return (
        <div className={`card ${getCardType()}`}>
            <h3 className = {`card-title ${isMobile ? 'mobile' : 'computer'}`}>{title}</h3>
            <div className = {`season ${isMobile ? 'mobile' : 'computer'}`}> {season} </div>
            <img src={isFullscreen ? './Images/fullscreenexit.png'   : './Images/fullscreen.png'} alt="fullscreen-button" className = {`fullscreen-button ${isMobile ? 'mobile' : 'computer'}`} onClick={handleToggleFullscreen}/>
            <a
                href={cadLink}
                target="_blank"
                rel="noopener noreferrer"
            >
            <img src={imageLink} alt="image" className = {`card-image ${getCardType()}`}/>
            </a>
            <a
                href={teamLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                 <span className={`card-teamNumber ${isMobile ? 'mobile' : 'computer'}`}>{combinedNameNumber}</span>
            </a>
            <div className={`tag-container-large ${getCardType()}`}>
                 <div className="tag-container">
                    {tags.map((tag,index) => (
                        <li key = {index} className={`tag ${getCardType()}`}>
                            {tag}
                        </li>
                    ))}
                </div>
            </div>
            <p className = {`card-description ${getCardType()}`}>{description}</p>
        </div>
    );
}

export default Card;