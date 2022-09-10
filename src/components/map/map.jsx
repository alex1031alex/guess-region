import React from 'react';
import Region from '../region/region';
import './map.css';
import {regionData} from '../../data/region-data.js';

const {outlines} = regionData;

const Map = (props) => {
  const {handleRegionClick} = props;

  return (
    <section className="map">
      <svg viewBox="0 0 200 200" id="svg6055">
        {outlines.map((outline) => {
          return <Region 
            key={outline.id}
            id={outline.id}
            onRegionClick={handleRegionClick}
          >
            <path d={outline.d}></path>
          </Region>
        })}
      </svg>
    </section>
  ); 
};

export default Map;
