import React, { useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { useMachine } from '@xstate/react';

import StyledApp from './components/styles/App';
import theme from './components/styles/theme';
import weatherMachine from './weatherMachine';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';
import Nav from './components/Nav';
import Menu from './components/Menu';
import GlobalStyle from './components/styles/GlobalStyle';
import { unitTypes } from './types';

const App = () => {
  const [current, send] = useMachine(weatherMachine);

  const { weather, navIndex, menuOpen } = current.context;
  const bg =
    !weather || navIndex !== 0
      ? 'day'
      : weather.currently.time > weather.daily.data[0].sunriseTime &&
        weather.currently.time < weather.daily.data[0].sunsetTime
      ? 'day'
      : 'night';

  const dayIndexChangedHandler = e => {
    const { value: index } = e.target;
    send('CHANGE_NAV_INDEX', { value: +index });
  };

  const toggleMenu = () => {
    send('TOGGLE_MENU');
  };

  const setUnit = unit => {
    send('CHANGE_UNIT', { unit: unitTypes[unit] });
  };

  // Send FETCH event if machine loads with query param search query
  // TODO: Find a better way to do this in the machine itself
  const fetchWeatherOnLoad = useCallback(() => {
    if (current.context.query !== '')
      send('FETCH', { value: current.context.query });
  }, [current.context.query, send]);

  useEffect(() => {
    fetchWeatherOnLoad();
  }, [fetchWeatherOnLoad]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle accentHsl={theme.bgHsl[bg || 'day'].from} />
      <StyledApp bg={bg || 'day'}>
        <div className="top-bar">
          <SearchBar current={current} send={send} showMenu={toggleMenu} />
          <Nav navIndex={navIndex} change={dayIndexChangedHandler} />
        </div>
        {weather && <Weather current={current} />}
        <Menu
          isOpen={menuOpen}
          close={toggleMenu}
          query={current.context.query}
          unit={current.context.unit}
          setUnit={setUnit}
        />
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
