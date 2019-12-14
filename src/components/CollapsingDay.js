import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getTime, degreeToDirection } from '../util';
import icons from '../assets/icons';

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

  &:not(:first-child) {
    border-top: 1px solid ${p => p.theme.grey};
  }

  button {
    all: inherit;
    border: none;
    cursor: pointer;
    margin: 0;
    padding: 0 1rem;
    width: 100%;

    /* :focus {
      box-shadow: inset 0 0 4px ${p => p.theme.grey};
    } */

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

    .clickable-content {
      display: flex;
      justify-content: space-between;
      margin: 0;

      .icon-and-temp {
        display: flex;
        align-items: center;

        .precip-probability {
          color: ${p => p.theme.blue};
          font-weight: bold;
          margin: 0.5rem 0;
        }

        svg {
          height: 4.5rem;
          margin: 0 -1rem;
          fill: ${p => p.theme.blue};
        }

        .temps {
          p {
            text-align: center;
          }

          .low {
            color: ${p => p.theme.grey};
          }
        }
      }
    }

    .hidden-content {
      transition: all var(--transition-time) ease-in-out;
      max-height: ${p => (p.open ? '5.5rem' : '0px')};
      overflow-y: hidden;

      p {
        display: flex;
        justify-content: space-between;
        margin-top: 0;

        &:first-child {
          margin-top: 0.5rem;
        }

        span {
          width: 50%;
        }

        .label {
          color: ${p => p.theme.grey};
        }

        .value {
        }
      }

      &:focus {
        box-shadow: 0 0 30px red;
      }
    }
  }
`;

const CollapsingDay = ({ day, timeZone }) => {
  const [open, setOpen] = useState(false);
  const Icon = icons[day.icon];

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <StyledCollapsingDay open={open}>
      <button aria-expanded={open} onClick={toggleOpen}>
        <div className="clickable-content">
          <div className="summary">
            <p>{new Date(day.time * 1000).toDateString()}</p>
            <p>{day.summary}</p>
          </div>
          <div className="icon-and-temp">
            {day.precipType && day.precipProbability >= 0.1 && (
              <p className="precip-probability">
                {Math.round(day.precipProbability * 100)}%
              </p>
            )}
            <Icon />
            <div className="temps">
              <p>{day.apparentTemperatureHigh.toFixed()}&deg;</p>
              <p className="low">{day.apparentTemperatureLow.toFixed()}&deg;</p>
            </div>
          </div>
        </div>

        <div className="hidden-content" aria-hidden={!open}>
          <p>
            <span className="label">Wind</span>{' '}
            <span className="value">
              {Math.round(day.windSpeed)} mph{' '}
              {day.windSpeed && degreeToDirection(day.windBearing)}
            </span>
          </p>
          <p>
            <span className="label">Humidity</span>{' '}
            <span className="value">{day.humidity * 100}%</span>
          </p>
          <p>
            <span className="label">Sunrise/Sunset</span>{' '}
            <span className="value">
              {getTime(day.sunriseTime * 1000, timeZone, true)
                .split(',')[1]
                .trim()}
              {', '}
              {getTime(day.sunsetTime * 1000, timeZone, true)
                .split(',')[1]
                .trim()}
            </span>
          </p>
        </div>
      </button>
    </StyledCollapsingDay>
  );
};

export default CollapsingDay;