export const max = array =>
  array.reduce((acc, current) => (current > acc ? current : acc), array[0]);

export const min = array =>
  array.reduce((acc, current) => (current < acc ? current : acc), array[0]);

export const calculateRatio = (value, min, max) => (value - min) / (max - min);

export const calculateRatioValue = (
  value,
  minInput,
  maxInput,
  minOutput,
  maxOutput
) =>
  (maxOutput - minOutput) * calculateRatio(value, minInput, maxInput) +
  minOutput;

export const getTime = (timeMs, timeZone, isToday) => {
  const date = new Date(timeMs);
  const month = date.toDateString().split(' ')[1];
  const day = date.toDateString().split(' ')[0];
  const dayNum = date.getDate();
  const time =
    date
      .toLocaleTimeString('en-US', { timeZone })
      .split(' ')[0]
      .split(':')
      .slice(0, 2)
      .join(':') +
    ' ' +
    date.toLocaleTimeString('en-US', { timeZone }).split(' ')[1];
  return isToday ? `${month} ${dayNum}, ${time}` : `${day}, ${month} ${dayNum}`;
};

export const degreeToDirection = deg => {
  let output = '';

  if (deg > 292.5 || deg < 67.5) output += 'N';
  if (deg > 112.5 && deg < 247.5) output += 'S';
  if (deg > 22.5 && deg < 157.5) output += 'E';
  if (deg > 202.5 && deg < 337.5) output += 'W';

  return output;
};

export const makeParameterValue = (name, key) =>
  `${name}=${key.replace(/ /g, '+')}`;

export const getParamUrl = (params = [], baseUrl = window.location.origin) =>
  `${baseUrl}?${params.map(p => makeParameterValue(p.key, p.value)).join('&')}`;

export const copyToClipboard = el => {
  console.log('Copying ' + el.value + ' to clipboard');
  el.select();
  document.execCommand('copy');
};
