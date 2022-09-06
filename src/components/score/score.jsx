import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import './score.css';

const Score = () => {
  const value = useSelector((state) => state.score);

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

Score.propTypes = {
  value: PropTypes.number,
};

export default Score;
