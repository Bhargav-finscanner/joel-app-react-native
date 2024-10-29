import {ImageRequireSource} from 'react-native';

export const images: {[key: string]: ImageRequireSource} = {
  hide: require('./hide.png'),
  visible: require('./visible.png'),
} as const;
