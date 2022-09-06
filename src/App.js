import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Map from './components/map/map';
import GameRules from './components/game-rules/game-rules';
import FinalMessage from './components/final-message/final-message';
import Info from './components/info/info';
import Tooltip from './components/tooltip/tooltip';
import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {GameStatus, RegionStatus, ScoresForRightAnswer} from './const';
import {regionIds, createIdToStatusMap} from './data/region-data';
import { 
  gameStatusSet, 
  nextQuestion, 
  regionStatusChanged, 
  failedAttemptsCountInc, 
  failedAttemptsCountReset, 
  scoreIncreased 
} from './store/reducer';

const SUCCESS_MESSAGE = `Вы угадали!`;
const MISTAKE_MESSAGE = `Нет, это не он!`;
const SHOW_MESSAGE_TIME = 500;
const TIMEOUT_BEFORE_GAME_FINISH = 600;

function App() {
  const [message, setMessage] = useState(null);

  const gameStatus = useSelector((state) => state.gameStatus);
  const playingRegion = useSelector((state) => state.entities[state.playingRegionId]);
  const failedAttemptsCount = useSelector((state) => state.failedAttemptsCount);

  const dispatch = useDispatch();

  const showMessage = (text, coordX, coordY) => {
    const x = `${coordX}px`;
    const y = `${coordY}px`;

    setMessage({text, x, y});
 
    setTimeout(() => {
      setMessage(null);
    }, SHOW_MESSAGE_TIME);
  };

  const handleRegionClick = (regionId, coordX, coordY) => {
    if (gameStatus !== GameStatus.STARTED) {
      return;
    }

    if (regionId === playingRegion.id) {
      switch (failedAttemptsCount) {
        case 0: {
          dispatch(regionStatusChanged(regionId, RegionStatus.FROM_FIRST_TRY));
          dispatch(scoreIncreased(ScoresForRightAnswer.FROM_FIRST_TRY));
          break;
        }
        case 1: {
          dispatch(regionStatusChanged(regionId, RegionStatus.FROM_SECOND_TRY));
          dispatch(scoreIncreased(ScoresForRightAnswer.FROM_SECOND_TRY));
          dispatch(failedAttemptsCountReset());
          break;
        }
        case 2: {
          dispatch(regionStatusChanged(regionId, RegionStatus.FROM_THIRD_TRY));
          dispatch(scoreIncreased(ScoresForRightAnswer.FROM_THIRD_TRY));
          dispatch(failedAttemptsCountReset());
          break;
        }
        default: {
          dispatch(regionStatusChanged(regionId, RegionStatus.UNGUESSED));
          dispatch(failedAttemptsCountReset());
        }
      }

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
        {gameStatus === GameStatus.UNSTARTED ? <GameRules /> : ``}
        {gameStatus !== GameStatus.UNSTARTED ? <Info /> : ``}
        {gameStatus === GameStatus.FINISHED ? <FinalMessage /> : ``}
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
