import React from 'react';
import styled from 'styled-components';

import Graph from './Graph.js';

const StyledHourly = styled.div`
  height: 100%;
  margin-top: auto;
  max-height: 24rem;
  overflow-x: auto;
`;

const Hourly = ({ hourlyArray, min, max, timeZone }) => (
  <StyledHourly>
    <Graph
      hourly={hourlyArray}
      minTemp={min}
      maxTemp={max}
      timeZone={timeZone}
    />
  </StyledHourly>
);

export default Hourly;
