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
            <img src={imageLink} alt="image" className = {`card-image ${isMobile ? 'mobile' : 'computer'}`}/>
            <a
                href={teamLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                 <span className={`card-teamNumber ${isMobile ? 'mobile' : 'computer'}`}>{combinedNameNumber}</span>
            </a>
            <span className={`tag-container-large ${isMobile ? 'mobile' : 'computer'}`}>
            Mechanisms: <br/>
                 <span className="tag-container">
                    {tags.map((tag,index) => (
                        <li key = {index} className={`tag ${isMobile ? 'mobile' : 'computer'}`}>
                            {tag}
                        </li>
                    ))}
                </span>
            </span>
            <p className = {`card-description ${getCardType()}`}>{description}</p>
            <a
                href={cadLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                 <p className={`card-fusion ${isMobile ? 'mobile' : 'computer'}`}>{cadText}</p>
            </a>
        </div>
    );
}

export default Card;