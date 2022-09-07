import React from 'react';
import PropTypes from 'prop-types';
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

Question.propTypes = {
  playingRegionId: PropTypes.string,
};

export default Question;
