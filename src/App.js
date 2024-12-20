import { useState } from 'react';
import './App.css';
import Card from './Card';
import logo from './Images/nightowlslogo.png';
import './index.css';
//Use the 'App.css to give color, shape, size, style, etc
function App() {
    const [selectedCard, setSelectedCard] = useState(null);
    const cards = [
        { id: 1, title: 'Test 1', description: 'Lorem ipsum'},
        { id: 2, title: 'Test 2', description: 'Qui dolorem ipsum'}
    ];

    const handleCardClick = (card) => {setSelectedCard(card);};

    return (
    <div className="App">
      <title>{ "CAD Website" }</title>
      <header className="App-header">
      <div className="left-side">
      <span className="header-text">CAD COOP 💀</span>
      <a
          href=" https://docs.google.com/forms/d/e/1FAIpQLSfTPRbnQ86wxPXeoHmyfvKjxQs7hOzbsfSXYbpvG3JEcj7jaw/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
        >
            <span className="post-button">Post</span>
        </a>
      </div>
        <a
          href="https://ecgrobotics.org/ftc10195/"
          target="_blank"
          rel="noopener noreferrer"
        >
            <img src={logo} alt="logo" className = "App-logo"/>
        </a>
      </header>

      <div className="card-container">
      {cards.map((card) => ( 
        <Card
            key={card.id}
            title={card.title}
            description={card.description}
            onClick={() => handleCardClick(card)}
        />
      ))}
      </div>

      {selectedCard && (<div className="card-details">
          <h2>{selectedCard.title}</h2>
          <p>{selectedCard.description}</p>
          <button onClick={() => setSelectedCard(null)}>Close</button>
          </div>
      )}
     
      CENTER
      <p>
      </p>
    </div>
  );
}

export default App;
