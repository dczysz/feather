import React from 'react';

import StyledNav from './styles/Nav';

const WeatherNav = ({ navIndex, change }) => {
  const buttons = [
    { label: 'Today', id: 'today' },
    { label: 'Tomorrow', id: 'tomorrow' },
    { label: '10 Days', id: 'daily' },
  ];

  return (
    <StyledNav navIndex={navIndex}>
      {buttons.map((btn, i) => (
        <label key={btn.id} htmlFor={btn.id}>
          {btn.label}
          <input
            type="radio"
            id={btn.id}
            name={btn.id}
            value={i}
            checked={navIndex === i}
            onChange={change}
          />
        </label>
      ))}
    </StyledNav>
  );
};

export default WeatherNav;
