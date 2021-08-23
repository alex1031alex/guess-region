import React from 'react';
import Question from '../question/question';
import Result from '../result/result';
import './info.css';

const Info = (props) => {
  const {playingRegionId, isGameFinished, resultValue} = props;
 
  return (
    <section className="info">
      {!isGameFinished ? <Question playingRegionId={playingRegionId} /> : ``}
      <Result isGameFinished={isGameFinished} resultValue={resultValue} />
    </section>
  );
};

export default Info;
