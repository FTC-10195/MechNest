import logo from './Images/nightowlslogo.png';
import './App.css';
import './index.css';
function App() {
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
     
      CENTER
      <p>
      </p>
    </div>
  );
}

export default App;
