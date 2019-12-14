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
    content: '';
    width: 33.333%;
    height: 4px;
    background-color: ${p => p.theme.white};
    position: absolute;
    bottom: 1px;
    left: calc(33.333% * ${p => p.dayIndex});
    transition: left 0.1s ease-in-out;
    border-radius: var(--left-br) var(--right-br) var(--right-br) var(--left-br);
  }
`;

const StyledNavButton = styled.label`
  width: 100%;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  color: ${p => p.theme.white};

  input {
    display: none;
  }
`;

const WeatherNav = ({ dayIndex, change }) => {
  return (
    <StyledNav dayIndex={dayIndex}>
      <StyledNavButton htmlFor="today">
        Today
        <input
          type="radio"
          id="today"
          name="today"
          value="0"
          checked={dayIndex === 0}
          onChange={change}
        />
      </StyledNavButton>
      <StyledNavButton htmlFor="tomorrow">
        Tomorrow
        <input
          type="radio"
          id="tomorrow"
          name="tomorrow"
          value="1"
          checked={dayIndex === 1}
          onChange={change}
        />
      </StyledNavButton>
      <StyledNavButton htmlFor="daily">
        10 Days
        <input
          type="radio"
          id="daily"
          name="daily"
          value="2"
          checked={dayIndex === 2}
          onChange={change}
        />
      </StyledNavButton>
    </StyledNav>
  );
};

export default WeatherNav;
