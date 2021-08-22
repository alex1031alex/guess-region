import React from 'react';
import './region.css';

const Region = (props) => {
  const {children, id, onRegionClick, getMyStatus} = props;
  const status = getMyStatus(id);
  const onClick = (evt) => {
    onRegionClick(id, evt.pageX, evt.pageY);
  };

  return <g 
    className={`region region--${status}`} 
    id={id}
    onClick={onClick}
  >
    {children}
  </g>;
};

export default Region;
