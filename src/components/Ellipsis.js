import React from 'react';
import styled from 'styled-components';

const StyledEllipsis = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    --size: 0.25em;
    width: var(--size);
    height: var(--size);
    background-color: ${p => p.theme.grey};
    border-radius: 50%;
  }
`;

const Ellipsis = () => {
  return (
    <StyledEllipsis>
      <div></div>
      <div></div>
      <div></div>
    </StyledEllipsis>
  );
};

export default Ellipsis;
