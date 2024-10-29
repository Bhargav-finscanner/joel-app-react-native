import React, {FC, memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '../../constant/colors';
import { fontFamily } from '../../constant/fontFamily';
import {FontProps} from '../types/commonComponentTypes';

const NexaSlabHeavy: FC<FontProps> = ({children, style, config}) => {
  return (
    <Text {...config} style={[styles.font, style]}>
      {children}
    </Text>
  );
};

export default memo(NexaSlabHeavy);

const styles = StyleSheet.create({
  font: {
    fontFamily: fontFamily.NexaSlabHeavy,
    fontSize: 24,
    color: colors.black,
    includeFontPadding: false,
  },
});