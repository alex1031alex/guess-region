import React from 'react';
import { useSelector } from 'react-redux';
import './region.css';
import { RegionStatus } from '../../const';

const Region = (props) => {
  const {children, id, onRegionClick} = props;
  const status = useSelector((state) => state.entities[id].status);

  const onClick = (evt) => {
    if (status !== RegionStatus.INITIAL && status !== RegionStatus.FAILED) {
      return;
    }
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

export default Region;
