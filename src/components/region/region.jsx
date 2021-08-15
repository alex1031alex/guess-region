import React from 'react';
import './region.css';

import {GameStatus} from '../../const';

const Region = (props) => {
  const {children, id, gameStatus, onRegionClick, getMyStatus} = props;
  const status = getMyStatus(id);
  const onClick = () => {
    if (gameStatus !== GameStatus.STARTED) {
      return;
    }

    onRegionClick(id);
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
