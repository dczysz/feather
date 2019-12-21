import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useMachine } from '@xstate/react';

import weatherMachine from './weatherMachine';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';
import Nav from './components/Nav';
import Menu from './components/Menu';

const StyledApp = styled.div`
  background-image: linear-gradient(
    170deg,
    hsl(${p => p.theme.bgHsl[p.bg].from}),
    hsl(${p => p.theme.bgHsl[p.bg].to})
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
  black: '#333',
  br: '0.3em',
  error: '#b04',
  grey: '#666',
  lightBg: '#fff4',
  lightGrey: '#aaa',
  shadow: '#1116',
  white: '#ebf6fa',
  bgHsl: {
    day: {
      from: '195, 60%, 60%',
      to: '195, 60%, 30%',
    },
    night: {
      from: '240, 60%, 65%',
      to: '240, 60%, 35%',
    },
  },
  maxWidth: '768px',
};

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

  const toggleMenu = e => {
    send('TOGGLE_MENU');
  };

  return (
    <ThemeProvider theme={theme}>
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
        />
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
