import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSearchBar = styled.form`
  margin: 1rem 1rem 0 1rem;

  .input-container {
    position: relative;
  }

  input {
    width: 100%;
    margin: 0;
    padding: 1rem;
    font-size: 1rem;
    text-align: center;
    border: none;
    border-radius: 1000px;
    background-color: ${p => p.theme.white};
  }

  button {
    position: absolute;
    top: 50%;
    right: 0.375rem;
    transform: translateY(-50%);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid;
    cursor: pointer;
  }
`;

const SearchBar = ({ current, send }) => {
  const [query, setQuery] = useState(current.context.query);

  const changeHandler = e => {
    setQuery(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    send('CHANGE', { value: query });
    send('FETCH');
  };

  return (
    <StyledSearchBar onSubmit={submitHandler}>
      <div className="input-container">
        <input
          type="text"
          value={query}
          onChange={changeHandler}
          placeholder="Enter City and State"
        />
        <button type="submit">Go</button>
      </div>
    </StyledSearchBar>
  );
};

export default SearchBar;
