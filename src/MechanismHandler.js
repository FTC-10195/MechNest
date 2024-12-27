import { useState } from 'react';
import './Tags.css';
import './index.css';
import mechanismStates from './MechanismState';
import seasonStates from './SeasonStates';
function MechanismHandler({ selectedTags, setTag, selectedSeason, setSeason }) {
  const mechanismList = [
    mechanismStates.NA,
    mechanismStates.DriveTrain,
    mechanismStates.Arm,
    mechanismStates.Intake,
    mechanismStates.Ascent,
    mechanismStates.VerticalSlides,
    mechanismStates.Extendo,
    mechanismStates.WholeRobot
  ];
  const seasonsList = [
   seasonStates.NA,
   seasonStates.IntoTheDeep,
   seasonStates.CENTERSTAGE,
   seasonStates.POWERPLAY,
   seasonStates.FreightFrenzy,
   seasonStates.UltimateGoal,
   seasonStates.SkyStone,
   seasonStates.RoverRuckus,
   seasonStates.RelicRevory,
   seasonStates.VelocityVortex,
   seasonStates.Outreach
  ];

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };
  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  return (
    <div className="tags-search-area">
      <span className="tags-search-text">
        <label htmlFor="dropdown">Mechanisms:</label>
        <select 
          className="tags-dropdown"
          id="dropdown"
          name="dropdown"
          value={selectedTags || ''}
          onChange={handleTagChange}  
        >
          {mechanismList.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
      <span className="tags-search-text">
        <label htmlFor="dropdown">Season:</label>
        <select 
          className="tags-dropdown"
          id="dropdown"
          name="dropdown"
          value={selectedSeason || ''}
          onChange={handleSeasonChange}  
        >
          {seasonsList.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}

export default MechanismHandler;