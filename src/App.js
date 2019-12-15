import React, { useState, useEffect, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useMachine } from '@xstate/react';

import fetchMachine from './fetchMachine';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';
import Nav from './components/Nav';
import { calculateRatio } from './util';
import Menu from './components/Menu';

const StyledApp = styled.div`
  background-image: linear-gradient(
    170deg,
    hsl(${p => p.bgHue}, 60%, 60%),
    hsl(${p => p.bgHue}, 60%, 30%)
  );
  color: ${p => p.theme.black};
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  position: relative;
  transition: background-image 0.2s;
  overflow: hidden;

  .top-bar {
    background-color: ${p => p.theme.lightBg};
  }
`;

const theme = {
  lightBg: '#fff4',
  black: '#111d',
  white: 'hsl(195, 60%, 95%)',
  grey: '#111a',
  lightGrey: '#1114',
  shadow: '#1116',
  blue: 'hsl(195, 60%, 60%)',
  br: '0.3em',
  error: '#b04',
};

const App = () => {
  console.log('[App] rendering');
  const BG_HUE = { day: 195, night: 240 };

  const [dayIndex, setDayIndex] = useState(
    process.env.NODE_ENV === 'production' ? 0 : 1
  );
  const [bgHue, setBgHue] = useState(BG_HUE.day);
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, send] = useMachine(fetchMachine);

  const { weather } = current.context;

  const memoizedBgHueHandler = useCallback(
    ratio => {
      const hue = ratio > 0 && ratio < 1 ? BG_HUE.day : BG_HUE.night;
      setBgHue(hue);
    },
    [BG_HUE.day, BG_HUE.night]
  );

  useEffect(() => {
    if (!weather) return;

    memoizedBgHueHandler(
      dayIndex === 0
        ? calculateRatio(
            weather.currently.time,
            weather.daily.data[0].sunriseTime,
            weather.daily.data[0].sunsetTime
          )
        : 0.5
    );
  }, [weather, memoizedBgHueHandler, dayIndex]);

  const dayIndexChangedHandler = e => {
    const { value: index } = e.target;
    setDayIndex(+index);
  };

  const toggleMenu = e => {
    e && e.preventDefault();
    setMenuOpen(!menuOpen);
    return false;
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledApp bgHue={bgHue}>
        <div className="top-bar">
          <SearchBar current={current} send={send} showMenu={toggleMenu} />
          <Nav dayIndex={dayIndex} change={dayIndexChangedHandler} />
        </div>
        {weather && <Weather weather={weather} dayIndex={dayIndex} />}
        <Menu
          isOpen={menuOpen}
          close={toggleMenu}
          query={current.context.query}
        />
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
