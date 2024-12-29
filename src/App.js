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
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTags, setTag] = useState('N/A'); 
  const [selectedSeason, setSeason] = useState('N/A'); 
  const preFilteredCards = [
    { 
      id: 1, title: 'V1 Bot (SOAR)',
      description: 'We made a bot using the GoBilda intake, vertical slides, an extendo, and two axons for a rotation mechanism', 
      imageLink: './Images/V1Bot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://mystu29102.autodesk360.com/g/shares/SH286ddQT78850c0d8a423c01478f66d1398", cadText: "V1 Design", 
      tags: [mechanismStates.NA, mechanismStates.DriveTrain, mechanismStates.VerticalSlides, mechanismStates.Extendo,mechanismStates.Arm,mechanismStates.OdometryPods,mechanismStates.Intake],
      season: [seasonStates.NA,seasonStates.IntoTheDeep]
    },
    { 
      id: 2, title: 'CenterStage Bot',
      description: 'Custom bucket, belt driven, intake', 
      imageLink: './Images/CenterStageBot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/4gyzBEx", cadText: "Center Stage Bot", 
      tags: [mechanismStates.NA, mechanismStates.DriveTrain, mechanismStates.VerticalSlides,mechanismStates.Bucket,mechanismStates.OdometryPods,mechanismStates.Intake],
      season: [seasonStates.NA,seasonStates.CENTERSTAGE]
    }, 
    { 
      id: 3, title: 'Power Play Bot',
      description: 'placeholder', 
      imageLink: './Images/PowerPlayBot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/41MRQSc", cadText: "PowerPlayBot", 
      tags: [mechanismStates.NA, mechanismStates.DriveTrain, mechanismStates.VerticalSlides,mechanismStates.Bucket,mechanismStates.Claw,mechanismStates.Intake,mechanismStates.Arm],
      season: [seasonStates.NA,seasonStates.POWERPLAY]
    }, 
    { 
      id: 4, title: 'Freight Frenzy Bot',
      description: 'placeholder', 
      imageLink: './Images/FreightFrenzyBot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/4iROovI", cadText: "FreightFrenzyBot", 
      tags: [mechanismStates.NA, mechanismStates.DriveTrain, mechanismStates.VerticalSlides,mechanismStates.Bucket,mechanismStates.Intake],
      season: [seasonStates.NA,seasonStates.FreightFrenzy]
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
      <title>CAD Website</title>
      <Navbar />
      <MechanismHandler selectedTags={selectedTags} setTag={setTag} selectedSeason = {selectedSeason} setSeason = {setSeason} />
      
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
