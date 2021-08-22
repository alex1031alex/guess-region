import React from 'react';
import Question from '../question/question';
import Result from '../result/result';
import './info.css';

const Info = (props) => {
  const {playingRegionId, isGameFinished} = props;
 
  return (
    <section className="info">
      {!isGameFinished ? <Question playingRegionId={playingRegionId} /> : ``}
      <Result isGameFinished={isGameFinished} />
    </section>
  );
};

export default Info;
