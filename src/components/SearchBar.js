import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as SearchSvg } from '../assets/search.svg';
import { ReactComponent as MenuIcon } from '../assets/menu.svg';
import { ReactComponent as LoadingSvg } from '../assets/loader.svg';

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const errorAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-30%);
  }
  40% {
    transform: translateX(25%);
  }
  60% {
    transform: translateX(-20%);
  }
  80% {
    transform: translateX(10%);
  }
  100% {
    transform: translateX(0);
  }
`;

const StyledSearchBar = styled.form`
  margin: 1rem 1rem 0 1rem;

  .input-container {
    background-color: ${p => p.theme.white};
    border-radius: ${p => p.theme.br};
    display: flex;
    align-items: center;
    position: relative;
    height: 3rem;

    input {
      background-color: transparent;
      border: none;
      font-size: 1rem;
      line-height: 1rem;
      margin: 0;
      min-width: 0;
      padding: 1rem;
      text-align: center;
      width: 100%;
    }

    button {
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      margin: 0 0.5rem;
      background-color: transparent;
      height: 3rem;
      width: auto;
      font-size: 1rem;
      line-height: 1rem;
      font-weight: bold;

      svg {
        height: 1.5em;
        stroke: ${p => p.theme.grey};

        &.error {
          animation: ${errorAnimation} 300ms;
          stroke: ${p => p.theme.error};
        }

        &.spin {
          animation: ${spinAnimation} 1000ms infinite linear;
        }
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
  const [query, setQuery] = useState(current.context.query);
  const [error, setError] = useState(false);
  const inputRef = useRef();

  const fetchWeatherData = useCallback(
    query => {
      if (query) {
        setError(false);
        send('CHANGE', { value: query });
        send('FETCH');
      }
    },
    [send]
  );

  useEffect(() => {
    const paramQuery = getParameterValue('q');

    if (paramQuery) {
      window.history.pushState({ data: null }, null, '');
      setQuery(paramQuery);

      setTimeout(() => fetchWeatherData(paramQuery), 0);
    }
  }, [fetchWeatherData]);

  useEffect(() => {
    setError(!current.context.weather && current.context.query !== '');
  }, [current.context, current.context.query]);

  const changeHandler = e => {
    setQuery(e.target.value);
    setError(false);
  };

  const submitHandler = e => {
    e.preventDefault();
    fetchWeatherData(query);
  };

  return (
    <StyledSearchBar onSubmit={submitHandler}>
      <div className="input-container">
        <button type="button" onClick={showMenu} aria-label="Show Menu">
          <MenuIcon />
        </button>
        <input
          type="text"
          value={query}
          onChange={changeHandler}
          placeholder="City and State"
          ref={inputRef}
          aria-label="City and State"
        />
        <button type="submit" aria-label="Go">
          {current.matches('loading') ? (
            <LoadingSvg className="spin" />
          ) : (
            <SearchSvg className={error ? 'error' : ''} />
          )}
        </button>
      </div>
    </StyledSearchBar>
  );
};

export default SearchBar;
