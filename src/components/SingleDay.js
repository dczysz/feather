import React from 'react';

import StyledDay from './styles/SingleDay';
import icons from '../assets/icons/weather';
import { getDateString } from '../util';

const SingleDay = ({ weather, navIndex }) => {
  const { currently, daily } = weather;
  const isToday = navIndex === 0;
  const selectedDay = isToday ? currently : daily.data[1];
  const Icon = icons[selectedDay.icon];

  const time = isToday ? currently.time * 1000 : daily.data[1].time * 1000;

  const dateString = getDateString(time, weather.timezone, isToday);

  return (
    <StyledDay navIndex={navIndex}>
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
