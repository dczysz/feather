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
