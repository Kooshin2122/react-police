import tinycolor from 'tinycolor2';

export function getReadableColor(color) {
  const color1 = tinycolor(color);
  if (color1.isLight()) {
    return '#000000';
  }
  return '#FFFFFF';
}
