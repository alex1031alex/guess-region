import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import './final-message.css';

import Popup from '../popup/popup';
import Button from '../button/button';
import { gameReset, nextQuestion } from '../../store/reducer';

const getReview = (score) => {
  if (score === 100) {
    return `Великолепный результат! Вы превосходно знаете Смоленскую область!`
  }

  if (score >= 90) {
    return `Отличный результат! Вы хорошо знаете Смоленскую область.`
  }

  if (score >= 80) {
    return `Вполне достойный результат. Вы неплохо знаете Смоленскую область.`
  }

  if (score >= 65) {
    return `Средний результат. В целом Вы знаете Смоленскую область, но иногда допускаете ошибки.`
  }

  if (score >= 45) {
    return `Слабенько. Вы плохо знаете Смоленскую область.`
  } 

  return `Очень жаль, но Вы совсем не знаете Смоленскую область`;
};

const FinalMessage = () => {
  const score = useSelector((state) => state.score);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(gameReset());
    dispatch(nextQuestion());
  };

  return (
    <Popup>
      <React.Fragment>
        <h2 className="final-message__title">Ваш финальный результат: {score}%</h2>
        <p className="final-message__text">{getReview(score)}
        </p>
        <Button onClick={onClick}>Попробовать еще раз</Button>
      </React.Fragment>
    </Popup>
  ); 
};

FinalMessage.propTypes = {
  onRestartButtonClick: PropTypes.func,
  score: PropTypes.number,
};

export default FinalMessage;
