import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${p => p.theme.maxWidth};
  position: relative;
  overflow-x: hidden;

  --left-br: ${p => (p.navIndex === 0 ? '0px' : '1000px')};
  --right-br: ${p => (p.navIndex === 2 ? '0px' : '1000px')};

  ::after {
    background-color: ${p => p.theme.white};
    border-radius: var(--left-br) var(--right-br) var(--right-br) var(--left-br);
    bottom: 1px;
    content: '';
    height: 4px;
    left: calc(33.333% * ${p => p.navIndex});
    pointer-events: none;
    position: absolute;
    transition: left 0.2s ease-in-out;
    width: 33.333%;

    @media screen and (min-width: ${p => p.theme.maxWidth}) {
      border-radius: 1000px;
    }
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

const WeatherNav = ({ navIndex, change }) => {
  const buttons = [
    { label: 'Today', id: 'today' },
    { label: 'Tomorrow', id: 'tomorrow' },
    { label: '10 Days', id: 'daily' },
  ];

  return (
    <StyledNav navIndex={navIndex}>
      {buttons.map((btn, i) => (
        <StyledNavButton key={btn.id} htmlFor={btn.id}>
          {btn.label}
          <input
            type="radio"
            id={btn.id}
            name={btn.id}
            value={i}
            checked={navIndex === i}
            onChange={change}
          />
        </StyledNavButton>
      ))}
    </StyledNav>
  );
};

export default WeatherNav;
