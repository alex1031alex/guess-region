import React from 'react';
import Question from '../question/question';
import './info.css';

const Info = (props) => {
  const {playingRegionId} = props;
 
  return (
    <section className="info">
      <Question playingRegionId={playingRegionId}></Question>
    </section>

  );
};

export default Info;
