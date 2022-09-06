import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Map from './components/map/map';
import GameRules from './components/game-rules/game-rules';
import FinalMessage from './components/final-message/final-message';
import Info from './components/info/info';
import Tooltip from './components/tooltip/tooltip';
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {GameStatus, RegionStatus} from './const';
import {regionIds, createIdToStatusMap} from './data/region-data';
import { gameStatusSet, playingRegionIdSet, nextQuestion, regionStatusChanged, failedAttemptsCountInc, failedAttemptsCountReset } from './store/reducer';

const SUCCESS_MESSAGE = `Вы угадали!`;
const MISTAKE_MESSAGE = `Нет, это не он!`;
const SHOW_MESSAGE_TIME = 500;
const TIMEOUT_BEFORE_GAME_FINISH = 600;
const PersentageForRightAnswer = {
  FROM_FIRST_TIME: 4,
  FROM_SECOND_TIME: 3,
  FROM_THIRD_TIME: 1
};

const getRandomRegion = (regions) => {
  const maxIndex = regions.length - 1;
  const randomIndex = Math.floor(Math.random() * (maxIndex + 1));

  return regions[randomIndex];
};

function App() {
  const [message, setMessage] = useState(null);
  const [score, setScore] = useState(0);

  console.log(useSelector((state) => state.playingRegionId));
  const gameStatus = useSelector((state) => state.gameStatus);
  const ids = useSelector((state) => state.ids);
  const playingRegion = useSelector((state) => state.entities[state.playingRegionId]);
  const failedAttemptsCount = useSelector((state) => state.failedAttemptsCount);

  const dispatch = useDispatch();

  const startGame = () => {
    dispatch(gameStatusSet(GameStatus.STARTED));
    dispatch(playingRegionIdSet(getRandomRegion(ids)));
  };

  const showMessage = (text, coordX, coordY) => {
    const x = `${coordX}px`;
    const y = `${coordY}px`;

    setMessage({text, x, y});
 
    setTimeout(() => {
      setMessage(null);
    }, SHOW_MESSAGE_TIME);
  };

  const restartGame = () => {
  //   setGameStatus(GameStatus.UNSTARTED);

  //   regionsInGame = [...regionIds];
  //   failedTryCount = 0;

  //   setRegionsStatus({...initialRegionsStatus});
  //   setPlayingRegion(null);
  //   setMessage(null);
  //   setScore(0);
  };

  const handleRegionClick = (regionId, coordX, coordY) => {
    if (gameStatus !== GameStatus.STARTED) {
      return;
    }

    if (regionId === playingRegion.id) {
      let status = RegionStatus.INITIAL;
      switch (failedAttemptsCount) {
        case 0: {
          status = RegionStatus.GUESSED_ON_FIRST_TRY;
          break;
        }
        case 1: {
          status = RegionStatus.GUESSED_ON_SECOND_TRY;
          break;
        }
        case 2: {
          status = RegionStatus.GUESSED_ON_THIRD_TRY;
          break;
        }
        default: status = RegionStatus.UNGUESSED;
      }

      dispatch(regionStatusChanged(regionId, status));
      dispatch(failedAttemptsCountReset());
      dispatch(nextQuestion());
    } else {
      if (playingRegion.status === RegionStatus.FAILED) {
        return;
      }

      dispatch(failedAttemptsCountInc());
    }
      
  //   if (playingRegion === regionId) {
  //     switch (failedTryCount) {
  //       case 0: {
  //         setRegionsStatus({...regionsStatus, [playingRegion]: RegionStatus.GUESSED_ON_FIRST_TRY});
  //         showMessage(SUCCESS_MESSAGE, coordX, coordY);
  //         setScore((currentScore) => {
  //           return currentScore + PersentageForRightAnswer.FROM_FIRST_TIME;
  //         });
  //         break;
  //       }
  //       case 1: {
  //         setRegionsStatus({...regionsStatus, [playingRegion]: RegionStatus.GUESSED_ON_SECOND_TRY});
  //         showMessage(SUCCESS_MESSAGE, coordX, coordY);
  //         setScore((currentScore) => {
  //           return currentScore + PersentageForRightAnswer
  //           .FROM_SECOND_TIME;
  //         });
  //         break;
  //       }
  //       case 2: {
  //         setRegionsStatus({...regionsStatus, [playingRegion]: RegionStatus.GUESSED_ON_THIRD_TRY});
  //         showMessage(SUCCESS_MESSAGE, coordX, coordY);
  //         setScore((currentScore) => {
  //           return currentScore + PersentageForRightAnswer.FROM_THIRD_TIME;
  //         });
  //         break;
  //       }
  //       default: {
  //         setRegionsStatus({...regionsStatus, [playingRegion]: RegionStatus.UNGUESSED});
  //       }
  //     }

  //     excludeRegionFromGame(playingRegion);
  //     failedTryCount = 0;

  //     if (regionsInGame.length !== 0) {
  //       setPlayingRegion(getRandomRegion());
  //     }
      
  //     return;
  //   }

  //   if (playingRegionStatus === RegionStatus.FAILED) {
  //     return;
  //   }

  //   showMessage(MISTAKE_MESSAGE, coordX, coordY);
  //   failedTryCount++;

  //   if (failedTryCount >= 3) {
  //     setRegionsStatus(
  //       {...regionsStatus, [playingRegion]: RegionStatus.FAILED});
  //   }
  };

  return (
    <div className="app">
      {gameStatus !== GameStatus.STARTED && <Header />}
      <main className="app__main">
        <Map handleRegionClick={handleRegionClick} />
        {gameStatus === GameStatus.UNSTARTED ?
          <GameRules onStartButtonClick={startGame} /> : ``
        }
        {gameStatus !== GameStatus.UNSTARTED ? 
          <Info
            score={score}
          /> : ``
        }
        {
          gameStatus === GameStatus.FINISHED ?
          <FinalMessage
            onRestartButtonClick={restartGame}
            score={score}
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
