import React from 'react';

import StyledHourly from './styles/Hourly';
import Graph from './Graph.js';

const Hourly = ({ hourlyArray, min, max, timeZone, current }) => (
  <StyledHourly>
    <Graph
      hourly={hourlyArray}
      minTemp={min}
      maxTemp={max}
      timeZone={timeZone}
      current={current}
    />
  </StyledHourly>
);

export default Hourly;
