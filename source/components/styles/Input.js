import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {
  ImageRequireSource,
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import FastImage, {ImageStyle, Source} from 'react-native-fast-image';
import {images} from '../../assets/images';
import {colors} from '../../constant/colors';
import Font600 from '../fonts/Font600';
// import KeyboardManager from 'react-native-keyboard-manager';
import {fontFamily} from '../../constant/fontFamily';

// if (Platform.OS === 'ios') {
//   KeyboardManager.setEnable(true);
//   KeyboardManager.setKeyboardDistanceFromTextField(10);
//   KeyboardManager.setEnableAutoToolbar(false);
// }

export type InputRef = {
  set: (value: string) => void;
  get: () => string;
};

type InputProps = {
  label?: string;
  config?: TextInputProps;
  leftIcon?: Source | ImageRequireSource;
  rightIcon?: Source | ImageRequireSource;
  rootStyle?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  default_value?: string;
  leftIconStyle?: ImageStyle;
  leftIconPress?: () => void;
  rightIconPress?: () => void;
  rightIconStyle?: ImageStyle;
  secureTextEntry?: boolean;
  editable?: boolean;
  inputContainerStyle?: ViewStyle;
  onReturn?: () => void;
  keyboardType?: KeyboardTypeOptions;
};

const Input = forwardRef<InputRef, InputProps>(
  (
    {
      label,
      config,
      leftIcon,
      rightIcon,
      rootStyle,
      labelStyle = {},
      inputStyle,
      default_value,
      leftIconStyle = {},
      leftIconPress,
      rightIconPress,
      rightIconStyle,
      secureTextEntry,
      editable = true,
      inputContainerStyle,
      onReturn = () => {},
      keyboardType = 'default',
    },
    ref,
  ) => {
    const [input, setInput] = useState<string>(
      default_value ? default_value : '',
    );

    const [isVisible, setIsVisible] = useState<boolean | undefined>(
      secureTextEntry,
    );

    useImperativeHandle(
      ref,
      () => {
        return {
          set: (value: string) => {
            setInput(value);
          },
          get: (): string => input,
        };
      },
      [input],
    );

    const onChangHandler = (value: string) => setInput(value);

    const onVisibleTextToggleHandler = useCallback(() => {
      setIsVisible(prev => !prev);
    }, []);

    return (
      <View style={rootStyle}>
        {label ? (
          <Font600 style={[styles.label, labelStyle]}>{label}</Font600>
        ) : null}
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {leftIcon ? (
            <Pressable onPress={leftIconPress}>
              <FastImage
                source={leftIcon}
                style={[styles.icon, leftIconStyle]}
                resizeMode="contain"
              />
            </Pressable>
          ) : null}

          <TextInput
            {...config}
            value={input}
            editable={editable}
            autoComplete={'off'}
            onSubmitEditing={onReturn}
            keyboardType={keyboardType}
            onChangeText={onChangHandler}
            style={[styles.input, inputStyle]}
            cursorColor={colors.colorA42242}
            selectionColor={colors.colorA42242}
            secureTextEntry={isVisible}
          />
          {secureTextEntry ? (
            <Pressable onPress={onVisibleTextToggleHandler}>
              <FastImage
                source={images[isVisible ? 'visible' : 'hide']}
                style={styles.icon}
                resizeMode="contain"
              />
            </Pressable>
          ) : null}
          {rightIcon ? (
            <Pressable onPress={rightIconPress}>
              <FastImage
                source={rightIcon}
                style={[styles.icon, rightIconStyle]}
                resizeMode="contain"
              />
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  },
);

export default memo(Input);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: colors.gray,
  },
  inputContainer: {
    height: 42,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.darkGray,
    fontFamily: fontFamily.Font400,
  },
  icon: {
    width: 16,
    height: 16,
    marginHorizontal: 14,
  },
});
