import React from 'react';

import {
  Label as StyledToggleLabel,
  Input as StyledToggleInput,
} from './styles/ToggleButton';

const ToggleButton = ({ value, checked, change }) => {
  const changeHandler = ({ target: { value } }) => {
    change(value);
  };

  return (
    <>
      <StyledToggleInput
        type="radio"
        id={value}
        name="unit"
        value={value}
        checked={checked}
        onChange={changeHandler}
        className="btn"
      />
      <StyledToggleLabel htmlFor={value} className="btn">
        &deg;{value}
      </StyledToggleLabel>
    </>
  );
};

export default ToggleButton;
