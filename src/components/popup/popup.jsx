import React from 'react';
import './popup.css';

const Popup = (props) => {
  const {children} = props;

  return (
    <section className="popup">
      <div className="popup__inner">
        {children}
      </div>
    </section>
  ); 
};

export default Popup;
