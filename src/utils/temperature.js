export const FAHRENHEIT = 'f';
export const CELSIUS = 'c';
export const KELVIN = 'k';

export const convert = (from, to) => {
  if (!from || !from.scale || !from.value)
    throw "'from' must contain an object with the shape {scale: 'f'|'c'|'k', value: {number}}";
  if (!to || !to.scale || !to.value)
    throw "'to' must contain an object with the shape {scale: 'f'|'c'|'k', value: {number}}";

  const fromScale = from.scale.toLowerCase();
  const toScale = to.scale.toLowerCase();

  if (!scales.findIndex(s => s === fromScale))
    throw `'from.scale' must be one of the following values: ${scales}`;
  if (!scales.findIndex(s => s === toScale))
    throw `'to.scale' must be one of the following values: ${scales}`;

  if (from.scale === to.scale) return from.value;

  if (fromScale === 'c') {
    return toScale === 'f'
      ? cToF(from.value, to.value)
      : cToK(from.value, to.value);
  }
  if (fromScale === 'f') {
    return toScale === 'c'
      ? fToC(from.value, to.value)
      : fToK(from.value, to.value);
  }
  if (fromScale === 'k') {
    return toScale === 'f'
      ? kToF(from.value, to.value)
      : kToC(from.value, to.value);
  }
};

const scales = [FAHRENHEIT, CELSIUS, KELVIN];

const kToF = k => (k - 273.15) * (9 / 5) + 32;
const kToC = k => k - 273.15;
const fToK = f => (f - 32) * (5 / 9) + 273.15;
const fToC = f => (f - 32) * (5 / 9);
const cToK = c => c + 273.15;
const cToF = c => c * (9 / 5) + 32;
