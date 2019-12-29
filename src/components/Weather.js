import React from 'react';

import SingleDay from './SingleDay';
import ManyDays from './ManyDays';
import Hourly from './Hourly';
import { max, min, getAdjustedDate, fToC } from '../util';

const Weather = ({ current }) => {
  const { weather, navIndex } = current.context;
  const hourlyTemps = weather.hourly.data.map(h =>
    current.context.unit.temp === 'C' ? fToC(h.temperature) : h.temperature
  );
  const maxTemp = max(hourlyTemps);
  const minTemp = min(hourlyTemps);

  const trimHourly = (hourly, isToday) => {
    const today = [];
    const tomorrow = [];
    let isTomorrow = false;

    for (let hour of hourly) {
      const date = getAdjustedDate(
        new Date(hour.time * 1000),
        weather.timezone
      );
      const time = date.toLocaleTimeString().replace(':00:00', '');
      if (time === '1 AM' && isTomorrow) break;
      if (time === '1 AM' && !isTomorrow) isTomorrow = true;
      !isTomorrow ? today.push(hour) : tomorrow.push(hour);
    }

    return isToday ? today : tomorrow;
  };

  const moreInfoUrl = `https://darksky.net/forecast/${weather.latitude},${weather.longitude}/`;

  return (
    <>
      {navIndex === 2 ? (
        <ManyDays
          daily={weather.daily.data}
          timeZone={weather.timezone}
          moreInfoUrl={moreInfoUrl}
          unit={current.context.unit}
        />
      ) : (
        <>
          <SingleDay
            weather={weather}
            navIndex={navIndex}
            unit={current.context.unit}
          />
          <Hourly
            hourlyArray={trimHourly(weather.hourly.data, navIndex === 0)}
            min={minTemp}
            max={maxTemp}
            timeZone={weather.timezone}
            current={current}
          />
        </>
      )}
    </>
  );
};

export default Weather;
