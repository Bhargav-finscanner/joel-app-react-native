import React, {FC, memo, useMemo} from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type BackDropProps = {
  animatedIndex?: {
    value: number;
  };
  style?: ViewStyle;
  onPress?: () => void;
};

const Backdrop: FC<BackDropProps> = ({
  animatedIndex = {value: 1},
  style,
  onPress,
}) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [1, 1],
      [0.3, 0.5],
      Extrapolate.CLAMP,
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      containerAnimatedStyle,
      style,
      {
        backgroundColor: 'black',
      },
    ],
    [style, containerAnimatedStyle],
  );

  return (
    <Animated.View style={containerStyle}>
      <Pressable style={styles.root} onPress={onPress} />
    </Animated.View>
  );
};

export default memo(Backdrop);

const styles = StyleSheet.create({
  root: {flex: 1},
});
