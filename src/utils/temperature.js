export const FAHRENHEIT = 'f';
export const CELSIUS = 'c';
export const KELVIN = 'k';

const scales = [FAHRENHEIT, CELSIUS, KELVIN];

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

  if (fromScale === toScale) returnValue = fromValue;

  if (fromScale === 'c') {
    returnValue = toScale === 'f' ? cToF(fromValue) : cToK(fromValue);
  }
  if (fromScale === 'f') {
    returnValue = toScale === 'c' ? fToC(fromValue) : fToK(fromValue);
  }
  if (fromScale === 'k') {
    returnValue = toScale === 'f' ? kToF(fromValue) : kToC(fromValue);
  }

  return Math.round(returnValue);
};

const kToF = k => (k - 273.15) * (9 / 5) + 32;
const kToC = k => k - 273.15;
const fToK = f => (f - 32) * (5 / 9) + 273.15;
const fToC = f => (f - 32) * (5 / 9);
const cToK = c => c + 273.15;
const cToF = c => c * (9 / 5) + 32;
