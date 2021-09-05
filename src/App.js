import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Map from './components/map/map';
import GameRules from './components/game-rules/game-rules';
import FinalMessage from './components/final-message/final-message';
import Info from './components/info/info';
import Tooltip from './components/tooltip/tooltip';
import {useState, useEffect} from 'react';

import {GameStatus, RegionStatus} from './const';
import {regionIds, createIdToStatusMap} from './data/region-data';

const SUCCESS_MESSAGE = `Вы угадали!`;
const MISTAKE_MESSAGE = `Нет, это не он!`;
const SHOW_MESSAGE_TIME = 500;
const TIMEOUT_BEFORE_GAME_FINISH = 600;
const PersentageForRightAnswer = {
  FROM_FIRST_TIME: 4,
  FROM_SECOND_TIME: 3,
  FROM_THIRD_TIME: 1
};

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
  };

  const restartGame = () => {
  };

  const [message, setMessage] = useState(null);
  const showMessage = (text, coordX, coordY) => {
    const x = `${coordX}px`;
    const y = `${coordY}px`;

    setMessage({text, x, y});
 
    setTimeout(() => {
      setMessage(null);
    }, SHOW_MESSAGE_TIME);
  };
  const [userResult, setUserResult] = useState(0);

  const handleRegionClick = (regionId, coordX, coordY) => {
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
          setRegionsStatus({...regionsStatus, [playingRegion]: RegionStatus.GUESSED_ON_FIRST_TRY});
          showMessage(SUCCESS_MESSAGE, coordX, coordY);
          setUserResult((currentUserResult) => {
            return currentUserResult + PersentageForRightAnswer.FROM_FIRST_TIME;
          });
          break;
        }
        case 1: {
          setRegionsStatus({...regionsStatus, [playingRegion]: RegionStatus.GUESSED_ON_SECOND_TRY});
          showMessage(SUCCESS_MESSAGE, coordX, coordY);
          setUserResult((currentUserResult) => {
            return currentUserResult + PersentageForRightAnswer
            .FROM_SECOND_TIME;
          });
          break;
        }
        case 2: {
          setRegionsStatus({...regionsStatus, [playingRegion]: RegionStatus.GUESSED_ON_THIRD_TRY});
          showMessage(SUCCESS_MESSAGE, coordX, coordY);
          setUserResult((currentUserResult) => {
            return currentUserResult + PersentageForRightAnswer.FROM_THIRD_TIME;
          });
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

    showMessage(MISTAKE_MESSAGE, coordX, coordY);
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
          <Info
            playingRegionId={playingRegion}
            isGameFinished={gameStatus===GameStatus.FINISHED}
            resultValue={userResult}
          /> : ``
        }
        {
          gameStatus === GameStatus.FINISHED ?
          <FinalMessage
            onRestartButtonClick={restartGame}
            score={userResult}
          ></FinalMessage> : ``
        }
        {message ? <Tooltip 
          message={message.text} 
          coordX={message.x} 
          coordY={message.y} 
        /> : ``}

      </main>
      <Footer />
    </div>
  );
}

export default App;
