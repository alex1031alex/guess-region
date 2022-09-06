import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Question from '../question/question';
import Score from '../score/score';
import './info.css';
import { GameStatus } from '../../const';

const Info = (props) => {
  const {score} = props;
  const gameStatus = useSelector((state) => state.gameStatus);
  const isGameFinished = gameStatus === GameStatus.FINISHED;

  return (
    <section className="info">
      {!isGameFinished ? <Question /> : ``}
      <Score value={score} />
    </section>
  );
};

Info.propTypes = {
  playingRegionId: PropTypes.string,
  isGameFinished: PropTypes.bool,
  score: PropTypes.number,
};

export default Info;
