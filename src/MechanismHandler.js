import React, { useState } from "react";
import "./Tags.css";

function App({Tags,setSeason,setDrive,setTags}) {
  const [frames, setFrames] = useState(false);
  const handleAddFrame = () => {
    setFrames(!frames);
  };

  const TagTypeList = ["Seasons", "Mechanisms", "Sensors","Drivetrain", "DriveType", "Plates"];

  // Manage the selected tags for both 'Seasons' and 'Other'
  const [tagSelected, setSelectedTag] = useState({
    Seasons: [], // Only one tag can be selected at a time
    Drivetrain: [], // Only one tag can be selected at a time
    Other: [],   // Multiple tags can be selected
  });

  // Remove 'N/A' tags from all categories
  for (let i = 0; i < TagTypeList.length; i++) {
    const Type = Tags[TagTypeList[i]];
    for (let index = 0; index < Type.length; index++) {
      if (Type[index] === "N/A") {
        Type.splice(index, 1);
      }
    }
  }
  const WHENCLICKED = (tag, type) => {
    setSelectedTag((prevTags) => {
      if (type === "Seasons") {
        // For 'Seasons', only one tag can be selected at a time
        if (prevTags.Seasons.includes(tag)) {
          // If it's already selected, remove it
          setSeason('N/A')
          return { ...prevTags, Seasons: [] };
        } else {
          // If it's not selected, select it and keep 'Other' tags as they are
          setSeason(tag)
          return { ...prevTags, Seasons: [tag] };
        }
        
      }else if (type === "Drivetrain") {
        if (prevTags.Drivetrain.includes(tag)) {
          // If it's already selected, remove it
          setDrive('N/A')
          return { ...prevTags, Drivetrain: [] };
        } else {
          // If it's not selected, select it and keep 'Other' tags as they are
          setDrive(tag)
          return { ...prevTags, Drivetrain: [tag] };
        }
      } else {
        // For 'Other', multiple tags can be selected
        const currentTags = prevTags.Other;
        if (currentTags.includes(tag)) {
          // If it's already selected, remove it from the list
          setTags(currentTags.filter((t) => t !== tag))
          return { ...prevTags, Other: currentTags.filter((t) => t !== tag) };
        } else {
          // If it's not selected, add it to the list
          setTags([...currentTags, tag])
          return { ...prevTags, Other: [...currentTags, tag] };
        }
      }
    });
  };
  const ClearTags = () => {
    setSeason('N/A')
    setDrive('N/A')
    setTags(['N/A'])
    setSelectedTag({
      Seasons: [], // Only one tag can be selected at a time
      Drivetrain: [],// Only one tag can be selected at a time
    Other: [],   // Multiple tags can be selected
    })
  }
  return (
    <div className="App">
      <button className="search-button" onClick={handleAddFrame}>
        <img src={"./Images/MagnifyingGlass.png"} className="forms-icon" /> {frames ? "<" : ">"}
      </button>
      <button className="clear-button" onClick = {ClearTags}>
         Clear Tags
      </button>
      <div className={`frame ${frames ? "On" : "Off"}`}>
        <div className={"frame-title"}>Tags </div>
        {/* Loop through all tags, including dynamic "Other" */}
        {TagTypeList.map((Type, index) => (
          <div key={index} className={"tag-container"}>
            <div className={"tag-title"}> {Type}: </div>
            {Tags[Type].map((tag, index) => (
              <li
                key={index}
                className={`tags ${
                  (Type === "Seasons" && tagSelected.Seasons.includes(tag)) || ( Type === "Drivetrain" && tagSelected.Drivetrain.includes(tag)) ||
                  ((Type !== "Seasons" && Type !== "Drivetrain"  && tagSelected.Other.includes(tag)))
                    ? "selected-tag"
                    : ""
                }`}
                onClick={() => WHENCLICKED(tag, Type)}
              >
                {tag}
              </li>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
