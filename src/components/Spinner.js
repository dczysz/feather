import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);

  }
`;

const StyledSpinner = styled.div`
  --width: 0.2em;
  animation: ${spinAnimation} 300ms linear infinite;
  width: 100%;
  height: 100%;
  border: var(--width) solid transparent;
  border-top: var(--width) solid ${p => p.theme.grey};
  border-right: var(--width) solid ${p => p.theme.grey};
  border-radius: 50%;
`;

const Spinner = () => {
  return <StyledSpinner />;
};

export default Spinner;
