import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Map from './components/map/map';
import GameRules from './components/game-rules/game-rules';
import Info from './components/info/info';
import {useState, useEffect} from 'react';

import {GameStatus, RegionStatus} from './const';
import {regionIds, createIdToStatusMap} from './data/region-data';

const TIMEOUT_BEFORE_GAME_FINISH = 600;
let regionsInGame = [...regionIds];
let failedTryCount = 0;

function App() {
  const [gameStatus, setGameStatus] = useState(GameStatus.UNSTARTED);
  const excludeRegionFromGame = (region) => {
    regionsInGame = regionsInGame.filter((regionInGame) => regionInGame !== region);
  };

  const initialRegionsStatus = createIdToStatusMap();
  const [regionsStatus, setRegionsStatus] = useState(initialRegionsStatus);

  useEffect(() => {
    if (regionsInGame.length === 0) {
      setTimeout(finishGame, TIMEOUT_BEFORE_GAME_FINISH);
    }
  }, [regionsStatus]);

  const [playingRegion, setPlayingRegion] = useState(null);
  
  const getRandomRegion = () => {
    const maxIndex = regionsInGame.length - 1;
    const randomIndex = Math.floor(Math.random() * (maxIndex + 1));

    return regionsInGame[randomIndex];
  };

  const getRegionStatusById = (id) => {
    return regionsStatus[id];
  };

  const startGame = () => {
    setGameStatus(GameStatus.STARTED);
    setPlayingRegion(getRandomRegion());
  };

  const finishGame = () => {
    setGameStatus(GameStatus.FINISHED);
    alert(`Game finished!`);
  };

  const handleRegionClick = (regionId) => {
    if (gameStatus !== GameStatus.STARTED) {
      return;
    }

    const playingRegionStatus = regionsStatus[playingRegion];

    if (playingRegionStatus !== RegionStatus.INITIAL && 
      playingRegionStatus !== RegionStatus.FAILED) {
        return;
      }

    if (playingRegion === regionId) {
      switch (failedTryCount) {
        case 0: {
          setRegionsStatus({...regionsStatus, [playingRegion]: RegionStatus.GUESSED_ON_FIRST_TRY})
          break;
        }
        case 1: {
          setRegionsStatus({...regionsStatus, [playingRegion]: RegionStatus.GUESSED_ON_SECOND_TRY})
          break;
        }
        case 2: {
          setRegionsStatus({...regionsStatus, [playingRegion]: RegionStatus.GUESSED_ON_THIRD_TRY})
          break;
        }
        default: {
          setRegionsStatus({...regionsStatus, [playingRegion]: RegionStatus.UNGUESSED});
        }
      }
      
      excludeRegionFromGame(playingRegion);
      failedTryCount = 0;

      if (regionsInGame.length !== 0) {
        setPlayingRegion(getRandomRegion());
      }
      
      return;
    }

    if (playingRegionStatus === RegionStatus.FAILED) {
      return;
    }

    failedTryCount++;
    
    if (failedTryCount >= 3) {
      setRegionsStatus(
        {...regionsStatus, [playingRegion]: RegionStatus.FAILED});
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Map handleRegionClick={handleRegionClick} getRegionStatus={getRegionStatusById} />
        {gameStatus === GameStatus.UNSTARTED ?
          <GameRules onStartButtonClick={startGame} /> : ``
        }
        {gameStatus !== GameStatus.UNSTARTED ? 
          <Info playingRegionId={playingRegion} /> : ``
        }
      </main>
      <Footer />
    </div>
  );
}

export default App;
