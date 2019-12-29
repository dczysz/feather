import React from 'react';

import StyledDay from './styles/SingleDay';
import icons from '../assets/icons/weather';
import { getDateString, fToC } from '../util';

const SingleDay = ({ weather, navIndex, unit }) => {
  const { currently, daily } = weather;
  const isToday = navIndex === 0;
  const isCelcius = unit.temp === 'C';
  const selectedDay = isToday ? currently : daily.data[1];

  const Icon = icons[selectedDay.icon];
  const time = isToday ? currently.time * 1000 : daily.data[1].time * 1000;
  const dateString = getDateString(time, weather.timezone, isToday);
  const high = Math.round(
    isCelcius
      ? fToC(daily.data[isToday ? 0 : 1].temperatureMax)
      : daily.data[isToday ? 0 : 1].temperatureMax
  );
  const low = Math.round(
    isCelcius
      ? fToC(daily.data[isToday ? 0 : 1].temperatureMin)
      : daily.data[isToday ? 0 : 1].temperatureMin
  );
  const currentTemp = Math.round(
    isCelcius ? fToC(currently.temperature) : currently.temperature
  );
  const feelsLike = Math.round(
    isCelcius
      ? fToC(currently.apparentTemperature)
      : currently.apparentTemperature
  );

  return (
    <StyledDay navIndex={navIndex}>
      <div className="left">
        <p className="date black">{dateString}</p>
        <p className="high-low">
          Day {high}
          &deg; &bull; Night {low}
          &deg;
        </p>
        {isToday && (
          <p className="temp">
            {currentTemp}&deg;<sup>{isCelcius ? 'C' : 'F'}</sup>
          </p>
        )}

        {isToday ? (
          <p className="feels-like">Feels like {feelsLike}&deg;</p>
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
