import React, { useState } from "react";
import "./Tags.css";
function App(TagsList) {
  const [frames, setFrames] = useState(false); // State to keep track of frames
  const handleAddFrame = () => {
    // Add a new frame with a unique ID
    setFrames(!frames);
  };
  const Tags = TagsList['TagsList']
  const Mechanisms = Tags['Mechanisms']
  const Seasons = Tags['Seasons']
  return (
    <div className="App">
      <button className="search-button" onClick={handleAddFrame} ><img src={'./Images/MagnifyingGlass.png'} className="forms-icon"/> {frames ? '<' : '>'}</button>
        <div className={`frame ${frames ? 'On' : 'Off'}`}>
          <div className={'frame-title'}>Tags </div>
            <div className={'tag-container'}>
              <div className={'tag-title'}>Mechanisms: </div>  
              {Mechanisms.map((tag,index) => (
                <li key = {index} className={`tag`}>
                  {tag}
                </li>
              ))}
              </div>
              <div className={'tag-container'}>
              <div className={'tag-title'}> Seasons: </div>  
              {Seasons.map((tag,index) => (
                <li key = {index} className={`tag`}>
                  {tag}
                </li>
              ))}
              </div>
        </div>
    </div>
  );
}

export default App;
