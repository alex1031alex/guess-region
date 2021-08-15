import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Map from './components/map/map';
import GameRules from './components/game-rules/game-rules';
import Info from './components/info/info';
import {useState} from 'react';

import {GameStatus} from './const';
import {regionIds} from './data/region-data';

function App() {
  const [gameStatus, setGameStatus] = useState(GameStatus.UNSTARTED);
  const startGame = () => {
    setGameStatus(GameStatus.STARTED);
  };

  const [playingRegions, setPlayingRegions] = useState(regionIds);
  const getRandomRegion = () => {
    const maxIndex = playingRegions.length - 1;
    const randomIndex = Math.floor(Math.random() * (maxIndex + 1));

    return playingRegions[randomIndex];
  };

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Map gameStatus={gameStatus} />
        {gameStatus === GameStatus.UNSTARTED ?
          <GameRules onStartButtonClick={startGame} /> : ``
        }
        {gameStatus !== GameStatus.UNSTARTED ? 
          <Info playingRegionId={getRandomRegion()} /> : ``
        }
      </main>
      <Footer />
    </div>
  );
}

export default App;
