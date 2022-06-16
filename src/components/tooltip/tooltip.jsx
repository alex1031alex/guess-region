import './tooltip.css';
import React from 'react';
import PropTypes from 'prop-types';
import './tooltip.css';

const Tooltip = (props) => {
  const {message, coordX, coordY} = props;

  return (
    <div className="tooltip" style={{position: "absolute", left: coordX, top: coordY, backgroundColor: "#fff"}}>
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
