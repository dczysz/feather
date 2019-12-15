// https://xstate.js.org/docs/tutorials/reddit.html#async-flow
// https://codesandbox.io/embed/33wr94qv1

import { Machine, assign } from 'xstate';
import axios from 'axios';

const fetchWeather = context => {
  const { query } = context;

  return axios.get('/api/weather/' + query).then(res => res.data);
};

const fetchMachine = Machine({
  id: 'fetch',
  initial: 'idle',
  context: {
    query: '',
    weather: null,
  },
  states: {
    idle: {
      on: {
        CHANGE: {
          actions: assign({
            query: (_ctx, e) => e.value,
          }),
        },
        FETCH: 'loading',
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
        onError: 'idle',
      },
    },
  },
});

export default fetchMachine;
