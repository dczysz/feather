import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import icons from '../assets/icons/weather';
import { calculateRatioValue, getHourlyTimeString } from '../util';

const clipAnimation = keyframes`
  from {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    opacity: 0;
  }

  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    opacity: 1;
  }
`;

const StyledGraph = styled.div`
  height: 100%;

  svg {
    display: block;
    fill: none;
    height: 100%;
    margin: 0 auto;
    stroke-width: 2;

    .x-grid {
      stroke: ${p => p.theme.white};
    }

    .grid {
      stroke-width: 1.5;
    }

    text {
      fill: ${p => p.theme.white};
      font-size: 0.8rem;
      stroke: none;
      text-anchor: middle;

      &.hour {
        fill: ${p => p.theme.black};
      }
    }

    .graph {
      opacity: 0;

      &.animate {
        animation: ${clipAnimation} ${p => p.animationTime}ms ease;
        opacity: 1;
      }

      path#line {
        fill: ${p => p.theme.lightBg};
        stroke: none;
      }

      .icon {
        fill: ${p => p.theme.white};
        stroke: none;
      }
    }
  }
`;

const Graph = ({ hourly, minTemp, maxTemp, timeZone }) => {
  const ANIMATION_TIME = 40 * hourly.length;
  const graphRef = useRef();

  useEffect(() => {
    if (!hourly) return;
    const ref = graphRef.current;
    ref.classList.remove('animate');
    setTimeout(() => {
      ref.classList.add('animate');
    }, 0);
  }, [hourly]);

  const hourData = hourly.map(h => ({
    time: getHourlyTimeString(h.time * 1000, timeZone),
    icon: h.icon,
    showPrecip: shouldShowPrecip(h),
    temp: h.temperature,
  }));

  const opts = {
    hourWidth: 50,
    height: 300,
  };
  opts.width = opts.hourWidth * (hourData.length + 1) - 40;
  opts.ySize = opts.height / 6;
  opts.insideHeight = opts.ySize * 4;
  opts.graphHeight = opts.ySize * 3.5;

  const getSvgX = (spacing, multiplier, objSize = 0) =>
    spacing * (multiplier + 1) - objSize / 2;

  function shouldShowPrecip(data) {
    return (
      data.precipProbability >= 0.1 &&
      ['rain', 'snow', 'sleet', 'hail', 'thunderstorm', 'tornado'].includes(
        data.icon
      )
    );
  }

  return (
    <StyledGraph animationTime={ANIMATION_TIME}>
      <svg viewBox={`20 0 ${opts.width} ${opts.height}`} className="chart">
        <title>Hourly temperature graph</title>
        <g className="grid x-grid">
          <line
            x1="0"
            y1={opts.height - opts.ySize}
            x2={opts.hourWidth * (hourData.length + 1)}
            y2={opts.height - opts.ySize}
          ></line>
        </g>

        <g className="graph" ref={graphRef}>
          <path
            id="line"
            d={
              `M0,${calculateRatioValue(
                hourData[0].temp,
                maxTemp,
                minTemp,
                opts.ySize * 1.5,
                opts.graphHeight
              )} ${hourData
                .map(
                  (h, i) =>
                    ` L${opts.hourWidth * (i + 1)},${calculateRatioValue(
                      h.temp,
                      maxTemp,
                      minTemp,
                      opts.ySize * 1.5,
                      opts.graphHeight
                    )}`
                )
                .join(' ')}` +
              ` L${getSvgX(
                opts.hourWidth,
                hourData.length
              )}, ${calculateRatioValue(
                hourData[hourData.length - 1].temp,
                maxTemp,
                minTemp,
                opts.ySize * 1.5,
                opts.graphHeight
              )} L${getSvgX(opts.hourWidth, hourData.length)},${
                opts.height
              } L0,${opts.height} L0,${calculateRatioValue(
                hourData[0].temp,
                maxTemp,
                minTemp,
                opts.ySize * 1.5,
                opts.graphHeight
              )}`
            }
          />

          {hourData.map((h, i) => (
            <text
              className="temp"
              key={h.time}
              x={getSvgX(opts.hourWidth, i)}
              y={
                calculateRatioValue(
                  h.temp,
                  maxTemp,
                  minTemp,
                  opts.ySize * 1.5,
                  opts.graphHeight
                ) - 12
              }
            >
              {Math.round(h.temp)}&deg;
            </text>
          ))}

          {hourData.map((h, i) => {
            const Icon = icons[h.icon];
            return (
              <Icon
                key={h.time}
                x={getSvgX(opts.hourWidth, i, opts.ySize)}
                y={opts.height - opts.ySize * 2}
                width={opts.ySize}
                height={opts.ySize}
                className="icon"
              />
            );
          })}
        </g>

        <g className="hour-labels">
          {hourData.map((h, i) => (
            <text
              className="hour"
              key={h.time}
              x={getSvgX(opts.hourWidth, i)}
              y={opts.height - opts.ySize / 2 + 4}
            >
              {h.time}
            </text>
          ))}
        </g>
      </svg>
    </StyledGraph>
  );
};

export default Graph;
