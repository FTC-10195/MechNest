import React from 'react';
import { useState } from 'react';
import './Card.css';
function Card({ title, description,imageLink,teamNumber, teamName,teamLink,cadLink, cadText, tags, isMobile,season,onClick,isFullscreen}) {
    const combinedNameNumber = "#" + teamNumber+ " - " + teamName;
function getCardType(){
        if (isFullscreen){
            return 'fullscreen';
        }
        return '';
    }
    return (
        <div className={`card ${getCardType()}`}>
             <a
                href={teamLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className = {`card-teamNumber ${getCardType()}`}>{combinedNameNumber}</div>
            </a>
            <a
                href={cadLink}
                target="_blank"
                rel="noopener noreferrer"
            >
            <img src={imageLink} alt="image" className = {`card-image ${getCardType()}`}/>
            </a>
            <div className = {`card-text-container ${getCardType()}`}>
                <div className = {`card-title ${getCardType()}`}>{title}</div>
                <p className = { `card-description ${getCardType()}`}> {description}</p>
            </div>
            <div className = {`season ${getCardType()}`}> {season[1]} </div>
            <img src={isFullscreen ? './Images/fullscreenexit.png'   : './Images/fullscreen.png'} alt="fullscreen-button" className = {`fullscreen-button ${isMobile ? 'mobile' : 'computer'}`} onClick={onClick}/>
            <div className={`tag-container-large ${getCardType()}`}>
                    {tags.map((tag,index) => (
                        <li key = {index} className={`tag ${getCardType()}`}>
                            {tag}
                        </li>
                    ))}
            </div>
        </div>
    );
}

export default Card;