import React, { FC, memo } from 'react';
import { Text as RNText, TextInput as RNTextInput } from 'react-native';
import ErrorModel from '../components/model/ErrorModel';
import SuccessModel from '../components/model/SuccessModel';
import AuthStack from './AuthStack';

export const Text: React.FC<any> = props => {
  return <RNText {...props} allowFontScaling={false} />;
};

export const TextInput: React.FC<any> = props => {
  return <RNTextInput {...props} allowFontScaling={false} />;
};

if (TextInput.defaultProps) {
  TextInput.defaultProps.allowFontScaling = false;
} else {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

const Root: FC = () => {

  return (
    <>
      <ErrorModel />
      <SuccessModel />
      <AuthStack />
    </>
  );
};

export default memo(Root);
