import React from 'react';
import Region from '../region/region';
import './map.css';

import {regionData} from '../../data/region-data.js';

const {outlines} = regionData;

const Map = (props) => {
  const {onRegionClick, getRegionStatus} = props;

  return <section className="map">
    		    <svg width="700" height="700" viewBox="0 0 200 200" id="svg6055">
              {outlines.map((outline) => {
                return <Region 
                  key={outline.id}
                  id={outline.id}
                  onRegionClick={onRegionClick}
                  getMyStatus={getRegionStatus}
                >
                  <path d={outline.d}></path>
                </Region>
              })}
            </svg>
  </section>;
};

export default Map;
