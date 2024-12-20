import { useState } from 'react';
import './App.css';
import Card from './Card';
import Navbar from './Navbar';
import TagHandler from './TagHandler';
import logo from './Images/nightowlslogo.png';
import tagStates from './TagState';
import './index.css';

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedFullscreen, setFullScreen] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTags, setTag] = useState('N/A'); 

  const preFilteredCards = [
    { 
      id: 1, title: 'Title 1', description: 'descriptiondescription...', 
      imageLink: 'https://images.pexels.com/photos/20787/pexels-photo.jpg', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      fusionLink: "https://mystu29102.autodesk360.com", fusionText: "V2 Design", 
      tags: [tagStates.NA, tagStates.DriveTrain, tagStates.VerticalSlides] 
    },
    { 
      id: 2, title: 'Title 2', description: 'descriptiondescription...', 
      imageLink: 'https://images.pexels.com/photos/20787/pexels-photo.jpg', 
      teamNumber: '10195', teamName: "Mechanical Maniacs", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      fusionLink: "https://mystu29102.autodesk360.com", fusionText: "V2 Design", 
      tags: [tagStates.NA, tagStates.DriveTrain, tagStates.VerticalSlides, tagStates.WholeRobot] 
    },
    { 
      id: 3, title: 'Title 3', description: 'descriptiondescription...', 
      imageLink: 'https://images.pexels.com/photos/20787/pexels-photo.jpg', 
      teamNumber: '10195', teamName: "Mechanical Maniacs", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      fusionLink: "https://mystu29102.autodesk360.com", fusionText: "V2 Design", 
      tags: [tagStates.NA, tagStates.DriveTrain, tagStates.VerticalSlides, tagStates.WholeRobot] 
    },
    { 
      id: 4, title: 'Title 4', description: 'descriptiondescription...', 
      imageLink: 'https://images.pexels.com/photos/20787/pexels-photo.jpg', 
      teamNumber: '10195', teamName: "Mechanical Maniacs", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      fusionLink: "https://mystu29102.autodesk360.com", fusionText: "V2 Design", 
      tags: [tagStates.NA, tagStates.DriveTrain, tagStates.VerticalSlides, tagStates.WholeRobot] 
    },
    { 
      id: 5, title: 'Title 5', description: 'descriptiondescription...', 
      imageLink: 'https://images.pexels.com/photos/20787/pexels-photo.jpg', 
      teamNumber: '10195', teamName: "Mechanical Maniacs", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      fusionLink: "https://mystu29102.autodesk360.com", fusionText: "V2 Design", 
      tags: [tagStates.NA, tagStates.DriveTrain, tagStates.VerticalSlides, tagStates.WholeRobot] 
    },
    { 
      id: 6, title: 'Title 6', description: 'descriptiondescription...', 
      imageLink: 'https://images.pexels.com/photos/20787/pexels-photo.jpg', 
      teamNumber: '10195', teamName: "Mechanical Maniacs", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      fusionLink: "https://mystu29102.autodesk360.com", fusionText: "V2 Design", 
      tags: [tagStates.NA, tagStates.DriveTrain, tagStates.VerticalSlides, tagStates.WholeRobot] 
    }
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
    if (findString(CARDTAGS,selectedTags)){
       cards[i] = preFilteredCards[i];
    }
  }
  window.addEventListener('resize', checkDevice);

  return (
    <div className={`App ${isMobile ? 'mobile' : 'computer'}`}>
      <title>CAD Website</title>
      <Navbar />
      <TagHandler selectedTags={selectedTags} setTag={setTag} tagStates={tagStates} />
      
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
            fusionLink={card.fusionLink}
            fusionText={card.fusionText}
            tags={card.tags}
            isMobile={isMobile}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
