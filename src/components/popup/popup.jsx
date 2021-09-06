import React from 'react';
import PropTypes from 'prop-types';
import './popup.css';

const Popup = (props) => {
  const {children} = props;

  return <section className="popup">
    <div className="popup__inner">
      {children}
    </div>
  </section>
};

Popup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
  ]),
};

export default Popup;
