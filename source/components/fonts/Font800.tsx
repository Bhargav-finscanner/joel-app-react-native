import React, {FC, memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '../../constant/colors';
import {fontFamily} from '../../constant/fontFamily';
import {FontProps} from '../types/commonComponentTypes';

const Font800: FC<FontProps> = ({children, style, config}) => {
  return (
    <Text {...config} style={[styles.font, style]}>
      {children}
    </Text>
  );
};

export default memo(Font800);

const styles = StyleSheet.create({
  font: {
    fontFamily: fontFamily.Font800,
    fontSize: 16,
    color: colors.black,
    includeFontPadding: false,
  },
});
