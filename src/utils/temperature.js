export const FAHRENHEIT = 'f';
export const CELSIUS = 'c';
export const KELVIN = 'k';

export const scales = [FAHRENHEIT, CELSIUS, KELVIN];

export const convert = input => {
  if (!input || !input.fromScale || !input.value || !input.toScale)
    throw `Missing either fromScale, value, or toScale`;

  const fromScale = input.fromScale.toLowerCase();
  const toScale = input.toScale.toLowerCase();
  const fromValue = input.value;

  if (scales.findIndex(s => s === fromScale) === -1)
    throw `'fromScale' must be one of the following values: ${scales}`;
  if (scales.findIndex(s => s === toScale) === -1)
    throw `'toScale' must be one of the following values: ${scales}`;

  let returnValue = 0;

  if (toScale === 'k') returnValue = fromValue;
  else if (toScale === 'c') returnValue = kToC(fromValue);
  else if (toScale === 'f') returnValue = kToF(fromValue);

  return Math.round(returnValue);
};

const kToF = k => (k - 273.15) * (9 / 5) + 32;
const kToC = k => k - 273.15;
