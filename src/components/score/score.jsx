import React from 'react';
import './score.css';

const Score = (props) => {
  const {value} = props;
  return (
    <div className="score">
      <p className="score__text">Ваш текущий результат</p>
      <p>
        <span className="score__value">
          {value}
        </span>%
      </p>
    </div>
  );
};

export default Score;
