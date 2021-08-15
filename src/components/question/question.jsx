import React from 'react';
import './question.css';

import {createIdToNameMap} from '../../data/region-data';

const idToName = createIdToNameMap();

const Question = (props) => {
  const {playingRegionId} = props;

  if (!playingRegionId) {
    return ``;
  }

  return (
    <p className="info__item info__item--question">
      Где находится {idToName[playingRegionId]} район?
    </p>
  );
};

export default Question;
