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

export const getAdjustedDate = (date, timeZone) => {
  const str = date.toLocaleString('en-US', { timeZone });
  const [mdy, hmsM] = str.split(', ');
  const [hms, amPm] = hmsM.split(' ');

  const [month, day, year] = mdy.split('/');
  const [badHour, minute, second] = hms.split(':');
  const hour = amPm === 'AM' ? badHour : +badHour + 12;

  return new Date(+year, +month - 1, +day, +hour, +minute, +second);
};

export const getDateString = (timeMs, timeZone, isToday = false) => {
  const date = getAdjustedDate(new Date(timeMs), timeZone);
  const month = date.toDateString().split(' ')[1];
  const day = date.toDateString().split(' ')[0];
  const dayNum = date.getDate();
  const [hmsStr, amPm] = date.toLocaleTimeString().split(' ');
  const [hour, min] = hmsStr.split(':');
  const time = `${hour}:${min} ${amPm}`;

  return isToday ? `${month} ${dayNum}, ${time}` : `${day}, ${month} ${dayNum}`;
};

export const getHourlyTimeString = (timeMs, timeZone) => {
  const date = getAdjustedDate(new Date(timeMs), timeZone);
  const timeStr = date.toLocaleTimeString();
  const [hms, amPm] = timeStr.split(' ');
  const h = +hms.split(':')[0].toString();

  return `${h} ${amPm}`;
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

export const fToC = tempF => (tempF - 32) * (5 / 9);
