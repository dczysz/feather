import { Machine, assign } from 'xstate';
import axios from 'axios';

import { getParameterValue } from './util';

const fetchWeather = async ({ query }) =>
  await axios
    .get('/api/weather/' + query)
    .then(res => res.data || Promise.reject());

const weatherMachine = Machine({
  id: 'weatherMachine',
  initial: 'idle',
  context: {
    query: getParameterValue('q') || '',
    weather: null,
    navIndex: 0,
    menuOpen: false,
  },
  on: {
    CHANGE_NAV_INDEX: {
      actions: assign({
        navIndex: (_ctx, e) => e.value,
      }),
    },
    TOGGLE_MENU: {
      actions: assign({
        menuOpen: (ctx, _e) => !ctx.menuOpen,
      }),
    },
  },
  states: {
    idle: {
      on: {
        FETCH: {
          target: 'loading',
          actions: assign({
            query: (_ctx, e) => e.value,
          }),
        },
      },
    },
    loading: {
      invoke: {
        id: 'fetch-weather',
        src: fetchWeather,
        onDone: {
          target: 'idle',
          actions: assign({
            weather: (_ctx, e) => e.data,
          }),
        },
        onError: 'error',
      },
    },
    error: {
      on: {
        CLEAR_ERROR: {
          target: 'idle',
        },
      },
    },
  },
});

export default weatherMachine;
