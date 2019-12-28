import React, { useState } from 'react';

import StyledSearchBar from './styles/SearchBar';
import { ReactComponent as SearchSvg } from '../assets/icons/search.svg';
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import { ReactComponent as LoadingSvg } from '../assets/icons/loader.svg';
import { ReactComponent as RefreshSvg } from '../assets/icons/refresh.svg';

const SearchBar = ({ current, send, showMenu }) => {
  const [query, setQuery] = useState(current.context.query);

  const changeHandler = ({ target: { value } }) => {
    setQuery(value);
    if (current.matches('error')) send('CLEAR_ERROR');
  };

  const submitHandler = (e = null) => {
    e && e.preventDefault();
    query !== '' && send('FETCH', { value: query });
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
          aria-label="City and State"
        />
        <button
          type="submit"
          aria-label="Go"
          disabled={query === '' || current.matches('loading')}
        >
          {current.matches('loading') ? (
            <LoadingSvg className="spin" />
          ) : query !== '' &&
            query === current.context.query &&
            !current.matches('error') ? (
            <RefreshSvg />
          ) : (
            <SearchSvg className={current.matches('error') ? 'error' : ''} />
          )}
        </button>
      </div>
    </StyledSearchBar>
  );
};

export default SearchBar;
