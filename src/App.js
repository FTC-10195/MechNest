import { useState } from 'react';
import './App.css';
import Card from './Card';
import Navbar from './Navbar';
import MechanismHandler from './MechanismHandler';
import mechanismStates from './MechanismState';
import seasonStates from './SeasonStates'
import './index.css';

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedFullscreen, setFullScreen] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);;
  const [selectedTags, setTag] = useState('N/A'); 
  const [selectedSeason, setSeason] = useState('N/A'); 
  const preFilteredCards = [
    { 
      id: 1, title: '🗣️SOAR (V1)🗣️',
      description: 'Mechanum chasis ( 2 belt drive and 2 direct driven), Misumi Vertical slide system, Rotating arm powered by axon maxs, Extendo system power by axon mini, Wrist and intake powered by gobilda servos and gecko wheel, 3 Odometry pods Max Score: 63 points solo Max Auto: 16 points', 
      imageLink: './Images/V1Bot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/4d2JjMT", cadText: "https://a360.co/4d2JjMT", 
      tags: [mechanismStates.NA, mechanismStates.DriveTrain, mechanismStates.VerticalSlides,mechanismStates.Arm,mechanismStates.OdometryPods,mechanismStates.Intake],
      season: [seasonStates.NA,seasonStates.IntoTheDeep]
    },
    { 
      id: 2, title: '🌙Otto the Owl🦉',
      description: 'Custom DT, All belt powered, Aluminum Plates, Transfer System, Servo Chained powered intake using flywheels, Outtake powered by axon minis, rotation mech powered by axon maxs', 
      imageLink: './Images/CenterStageBot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/4gyzBEx", cadText: "https://a360.co/4gyzBEx", 
      tags: [mechanismStates.NA, mechanismStates.DriveTrain, mechanismStates.VerticalSlides,mechanismStates.Bucket,mechanismStates.OdometryPods,mechanismStates.Intake],
      season: [seasonStates.NA,seasonStates.CENTERSTAGE]
    }, 
    { 
      id: 3, title: '💪Power💪',
      description: "Belted DT, Virtual Fourbar, Linkage Claw, Virtical Slides", 
      imageLink: './Images/PowerPlayBot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/41MRQSc", cadText: "https://a360.co/41MRQSc", 
      tags: [mechanismStates.NA, mechanismStates.DriveTrain, mechanismStates.VerticalSlides,mechanismStates.Bucket,mechanismStates.Claw,mechanismStates.Arm],
      season: [seasonStates.NA,seasonStates.POWERPLAY]
    }, 
    { 
      id: 4, title: '🚂Hoot Hoot🚂',
      description: 'Bevel Driven DT, Transfer system, flywheel intake, bucket outtake powered by servo', 
      imageLink: './Images/FreightFrenzyBot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/4iROovI", cadText: "https://a360.co/4iROovI", 
      tags: [mechanismStates.NA, mechanismStates.DriveTrain, mechanismStates.VerticalSlides,mechanismStates.Bucket,mechanismStates.Intake],
      season: [seasonStates.NA,seasonStates.FreightFrenzy]
    }, 
    { 
      id: 5, title: '⚡Thor⚡',
      description: 'Early Iteration of the 5795 POWERPLAY Thor Robot. The robot involves a basic grabber mechanism mounted to a single set of vertical SAR330 linear slides. ', 
      imageLink: './Images/POWERPLAY5795.png', 
      teamNumber: '5795', teamName: "Back to the Drawing Board", teamLink: 'https://ecgrobotics.org//ftc5795/', 
      cadLink: "https://a360.co/4a1pKoh", cadText: "https://a360.co/4a1pKoh", 
      tags: [mechanismStates.NA, mechanismStates.DriveTrain, mechanismStates.VerticalSlides,mechanismStates.Claw,mechanismStates.OdometryPods, mechanismStates.Webcam],
      season: [seasonStates.NA,seasonStates.POWERPLAY]
    }, 
  ];

  const handleCardClick = (card) => { setSelectedCard(card); };
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
  for (let i = 0; i < preFilteredCards.length; i++) {
    var CARDTAGS = preFilteredCards[i].tags;
    var CARDSEASONS = preFilteredCards[i].season;
   if (findString(CARDTAGS,selectedTags) && findString(CARDSEASONS,selectedSeason)){
       cards[i] = preFilteredCards[i];
       if (cards[i].tags[0] == "N/A"){
        cards[i].tags = cards[i].tags.filter(item => item !== "N/A");
       }
       if (cards[i].season[0] == "N/A"){
        cards[i].season = cards[i].season.filter(item => item !== "N/A");
       }
    }
  }
  window.addEventListener('resize', checkDevice);

  return (
    <div className={`App ${isMobile ? 'mobile' : 'computer'}`}>
      <title>Mech Nest</title>
      <Navbar other = {true} isMobile ={isMobile} />
      <MechanismHandler selectedTags={selectedTags} setTag={setTag} selectedSeason = {selectedSeason} setSeason = {setSeason} isMobile = {isMobile} />
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
            isMobile={isMobile}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
