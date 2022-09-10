import './tooltip.css';
import React from 'react';

const Tooltip = (props) => {
  const {message, coordX, coordY} = props;

  return (
    <div className="tooltip" style={{left: coordX, top: coordY}}>
      <p className="tooltip__text">
        {message}
      </p>
    </div>
  );
};

export default Tooltip;
