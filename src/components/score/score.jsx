import React from 'react';
import PropTypes from 'prop-types';
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

Score.propTypes = {
  value: PropTypes.number,
};

export default Score;
