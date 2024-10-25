import {ColorValue} from 'react-native';

export enum colors {
  white = 'rgba(255, 255, 255, 1)',
  off_white = 'hsla(173, 69%, 95%, 1)',
  black = 'rgba(0, 0, 0, 1)',
  transparent_black = 'rgba(0, 0, 0, 0.2)',
  transparent_black_1 = 'rgba(0, 0, 0, 0.1)',
  transparent = 'rgba(255, 255, 255, 0)',
  gray = 'rgba(128, 128, 128, 1)',
  darkGray = 'rgba(72, 72, 72, 1)',
  darkLightGray = 'rgba(150, 150, 150, 1)',
  lightGray = 'rgba(211, 211, 211, 1)',
  lighterGray = 'rgba(238, 238, 238, 1)',
  lightestGray = 'rgba(255, 255, 255, 1)',
  mediumGray = 'rgba(232, 229, 229, 1)',
  red = 'rgba(255, 0, 0, 1)',
  red_15 = 'rgba(255, 0, 0, 0.15)',
  blue_15 = 'rgba(88, 110, 223, 0.15)',
  blue = 'rgba(88, 110, 223, 1)',
  cyan_15 = 'rgba(18, 194, 207, 0.15)',
  cyan = 'rgba(18, 194, 207, 1)',
}

export const setOpacity = (rgbaColor: ColorValue, opacity: number) => {
  const regex = /^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), ([01](?:\.\d+)?)\)$/;
  const match = rgbaColor?.toString().match(regex);

  if (!match) {
    throw new Error('Invalid color format. Use rgba(r, g, b, a).');
  }

  const red = match[1];
  const green = match[2];
  const blue = match[3];

  if (opacity < 0 || opacity > 1) {
    throw new Error('Opacity must be a value between 0 and 1.');
  }

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};
