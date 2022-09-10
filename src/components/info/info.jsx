import React from 'react';
import { useSelector } from 'react-redux';
import Question from '../question/question';
import Score from '../score/score';
import './info.css';
import { GameStatus } from '../../const';

const Info = () => {
  const gameStatus = useSelector((state) => state.gameStatus);
  const isGameFinished = gameStatus === GameStatus.FINISHED;

  return (
    <section className="info">
      {!isGameFinished ? <Question /> : ``}
      <Score />
    </section>
  );
};

export default Info;
