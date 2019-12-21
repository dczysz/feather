import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getDateString, degreeToDirection } from '../util';
import icons from '../assets/icons/weather';

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }

  to {
    max-height: 4.5rem;
  }
`;

const StyledCollapsingDay = styled.div`
  --animation-time: 500ms;
  --transition-time: 300ms;
  animation: ${expandAnimation} var(--animation-time) ease;
  transition: all var(--transition-time);
  overflow-y: hidden;
  border-bottom: 1px solid ${p => p.theme.grey};
  background-color: ${p => p.theme.white};

  button {
    all: inherit;
    border: none;
    cursor: pointer;
    margin: 0;
    padding: 0 1rem;
    width: 100%;

    p {
      margin: 0.5rem 0;
      line-height: 1rem;

      &:first-of-type {
        margin-top: 1rem;
      }

      &:last-of-type {
        margin-bottom: 1rem;
      }
    }

    .clickable-content,
    .hidden-content {
      max-width: ${p => p.theme.maxWidth};

      @media screen and (min-width: ${p => p.theme.maxWidth}) {
        margin-left: auto;
        margin-right: auto;
      }
    }

    .clickable-content {
      display: flex;
      justify-content: space-between;

      .icon-and-temp {
        display: flex;
        align-items: center;

        .precip-probability,
        svg {
          color: hsl(${p => p.theme.bgHsl.day.from});
        }

        .precip-probability {
          margin: 0.5rem 0;
        }

        svg {
          height: 4.5em;
          margin: 0 1rem;
        }

        .temps {
          p {
            text-align: center;

            &.low {
              color: ${p => p.theme.grey};
            }
          }
        }
      }
    }

    .hidden-content {
      transition: all var(--transition-time) ease-in-out;
      max-height: ${p => (p.open ? p.numLines * 1.5 + 1 + 'rem' : '0px')};
      overflow-y: hidden;

      p {
        display: flex;
        justify-content: space-between;
        margin-top: 0;
        max-width: calc(${p => p.theme.maxWidth} / 2);

        &:first-child {
          margin-top: 0.5rem;
        }

        span {
          width: 50%;
        }

        .label {
          color: ${p => p.theme.grey};
        }
      }

      &:focus {
        box-shadow: 0 0 30px red;
      }
    }
  }
`;

const CollapsingDay = ({ day, timeZone, isToday }) => {
  const [open, setOpen] = useState(false);
  const Icon = icons[day.icon];

  const precipExpected = day.precipType && day.precipProbability >= 0.1;

  const hiddenContent = [
    {
      label: 'Wind',
      value: `${Math.round(day.windSpeed)} mph ${degreeToDirection(
        day.windBearing
      )}`,
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
              <p>{Math.round(day.temperatureMax)}&deg;</p>
              <p className="low">{Math.round(day.temperatureMin)}&deg;</p>
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
