import React, { useState } from 'react';

import StyledCollapsingDay from './styles/CollapsingDay';
import { getDateString, degreeToDirection, fToC, mphToKph } from '../util';
import icons from '../assets/icons/weather';

const CollapsingDay = ({ day, timeZone, isToday, unit }) => {
  const [open, setOpen] = useState(false);
  const Icon = icons[day.icon];
  const isMetric = unit.temp === 'C';

  const precipExpected = day.precipType && day.precipProbability >= 0.1;

  const hiddenContent = [
    {
      label: 'Wind',
      value: `${
        isMetric
          ? Math.round(mphToKph(day.windSpeed)) + ' kph'
          : Math.round(day.windSpeed) + ' mph'
      } ${degreeToDirection(day.windBearing)}`,
    },
    {
      label: 'Humidity',
      value: `${Math.round(day.humidity * 100)}%`,
    },
    {
      label: 'UV Index',
      value: Math.round(day.uvIndex),
    },
    precipExpected
      ? {
          label: `Chance of ${day.precipType}`,
          value:
            day.precipAccumulation || day.precipIntensity
              ? Math.round(
                  (day.precipAccumulation || day.precipIntensity) * 100
                ) /
                  100 +
                ' in'
              : Math.round(day.precipProbability * 100) + '%',
        }
      : null,
    {
      label: 'Sunrise/Sunset',
      value:
        getDateString(day.sunriseTime * 1000, timeZone, true)
          .split(',')[1]
          .trim() +
        ', ' +
        getDateString(day.sunsetTime * 1000, timeZone, true)
          .split(',')[1]
          .trim(),
    },
  ];

  const numHiddenLines = hiddenContent.reduce(
    (acc, curr) => (acc += curr ? 1 : 0),
    0
  );

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <StyledCollapsingDay open={open} numLines={numHiddenLines}>
      <button aria-expanded={open} onClick={toggleOpen}>
        <div className="clickable-content">
          <div className="summary">
            <p>
              {isToday
                ? 'Today'
                : getDateString(day.time * 1000, timeZone, false)}
            </p>
            <p>{day.summary}</p>
          </div>
          <div className="icon-and-temp">
            {precipExpected && (
              <p className="precip-probability">
                {Math.round(day.precipProbability * 100)}%
              </p>
            )}
            <Icon />
            <div className="temps">
              <p>
                {Math.round(
                  isMetric ? fToC(day.temperatureMax) : day.temperatureMax
                )}
                &deg;
              </p>
              <p className="low">
                {Math.round(
                  isMetric ? fToC(day.temperatureMin) : day.temperatureMin
                )}
                &deg;
              </p>
            </div>
          </div>
        </div>

        <div className="hidden-content" aria-hidden={!open}>
          {hiddenContent.map(
            c =>
              c && (
                <p key={c.label}>
                  <span className="label">{c.label}</span>
                  <span className="value">{c.value}</span>
                </p>
              )
          )}
        </div>
      </button>
    </StyledCollapsingDay>
  );
};

export default CollapsingDay;
