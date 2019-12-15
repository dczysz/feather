import React from 'react';

import SingleDay from './SingleDay';
import ManyDays from './ManyDays';
import Hourly from './Hourly';
import { max, min } from '../util';

const Weather = ({ weather, dayIndex }) => {
  const hourlyTemps = weather.hourly.data.map(h => h.temperature);
  const maxTemp = max(hourlyTemps);
  const minTemp = min(hourlyTemps);

  const trimHourly = (array, isToday) => {
    const today = [];
    const tomorrow = [];
    let startTomorrow = false;

    for (let data of array) {
      const time = new Date(data.time * 1000)
        .toLocaleTimeString()
        .replace(':00:00', '');
      if (time === '1 AM' && startTomorrow) break;
      if (time === '1 AM' && !startTomorrow) startTomorrow = true;
      !startTomorrow ? today.push(data) : tomorrow.push(data);
    }

    return isToday ? today : tomorrow;
  };

  const moreInfoUrl = `https://darksky.net/forecast/${weather.location.lat},${weather.location.lon}/`;

  return (
    <>
      {dayIndex === 2 ? (
        <ManyDays
          daily={weather.daily}
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
          />
        </>
      )}
    </>
  );
};

export default Weather;
