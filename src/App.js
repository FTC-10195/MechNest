import { useState } from 'react';
import './App.css';
import Card from './Card';
import Navbar from './Navbar'
import logo from './Images/nightowlslogo.png';
import './index.css';
//Use the 'App.css to give color, shape, size, style, etc
function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedFullscreen, setFullScreen] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const cards = [
      { id: 1, title: 'Title 1', description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription descriptiondescriptiondescription descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',imageLink: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350', teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', fusionLink: "https://mystu29102.autodesk360.com/g/shares/SH286ddQT78850c0d8a4feaf835c23ef11b0", fusionText: "V2 Design"},
      { id: 2, title: 'Title2', description: 'description',imageLink: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"', teamNumber: '10195' , teamName: "The Mechanical Maniacs of Mayhem", teamLink: 'https://ecgrobotics.org/ftc10195/', fusionLink: "https://mystu29102.autodesk360.com/g/shares/SH286ddQT78850c0d8a4feaf835c23ef11b0", fusionText: "V2 Design"}
  ];

  const handleCardClick = (card) => {setSelectedCard(card);};
  const checkDevice = () => {
    setIsMobile(window.innerWidth <= 768); // Assuming 768px is the threshold for mobile devices
  };
  window.addEventListener('resize', checkDevice);
    return (
    <div className={`App ${isMobile ? 'mobile' : 'computer'}`}>
      <title>{ "CAD Website" }</title>
      <Navbar/>
      <div className={`card-container ${isMobile ? 'mobile' : 'computer'}`}>
      {cards.map((card) => ( 
        <Card
            key={card.id}
            title={card.title}
            description={card.description}
            imageLink = {card.imageLink}
            teamLink = {card.teamLink}
            teamName = {card.teamName}
            teamNumber = {card.teamNumber}
            fusionLink = {card.fusionLink}
            fusionText = {card.fusionText}
            onClick={
              () => handleCardClick(card)
             }
        />
      ))}
      </div>
      CENTER
      <p>
      </p>
    </div>
  );
}

export default App;
