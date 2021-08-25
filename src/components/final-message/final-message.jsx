import React from 'react';
import './final-message.css'

const FinalMessage = () => {
  return (
    <section className="popup final-message">
      <div className="popup__inner">
        <p className="popup__title">Ваш финальный результат 97%</p>
        <p className="popup__text">Отличный результат! Вы хорошо знаете Смоленскую область
        </p>
        <button className="popup__btn popup__btn--restart">Попробовать ещё раз
        </button>
      </div>
    </section>
  ); 
};

export default FinalMessage;
