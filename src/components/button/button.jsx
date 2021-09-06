import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = (props) => {
  const {children, onClick} = props;

  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  onClick: PropTypes.func,
};

export default Button;
