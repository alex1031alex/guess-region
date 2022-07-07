import './tooltip.css';
import React from 'react';
import PropTypes from 'prop-types';

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

Tooltip.propTypes = {
  message: PropTypes.string,
  coordX: PropTypes.string,
  coordY: PropTypes.string,
};

export default Tooltip;
