import React from 'react';
import './button.css';

const Button = (props) => {
  const {children, onClick} = props;

  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
