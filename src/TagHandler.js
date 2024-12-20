import { useState } from 'react';
import './Tags.css';
import tagStates from './TagState';
import './index.css';

function TagHandler({ selectedTags, setTag, tagStates }) {
  const tagsList = [
    tagStates.NA,
    tagStates.DriveTrain,
    tagStates.Arm,
    tagStates.VerticalSlides,
    tagStates.Lvl2Ascent,
    tagStates.Level3Ascent,
    tagStates.LowBasket,
    tagStates.HighBasket,
    tagStates.LowChamber,
    tagStates.HighChamber,
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