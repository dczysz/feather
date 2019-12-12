import React, { useState, useEffect, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useMachine } from '@xstate/react';

import fetchMachine from './fetchMachine';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';
import Nav from './components/Nav';
import { calculateRatio } from './util';

const StyledApp = styled.div`
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: hsl(${p => p.bgHue}, 60%, 60%);
  transition: background-color 0.2s;

  .top-bar {
    background-color: ${p => p.theme.lightBg};
  }
`;

const theme = {
  lightBg: '#fff4',
  white: '#fffd',
};

const App = () => {
  const BG_HUE = { day: 195, night: 240 };

  const [dayIndex, setDayIndex] = useState(0);
  const [bgHue, setBgHue] = useState(BG_HUE.day);
  const [current, send] = useMachine(fetchMachine);

  const { weather } = current.context;

  const memoizedBgHueHandler = useCallback(
    ratio => {
      const hue = ratio > 0 && ratio < 1 ? BG_HUE.day : BG_HUE.night;
      console.log(`[App] bgHueHandler. Changing hue to ${hue}...`);
      setBgHue(hue);
    },
    [BG_HUE.day, BG_HUE.night]
  );

  useEffect(() => {
    console.log('[App useEffect()] current.context.weather: ', weather);
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
    console.log('[App dayIndexChangedHandler()]', weather, index);
    setDayIndex(+index);
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledApp bgHue={bgHue}>
        <div className="top-bar">
          <SearchBar current={current} send={send} />
          <Nav dayIndex={dayIndex} change={dayIndexChangedHandler} />
        </div>
        {weather && <Weather weather={weather} dayIndex={dayIndex} />}
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
