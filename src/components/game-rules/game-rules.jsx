import React from 'react';
import './game-rules.css';

const GameRules = (props) => {
  const {onStartButtonClick} = props;

  return <section className="popup game-rules">
    <div className="popup__inner">
      <h2 className="popup__title">
        Как хорошо Вы знаете Смоленскую область?
      </h2>
      <p className="popup__text">
        Задача: найти на карте все районы Смоленской области
      </p>
      <p className="popup__text">
        Найденные с первого раза окрашиваются в <span className="popup__text--green">зеленый</span> цвет, со второго - в <span className="popup__text--yellow">жёлтый</span>, с третьего - в <span className="popup__text--orange">оранжевый</span>.
      </p>
      <p className="popup__text">
        После трех неверных попыток правильный район выделяется <span className="popup__text--crimson">малиновым</span> цветом, а после клика по нему, становится <span className="popup__text--red">красным</span>.
      </p>
      <button className="popup__btn" onClick={onStartButtonClick}
      >Начать тест!</button>
    </div>

  </section>;
};

export default GameRules;
