import React from 'react';
import PropTypes from 'prop-types';
import './region.css';

const Region = (props) => {
  const {children, id, onRegionClick, getMyStatus} = props;
  const status = getMyStatus(id);
  const onClick = (evt) => {
    onRegionClick(id, evt.pageX, evt.pageY);
  };

  return (
    <g 
      className={`region region--${status} ${status===`failed` ? "blinking" : ""}`} 
      id={id}
      onClick={onClick}
    >
      {children}
    </g>
  ); 
};

Region.propTypes = {
  children: PropTypes.element.isRequired,
  id: PropTypes.string,
  onRegionClick: PropTypes.func,
  getMyStatus: PropTypes.func,
};

export default Region;
