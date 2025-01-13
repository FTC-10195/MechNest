import { useState } from 'react';
import './Tags.css';
import './index.css';
import seasonStates from './SeasonStates';
function MechanismHandler({ selectedTags, setTag, selectedSeason, setSeason, isMobile}) {
  const TagsList = Object.freeze({
    NA: 'N/A',
    //Seasons
    IntoTheDeep: 'INTO THE DEEP',
   CENTERSTAGE: 'CENTERSTAGE',
   POWERPLAY: 'POWERPLAY',
   FreightFrenzy: 'FREIGHT FRENZY',
  UltimateGoal: 'ULTIMATE GOAL',
  SkyStone: 'SKYSTONE',
  RoverRuckus: 'ROVER RUCKUS',
  RelicRevory: 'RELIC RECOVERY',
  VelocityVortex: 'VELOCITY VORTEX',
    //Mechanisms
    DriveTrain: 'Drivetrain',
    Arm: 'Arm',
    Intake: 'Intake Wheel',
    Ascent: 'Ascent/Climb',
    VerticalSlides: 'Vertical Slides',
    Claw:'Claw',
    Bucket: 'Bucket',
    Fourbar: 'Fourbar',
    Bucket: 'Bucket',
    Transfer: 'Transfer System',
    WholeRobot:'Whole Robot',
    //Sensors
    Webcam: 'Webcam',
    OdometryPods: 'Odometry Pods',
    ColorSensor: 'Color Sensor',
    //Drive-type
    Bevel: 'Bevel Driven',
    Direct: 'Direct Driven',
    Belt: 'Belt Driven',
    Chain: 'Chain Driven',
    //Plates
    HDPE: 'HDPE',
    Aluminum: 'Aluminum'
  });
  const seasonsList = [
    TagsList.NA,
    TagsList.IntoTheDeep,
    TagsList.CENTERSTAGE,
   TagsList.POWERPLAY,
   TagsList.FreightFrenzy,
   TagsList.UltimateGoal,
   TagsList.SkyStone,
   TagsList.RoverRuckus,
   TagsList.RelicRevory,
   TagsList.VelocityVortex,
  ];
  const mechanismList = [
    TagsList.NA,
    TagsList.DriveTrain,
    TagsList.Arm,
    TagsList.Intake,
    TagsList.Ascent,
    TagsList.VerticalSlides,
    TagsList.Claw,
    TagsList.Bucket,
    TagsList.Fourbar,
    TagsList.Transfer,
    TagsList.WholeRobot
  ];
  const sensorsList = [
    TagsList.NA,
    TagsList.Webcam,
    TagsList.OdometryPods,
    TagsList.ColorSensor
  ];
  const driveList = [
    TagsList.NA,
    TagsList.Bevel,
    TagsList.Direct,
    TagsList.Belt,
    TagsList.Chain
  ];
  const platesList = [
    TagsList.NA,
    TagsList.HDPE,
    TagsList.Aluminum
  ];
  const handleTagChange = (event) => {
    setTag(event.target.value);
  };
  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  return (
    <div className={`tags-search-area ${isMobile ? 'mobile' : 'computer'}`}>
      <span className="tags-search-text">
        <label htmlFor="dropdown">Mechanisms:</label>
        <select 
         className={`tags-dropdown ${isMobile ? 'mobile' : 'computer'}`}
          id="dropdown1"
          name="dropdown1"
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
          className={`tags-dropdown ${isMobile ? 'mobile' : 'computer'}`}
          id="dropdown2"
          name="dropdown2"
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