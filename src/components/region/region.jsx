import React from 'react';
import './region.css';

const Region = (props) => {
  const {children, id, index} = props;
  return <g className="region region--initial" id={id} index={index}>
    {children}
  </g>;
};

export default Region;
