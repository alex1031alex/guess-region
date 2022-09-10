import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Map from './components/map/map';
import GameRules from './components/game-rules/game-rules';
import FinalMessage from './components/final-message/final-message';
import Info from './components/info/info';
import Tooltip from './components/tooltip/tooltip';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GameStatus, Message } from './const';
import { goToNextQuestionThunk } from './store/actions';
import { selectGameStatus, selectPlayingRegion } from './store/selectors';
import { setSuccess, setFail } from './store/slice';

const SHOW_MESSAGE_TIME = 500;

function App() {
  const [message, setMessage] = useState(null);
  const gameStatus = useSelector(selectGameStatus);
  const isGame = gameStatus === GameStatus.STARTED;
  const playingRegion = useSelector(selectPlayingRegion);

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
    if (regionId === playingRegion.id) {
      showMessage(Message.SUCCESS, coordX, coordY);
      dispatch(setSuccess());
      dispatch(goToNextQuestionThunk());
    } else {
      showMessage(Message.MISTAKE, coordX, coordY);
      dispatch(setFail());
    }
  };

  return (
    <div className="app">
      {gameStatus !== GameStatus.STARTED && <Header />}
      <main className="app__main">
        <Map handleRegionClick={isGame ? handleRegionClick : () => {}} />
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
