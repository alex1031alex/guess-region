import React from 'react';
import { useSelector } from 'react-redux';
import { selectPlayingRegionId } from '../../store/selectors';

import './question.css';

import {createIdToNameMap} from '../../data/region-data';

const idToName = createIdToNameMap();

const Question = () => {
  const playingRegionId = useSelector(selectPlayingRegionId);

  return (
    <p className="question">
      {playingRegionId && `Где находится ${idToName[playingRegionId]} район?`}
    </p>
  );
};

export default Question;
