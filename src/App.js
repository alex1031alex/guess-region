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
import {GameStatus, RegionStatus, ScoresForRightAnswer, Message} from './const';
import {
  nextQuestion, 
  regionStatusChanged, 
  failedAttemptsCountInc, 
  failedAttemptsCountReset, 
  scoreIncreased 
} from './store/reducer';

const SHOW_MESSAGE_TIME = 500;

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
          showMessage(Message.SUCCESS, coordX, coordY);
          break;
        }
        case 1: {
          dispatch(regionStatusChanged(regionId, RegionStatus.FROM_SECOND_TRY));
          dispatch(scoreIncreased(ScoresForRightAnswer.FROM_SECOND_TRY));
          dispatch(failedAttemptsCountReset());
          showMessage(Message.SUCCESS, coordX, coordY);
          break;
        }
        case 2: {
          dispatch(regionStatusChanged(regionId, RegionStatus.FROM_THIRD_TRY));
          dispatch(scoreIncreased(ScoresForRightAnswer.FROM_THIRD_TRY));
          dispatch(failedAttemptsCountReset());
          showMessage(Message.SUCCESS, coordX, coordY);
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

      showMessage(Message.MISTAKE, coordX, coordY);
      dispatch(failedAttemptsCountInc());
    }
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
