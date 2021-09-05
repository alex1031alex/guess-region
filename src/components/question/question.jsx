import React from 'react';
import './question.css';

import {createIdToNameMap} from '../../data/region-data';

const idToName = createIdToNameMap();

const Question = (props) => {
  const {playingRegionId} = props;

  return (
    <p className="question">
      Где находится {idToName[playingRegionId]} район?
    </p>
  );
};

export default Question;
