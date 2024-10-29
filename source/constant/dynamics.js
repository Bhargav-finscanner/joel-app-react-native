import {Dimensions} from 'react-native';

export const dynamics = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
} as {width: number; height: number};
