import React from 'react';
import Question from '../question/question';
import Score from '../score/score';
import './info.css';

const Info = (props) => {
  const {playingRegionId, isGameFinished, score} = props;
 
  return (
    <section className="info">
      {!isGameFinished ? <Question playingRegionId={playingRegionId} /> : ``}
      <Score value={score} />
    </section>
  );
};

export default Info;
