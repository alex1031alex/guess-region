import React from 'react';
import PropTypes from 'prop-types';

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

Question.propTypes = {
  playingRegionId: PropTypes.string,
};

export default Question;
