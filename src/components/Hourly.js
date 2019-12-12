import React from 'react';
import styled from 'styled-components';

import Graph from './Graph.js';

const StyledHourly = styled.div`
  margin-top: auto;
  height: 50vh;
  overflow-x: auto;
`;

const Hourly = ({ hourlyArray, min, max }) => {
  console.log('[Hourly] Rendering');
  return (
    <StyledHourly>
      <Graph hourly={hourlyArray} minTemp={min} maxTemp={max} />
    </StyledHourly>
  );
};

export default Hourly;
