import React from 'react';
import './footer.css';

const Footer = () => {
  return <footer className="footer">
    <p className="footer__text">Created by Alex Alexandrov</p>
    <p>2019 год</p>
    <p className="footer__text">По мотивам <a className="footer__link" href="https://motovskikh.ru/tests/">проекта братьев Мотовских</a></p>
  </footer>
};

export default Footer;
