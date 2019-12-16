import React from 'react';
import styled from 'styled-components';

import icons from '../assets/icons';
import { getTime } from '../util';

const StyledDay = styled.div`
  --larger-font: 1.2rem;
  --text-shadow: 0 1px 1px;
  color: ${p => p.theme.white};
  padding: 0 1rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  text-shadow: var(--text-shadow) ${p => p.theme.shadow};

  p {
    margin: 1rem 0;
    line-height: 1em;

    &.black {
      color: ${p => p.theme.black};
    }
  }

  .left {
    p {
      &.date {
        font-size: var(--larger-font);
      }
      &.temp {
        font-size: 5rem;
        line-height: normal;
        margin: -1rem 0;

        sup {
          font-size: 0.5em;
          font-weight: bold;
        }
      }

      &.summary {
        margin-top: 1rem;
        font-size: var(--larger-font);
      }
    }
  }

  .right {
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    svg {
      --size: 10rem;
      width: var(--size);
      height: var(--size);
      fill: ${p => p.theme.white};
    }

    p {
      text-align: center;
      --margin: -2rem;

      &.precip-probability {
        margin-bottom: var(--margin);
      }

      &.summary {
        margin-top: var(--margin);
      }
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
      <div className="left">
        <p className="date black">{dateString}</p>
        <p className="high-low">
          Day {Math.round(daily.data[isToday ? 0 : 1].temperatureMax)}&deg;
          &bull; Night {Math.round(daily.data[isToday ? 0 : 1].temperatureMin)}
          &deg;
        </p>
        {isToday && (
          <p className="temp">
            {Math.round(currently.temperature)}&deg;<sup>F</sup>
          </p>
        )}

        {isToday ? (
          <p className="feels-like">
            Feels like {Math.round(currently.apparentTemperature)}&deg;
          </p>
        ) : (
          <p className="summary">{selectedDay.summary}</p>
        )}
      </div>

      <div className="right">
        {selectedDay.precipProbability >= 0.1 &&
        ['rain', 'snow', 'sleet', 'hail', 'thunderstorm', 'tornado'].includes(
          selectedDay.icon
        ) ? (
          <p className="precip-probability">
            {Math.round(selectedDay.precipProbability * 100)}%
          </p>
        ) : null}
        <Icon />
        {isToday && <p className="summary">{selectedDay.summary}</p>}
      </div>
    </StyledDay>
  );
};

export default SingleDay;
