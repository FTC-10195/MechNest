import { useState } from 'react';
import './Tags.css';
import './index.css';
import tagStates from './TagState';
function TagHandler({ selectedTags, setTag }) {
  const tagsList = [
    tagStates.NA,
    tagStates.DriveTrain,
    tagStates.Arm,
    tagStates.Intake,
    tagStates.Ascent,
    tagStates.VerticalSlides,
    tagStates.Extendo,
    tagStates.IntoTheDeep,
    tagStates.CENTERSTAGE,
    tagStates.POWERPLAY,
    tagStates.FreightFrenzy,
    tagStates.UltimateGoal,
    tagStates.SkyStone,
    tagStates.RoverRuckus,
    tagStates.RelicRevory,
    tagStates.VelocityVortex,
    tagStates.Outreach,
    tagStates.WholeRobot
  ];

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  return (
    <div className="tags-search-area">
      <span className="tags-search-text">
        <label htmlFor="dropdown">Tags:</label>
        <select 
          className="tags-dropdown"
          id="dropdown"
          name="dropdown"
          value={selectedTags || ''}
          onChange={handleTagChange}  
        >
          {tagsList.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}

export default TagHandler;