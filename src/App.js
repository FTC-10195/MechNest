import { useState } from 'react';
import './App.css';
import Card from './Card';
import Navbar from './Navbar';
import MechanismHandler from './MechanismHandler';
import './index.css';

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedFullscreen, setFullScreen] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);;
  const [selectedTags, setTags] = useState(['N/A']); 
  const [Season, setSeason] = useState('N/A');
  const [Drivetrain, setDrivetrain] = useState('N/A');
  const TagsStates = Object.freeze({
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
    Arm: 'Arm',
    Intake: 'Intake Wheel',
    Ascent: 'Ascent',
    VerticalSlides: 'Vertical Slides',
    Claw:'Claw',
    Bucket: 'Bucket',
    Fourbar: 'Fourbar',
    Bucket: 'Bucket',
    Transfer: 'Transfer System',
    //Sensors
    Webcam: 'Webcam',
    OdometryPods: 'Odometry Pods',
    ColorSensor: 'Color Sensor',
    //DriveTrain
    Mecanum: 'Mecanum Drive',
    Tank: 'Tank Drive',
    Swerve: 'Swerve Drive',
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
    TagsStates.NA,
    TagsStates.IntoTheDeep,
    TagsStates.CENTERSTAGE,
    TagsStates.POWERPLAY,
    TagsStates.FreightFrenzy,
    TagsStates.UltimateGoal,
    TagsStates.SkyStone,
    TagsStates.RoverRuckus,
    TagsStates.RelicRevory,
    TagsStates.VelocityVortex,
  ];
  const drivetrainList = [
    TagsStates.Mecanum,
    TagsStates.Tank,
    TagsStates.Swerve
  ];
  const mechanismList = [
    TagsStates.NA,
    TagsStates.Arm,
    TagsStates.Intake,
    TagsStates.Ascent,
    TagsStates.VerticalSlides,
    TagsStates.Claw,
    TagsStates.Bucket,
    TagsStates.Fourbar,
    TagsStates.Transfer,
  ];
  const sensorsList = [
    TagsStates.NA,
    TagsStates.Webcam,
    TagsStates.OdometryPods,
    TagsStates.ColorSensor
  ];
  const driveList = [
    TagsStates.NA,
    TagsStates.Bevel,
    TagsStates.Direct,
    TagsStates.Belt,
    TagsStates.Chain
  ];
  const platesList = [
    TagsStates.NA,
    TagsStates.HDPE,
    TagsStates.Aluminum
  ];
  const TagsList = Object.freeze({
    "Seasons" : seasonsList,
    "Mechanisms": mechanismList,
    "Sensors" : sensorsList,
    "Drivetrain" : drivetrainList,
    "DriveType" : driveList,
    "Plates" : platesList
  });
  const preFilteredCards = [
    { 
      id: 1, title: 'SOAR (V1)',
      description: 'Mechanum chasis ( 2 belt drive and 2 direct driven), Misumi Vertical slide system, Rotating arm powered by axon maxs, Extendo system power by axon mini, Wrist and intake powered by gobilda servos and gecko wheel, 3 Odometry pods Max Score: 63 points solo Max Auto: 16 points', 
      imageLink: './Images/V1Bot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/4d2JjMT", cadText: "https://a360.co/4d2JjMT", 
      tags: [TagsStates.NA, TagsStates.ColorSensor, TagsStates.VerticalSlides,TagsStates.Arm,TagsStates.OdometryPods,TagsStates.Intake,TagsStates.Direct,TagsStates.Belt,TagsStates.HDPE],
      season: [TagsStates.NA,TagsStates.IntoTheDeep],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    },
    { 
      id: 2, title: 'Otto the Owl',
      description: 'Custom DT, All belt powered, Aluminum Plates, Transfer System, Servo Chained powered intake using flywheels, Outtake powered by axon minis, rotation mech powered by axon maxs', 
      imageLink: './Images/CenterStageBot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/4gyzBEx", cadText: "https://a360.co/4gyzBEx", 
      tags: [TagsStates.NA, TagsStates.VerticalSlides,TagsStates.Bucket,TagsStates.OdometryPods,TagsStates.Intake,TagsStates.Transfer,TagsStates.Belt,TagsStates.Aluminum],
      season: [TagsStates.NA,TagsStates.CENTERSTAGE],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    }, 
    { 
      id: 3, title: 'Power',
      description: "Belted DT, Virtual Fourbar, Linkage Claw, Virtical Slides", 
      imageLink: './Images/PowerPlayBot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/41MRQSc", cadText: "https://a360.co/41MRQSc", 
      tags: [TagsStates.NA, TagsStates.VerticalSlides,TagsStates.Bucket,TagsStates.Claw,TagsStates.Arm,TagsStates.Belt,TagsStates.Fourbar,TagsStates.HDPE],
      season: [TagsStates.NA,TagsStates.POWERPLAY],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    }, 
    { 
      id: 4, title: 'Hoot Hoot',
      description: 'Bevel Driven DT, Transfer system, flywheel intake, bucket outtake powered by servo', 
      imageLink: './Images/FreightFrenzyBot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/4iROovI", cadText: "https://a360.co/4iROovI", 
      tags: [TagsStates.NA, TagsStates.VerticalSlides,TagsStates.Bucket,TagsStates.Intake,TagsStates.Bevel,TagsStates.Transfer,TagsStates.HDPE],
      season: [TagsStates.NA,TagsStates.FreightFrenzy],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    }, 
    { 
      id: 5, title: 'Thor',
      description: 'Early Iteration of the 5795 POWERPLAY Thor Robot. The robot involves a basic grabber mechanism mounted to a single set of vertical SAR330 linear slides. ', 
      imageLink: './Images/POWERPLAY5795.png', 
      teamNumber: '5795', teamName: "Back to the Drawing Board", teamLink: 'https://ecgrobotics.org//ftc5795/', 
      cadLink: "https://a360.co/4a1pKoh", cadText: "https://a360.co/4a1pKoh", 
      tags: [TagsStates.NA, TagsStates.Mecanum, TagsStates.VerticalSlides,TagsStates.Claw,TagsStates.OdometryPods, TagsStates.Webcam,TagsStates.Belt,TagsStates.HDPE],
      season: [TagsStates.NA,TagsStates.POWERPLAY],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    }, 
  ];
  const handleCardClick = (card) => {
    if (card.id == selectedCard){
      setSelectedCard(null);
    }else {
      setSelectedCard(card.id);
    } 
    };
  const checkDevice = () => {
    setIsMobile(window.innerWidth <= 768); // Threshold for mobile devices
  };
  function findString(list,target){
    for (let i = 0; i < list.length; i++) {
      if (list[i] == target){
        return true;
      }
    }
    return false;
  }
  const cards = [];
  var deletedCards = 0;
 for (let i = 0; i < preFilteredCards.length; i++) {
  var Allowed = true;
    var CARDTAGS = preFilteredCards[i].tags;
    var CARDSEASONS = preFilteredCards[i].season;
    var CARDDRIVE = preFilteredCards[i].drive;
   if ((CARDSEASONS[1] == Season || Season == 'N/A')){
       cards[i] = preFilteredCards[i];
    }else{
      deletedCards = deletedCards +1;
      Allowed = false;
   }
   if ((CARDDRIVE[1] == Drivetrain || Drivetrain == 'N/A')){
    cards[i] = preFilteredCards[i];
 }else{
  if (Allowed == true){
    deletedCards = deletedCards +1;
  }
   Allowed = false;
}
    var n = 0;
    for (let index = 0; index < selectedTags.length; index++) {
      if (findString(CARDTAGS,selectedTags[index])){
        n = n+1
      }
     }
     if (n == selectedTags.length &&  Allowed == true){
      cards[i] = preFilteredCards[i];
     }else{
      if (Allowed == true){
        deletedCards = deletedCards +1;
      }
      Allowed = false;
      if (cards[i] == preFilteredCards[i]){
        delete cards[i]
      }
     }
  }
  window.addEventListener('resize', checkDevice);
  return (
    <div className={`App ${isMobile ? 'mobile' : 'computer'}`}>
      <title>Mech Nest</title>
      <Navbar other = {true} isMobile ={isMobile} />
      <MechanismHandler Tags={TagsList} setSeason={setSeason} setDrive = {setDrivetrain} setTags = {setTags}/>
      <div className={cards.length < 1 || !cards.length ||cards === undefined ||deletedCards == preFilteredCards.length ? 'App-Text' : 'invisible'}>
      No Results Found
      </div>
      <div className={`card-container ${isMobile ? 'mobile' : 'computer'}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            imageLink={card.imageLink}
            teamLink={card.teamLink}
            teamName={card.teamName}
            teamNumber={card.teamNumber}
            cadLink={card.cadLink}
            cadText={card.cadText}
            tags={card.tags}
            season = {card.season}
            drivetrain = {card.drive}
            isMobile={isMobile}
            onClick={() => handleCardClick(card)}
            isFullscreen  = {card.id == selectedCard}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
