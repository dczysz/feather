import React from 'react';
import styled from 'styled-components';

import icons from '../assets/icons';
import { getTime } from '../util';

const StyledDay = styled.div`
  position: relative;
  padding: 1rem;

  p {
    margin: 0;
  }

  .temp {
    font-size: 4rem;

    sup {
      font-size: 0.5em;
    }
  }

  .image {
    position: absolute;
    top: 1rem;
    right: 1rem;

    svg {
      --size: 40vw;
      height: var(--size);
      width: var(--size);
      max-width: 10rem;
      max-height: 10rem;
      fill: pink;
      margin-bottom: -2rem;
    }

    p {
      text-align: center;
    }
  }
`;

const SingleDay = ({ weather, dayIndex }) => {
  const { currently, daily } = weather;
  const isToday = dayIndex === 0;
  const selectedDay = isToday ? currently : daily.data[1];
  const Icon = icons[selectedDay.icon];

  const dateString = getTime(
    currently.time * 1000,
    weather.timezone,
    dayIndex === 0
  );

  return (
    <StyledDay dayIndex={dayIndex}>
      <p className="date">{dateString}</p>
      <p className="high-low">
        Day {Math.round(daily.data[isToday ? 0 : 1].temperatureMax)}&deg; ⬆
        &bull; Night {Math.round(daily.data[isToday ? 0 : 1].temperatureMin)}
        &deg; ⬇{' '}
      </p>
      {isToday && (
        <p className="temp">
          {Math.round(currently.temperature)}&deg;<sup>F</sup>
        </p>
      )}
      <p>
        {isToday
          ? `Feels like ${Math.round(currently.apparentTemperature)}`
          : selectedDay.summary}
      </p>

      <div className="image">
        {selectedDay.precipProbability >= 0.1 &&
        ['rain', 'snow', 'sleet', 'hail', 'thunderstorm', 'tornado'].includes(
          selectedDay.icon
        ) ? (
          <p>{selectedDay.precipProbability * 100}%</p>
        ) : null}
        <Icon />
        <p>{isToday && selectedDay.summary}</p>
      </div>
    </StyledDay>
  );
};

export default SingleDay;
