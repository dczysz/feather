import React from 'react';

import StyledManyDays from './styles/ManyDays';
import CollapsingDay from './CollapsingDay';

const ManyDays = ({ daily, timeZone, moreInfoUrl, unit }) => (
  <StyledManyDays>
    {daily.map((d, i) => (
      <CollapsingDay
        key={d.time}
        day={d}
        timeZone={timeZone}
        isToday={i === 0}
        unit={unit}
      />
    ))}
    <div className="more-info">
      <a href={moreInfoUrl}>View web results</a>
    </div>
  </StyledManyDays>
);

export default ManyDays;
