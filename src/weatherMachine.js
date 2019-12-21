// https://xstate.js.org/docs/tutorials/reddit.html#async-flow
// https://codesandbox.io/embed/33wr94qv1

import { Machine, assign } from 'xstate';
import axios from 'axios';

const fetchWeather = context => {
  const { query } = context;

  return axios.get('/api/weather/' + query).then(res => {
    return res.data ? res.data : Promise.reject('Could not locate ' + query);
  });
};
const weatherMachine = Machine({
  id: 'weatherMachine',
  initial: 'idle',
  context: {
    query: '',
    weather: null,
    navIndex: 0,
    menuOpen: false,
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
