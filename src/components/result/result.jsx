import React from 'react';
import './result.css';

const Result = (props) => {
  const {resultValue, isGameFinished} = props;
  return (
    <div className="info__item result">
      <p className="result__text">Ваш {isGameFinished ? `финальный` : `текущий`} результат</p>
      <p>
        <span className="result__value">
          {resultValue}
        </span>%
      </p>
    </div>
  );
};

export default Result;
