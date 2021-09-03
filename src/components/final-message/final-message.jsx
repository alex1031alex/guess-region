import React from 'react';
import './final-message.css';

import Popup from '../popup/popup';
import Button from '../button/button';

const FinalMessage = (props) => {
  const {onRestartButtonClick} = props;
  return (
    <Popup>
      <h2 className="final-message__title">Ваш финальный результат: 97%</h2>
      <p className="final-message__text">Отличный результат! Вы хорошо знаете Смоленскую область
      </p>
      <Button onClick={onRestartButtonClick}>Попробовать еще раз</Button>
    </Popup>
  ); 
};

export default FinalMessage;
