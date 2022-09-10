import React from 'react';
import { useSelector } from 'react-redux';
import { selectScore } from '../../store/selectors';
import './score.css';

const Score = () => {
  const value = useSelector(selectScore);

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
