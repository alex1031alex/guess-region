import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Map from './components/map/map';
import GameRules from './components/game-rules/game-rules';
import {useState} from 'react';

import {GameStatus} from './const';

function App() {
  const [gameStatus, setGameStatus] = useState(GameStatus.UNSTARTED);
  const startGame = () => {
    setGameStatus(GameStatus.STARTED);
  };

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Map gameStatus={gameStatus} />
        {gameStatus === GameStatus.UNSTARTED ?
          <GameRules onStartButtonClick={startGame} /> : ``
        }
      </main>
      <Footer />
    </div>
  );
}

export default App;
