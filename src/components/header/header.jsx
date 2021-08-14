import React from 'react';
import './header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">
          <img src="img/sign.png" alt="Герб Смоленской области" width="42" height="51"/>
        </div>
        <h1 className="header__title">Как хорошо Вы знаете Смоленскую область?
        </h1>
      </div>
    </header>
  );
};

export default Header;
