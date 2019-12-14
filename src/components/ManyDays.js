import React from 'react';
import styled, { keyframes } from 'styled-components';
import CollapsingDay from './CollapsingDay';

const opacityAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledManyDays = styled.div`
  animation: ${opacityAnimation} 1000ms;
  background-color: ${p => p.theme.white};
  height: 100%;
  overflow-y: auto;
`;

const ManyDays = ({ daily, timeZone }) => {
  console.log('[ManyDays] props.daily: ', daily, timeZone);

  return (
    <StyledManyDays>
      {daily.data.map((d, i) => (
        <CollapsingDay key={d.time} day={d} timeZone={timeZone} />
      ))}
    </StyledManyDays>
  );
};

export default ManyDays;
