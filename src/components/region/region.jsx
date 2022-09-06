import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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

Region.propTypes = {
  children: PropTypes.element.isRequired,
  id: PropTypes.string,
  onRegionClick: PropTypes.func,
  getMyStatus: PropTypes.func,
};

export default Region;
