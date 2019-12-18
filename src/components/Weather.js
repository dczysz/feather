import React from 'react';

import SingleDay from './SingleDay';
import ManyDays from './ManyDays';
import Hourly from './Hourly';
import { max, min, getAdjustedDate } from '../util';

const Weather = ({ weather, dayIndex }) => {
  // console.log(weather);
  const hourlyTemps = weather.hourly.data.map(h => h.temperature);
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
      {dayIndex === 2 ? (
        <ManyDays
          daily={weather.daily.data}
          timeZone={weather.timezone}
          moreInfoUrl={moreInfoUrl}
        />
      ) : (
        <>
          <SingleDay weather={weather} dayIndex={dayIndex} />
          <Hourly
            hourlyArray={trimHourly(weather.hourly.data, dayIndex === 0)}
            min={minTemp}
            max={maxTemp}
            timeZone={weather.timezone}
          />
        </>
      )}
    </>
  );
};

export default Weather;
