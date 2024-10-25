import React, {FC, memo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import OtpInputs, {OtpInputsRef} from 'react-native-otp-inputs';
import {colors, setOpacity} from '../../constant/colors';
import {fontFamily} from '../../constant/fontFamily';

type OtpInputProps = {
  onChangeTextHandler: (otpCode: string) => void;
};

const OtpInput: FC<OtpInputProps> = ({onChangeTextHandler}) => {
  const otpRef = useRef<OtpInputsRef>(null);

  return (
    <View>
      <OtpInputs
        autofillFromClipboard={false}
        ref={otpRef}
        clearTextOnFocus
        numberOfInputs={4}
        keyboardType="phone-pad"
        handleChange={onChangeTextHandler}
        style={styles.otpStyle}
        inputStyles={styles.otpInputStyle}
        inputContainerStyles={styles.otpInputContainer}
      />
    </View>
  );
};

export default memo(OtpInput);

const styles = StyleSheet.create({
  otp: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: setOpacity(colors.colorA42242, 0.6),
  },
  otpStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  otpInputStyle: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: colors.black,
    fontFamily: fontFamily.Font500,
  },
  otpInputContainer: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.colorA42242,
  },
});
