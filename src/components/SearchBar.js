import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';
import Spinner from './Spinner';
import Ellipsis from './Ellipsis';

const StyledSearchBar = styled.form`
  margin: 1rem 1rem 0 1rem;

  .input-container {
    background-color: ${p => p.theme.white};
    border-radius: ${p => p.theme.br};
    display: flex;
    align-items: center;
    position: relative;

    input {
      background-color: transparent;
      border: none;
      font-size: 1rem;
      margin: 0;
      min-width: 0;
      padding: 1rem;
      text-align: center;
      width: 100%;
    }

    button {
      padding: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      margin: 0 1rem;
      background-color: transparent;
      height: 3rem;
      width: 3rem;
      font-size: 1rem;
      line-height: 1rem;
      font-weight: bold;
      fill: ${p => p.theme.error.grey};

      &.error {
        fill: ${p => p.theme.error};
      }

      svg {
        width: 100%;
        height: 100%;
        fill: inherit;
      }

      &:first-of-type {
        margin-right: 0;
      }

      &:last-of-type {
        margin-left: 0;
      }
    }
  }
`;

const getParameterValue = (name, url = window.location.search) => {
  const params = new URLSearchParams(url);
  return params.get(name);
};

const SearchBar = ({ current, send, showMenu }) => {
  console.log('[SearchBar] rendering');
  const [query, setQuery] = useState(current.context.query);

  const fetchWeatherData = useCallback(
    query => {
      if (query) {
        send('CHANGE', { value: query });
        send('FETCH');
      }
    },
    [send]
  );

  useEffect(() => {
    const paramQuery = getParameterValue('q');

    if (paramQuery) {
      console.log('Fetching ', paramQuery);
      window.history.pushState({ data: null }, null, '');
      setQuery(paramQuery);

      setTimeout(() => fetchWeatherData(paramQuery), 0);
    }
  }, [fetchWeatherData]);

  const changeHandler = e => {
    setQuery(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    fetchWeatherData(query);
  };

  const error = !current.context.weather && current.context.query !== '';

  return (
    <StyledSearchBar onSubmit={submitHandler}>
      <div className="input-container">
        <button type="button" onClick={showMenu}>
          <Ellipsis />
        </button>
        <input
          type="text"
          value={query}
          onChange={changeHandler}
          placeholder="City and State"
        />
        <button type="submit" className={error ? 'error' : ''}>
          {current.matches('loading') ? <Spinner /> : <SearchIcon />}
        </button>
      </div>
    </StyledSearchBar>
  );
};

export default SearchBar;
