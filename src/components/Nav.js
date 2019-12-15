import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow-x: hidden;

  --left-br: ${p => (p.dayIndex === 0 ? '0px' : '1000px')};
  --right-br: ${p => (p.dayIndex === 2 ? '0px' : '1000px')};
  ::after {
    background-color: ${p => p.theme.white};
    border-radius: var(--left-br) var(--right-br) var(--right-br) var(--left-br);
    bottom: 1px;
    content: '';
    height: 4px;
    left: calc(33.333% * ${p => p.dayIndex});
    pointer-events: none;
    position: absolute;
    transition: left 0.1s ease-in-out;
    width: 33.333%;
  }
`;

const StyledNavButton = styled.label`
  color: ${p => p.theme.white};
  cursor: pointer;
  display: block;
  font-size: 0.9rem;
  padding: 1rem;
  text-align: center;
  text-transform: uppercase;
  width: 100%;

  input {
    display: none;
  }
`;

const WeatherNav = ({ dayIndex, change }) => {
  const buttons = [
    { label: 'Today', id: 'today' },
    { label: 'Tomorrow', id: 'tomorrow' },
    { label: '10 Days', id: 'daily' },
  ];

  return (
    <StyledNav dayIndex={dayIndex}>
      {buttons.map((btn, i) => (
        <StyledNavButton key={btn.id} htmlFor={btn.id}>
          {btn.label}
          <input
            type="radio"
            id={btn.id}
            name={btn.id}
            value={i}
            checked={dayIndex === i}
            onChange={change}
          />
        </StyledNavButton>
      ))}
    </StyledNav>
  );
};

export default WeatherNav;
