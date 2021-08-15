import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Map from './components/map/map';
import GameRules from './components/game-rules/game-rules';
import Info from './components/info/info';
import {useState} from 'react';

import {GameStatus, RegionStatus} from './const';
import {regionIds, createIdToStatusMap} from './data/region-data';

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

  const initialRegionsStatus = createIdToStatusMap();
  const [regionsStatus, setRegionsStatus] = useState(initialRegionsStatus);
  const getRegionStatusById = (id) => {
    return regionsStatus[id];
  };

  const onRegionClick = (regionId) => {
    setRegionsStatus({...regionsStatus, [regionId]: RegionStatus.FAILED});
  };

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Map gameStatus={gameStatus} onRegionClick={onRegionClick} getRegionStatus={getRegionStatusById} />
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
