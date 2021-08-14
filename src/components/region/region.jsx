import React from 'react';
import './region.css';
import {useState} from 'react';

import {GameStatus, RegionStatus} from '../../const';


const Region = (props) => {
  const {children, id, gameStatus} = props;
  console.log(gameStatus);
  const [regionStatus, setRegionStatus] = useState(RegionStatus.INITIAL);
  const onClick = () => {
    if (gameStatus !== GameStatus.STARTED) {
      return;
    }

    setRegionStatus(RegionStatus.GUESSED_ON_SECOND_TRY);
  };

  return <g 
    className={`region region--${regionStatus}`} 
    id={id}
    onClick={onClick}
  >
    {children}
  </g>;
};

export default Region;
