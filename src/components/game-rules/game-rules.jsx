import React from 'react';
import PropTypes from 'prop-types';
import './game-rules.css';

import Popup from '../popup/popup';
import Button from '../button/button';

const GameRules = (props) => {
  const {onStartButtonClick} = props;

  return (
    <Popup>
      <React.Fragment>
        <h2 className="game-rules__title">Как хорошо Вы знаете Смоленскую область?</h2>
        <p className="game-rules__text">Задача: найти на карте все районы Смоленской области</p>
        <p className="game-rules__text">Найденные с первого раза окрашиваются в <span className="game-rules__text--green">зеленый</span> цвет, со второго - в <span className="game-rules__text--yellow">жёлтый</span>, с третьего - в <span className="game-rules__text--orange">оранжевый</span>.
        </p>
        <p className="game-rules__text">После трех неверных попыток правильный район выделяется <span className="game-rules__text--crimson">малиновым</span> цветом, а после клика по нему, становится <span className="game-rules__text--red">красным</span>.
        </p>
        <Button onClick={onStartButtonClick}>Начать тест</Button>
      </React.Fragment>
    </Popup>
  ); 
};

GameRules.propTypes = {
  onStartButtonClick: PropTypes.func,
};

export default GameRules;
