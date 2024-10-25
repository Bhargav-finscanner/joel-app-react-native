import React, {memo, useCallback, useEffect, useState} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {images} from '../../assets/images';
import {colors} from '../../constant/colors';
import Font500 from '../fonts/Font500';
import Font700 from '../fonts/Font700';

import {error_occur} from '../redux/authSlice';
import {useAppSelector} from '../redux/hooks';
import Button from '../styles/Button';

const ErrorModel = () => {
  const error = useAppSelector(state => state.auth.error);

  const [title, setTitle] = useState<string | boolean>('');

  useEffect(() => {
    if (error) {
      setTitle(error);
    }
  }, [error]);

  const dispatch = useDispatch();

  const close = useCallback(() => {
    dispatch(error_occur(false));
  }, [dispatch]);

  return (
    <Modal
      visible={error ? true : false}
      statusBarTranslucent={true}
      animationType="fade"
      transparent={true}>
      <View style={styles.model}>
        <View style={styles.container}>
          <FastImage
            style={styles.error}
            source={images.error}
            resizeMode="contain"
          />
          <Pressable onPress={close} style={styles.closeContainer}>
            <FastImage
              style={styles.closeIcon}
              source={images.close}
              resizeMode="contain"
            />
          </Pressable>
          <Font700 style={styles.title}>{'Error!'}</Font700>
          <Font500 style={styles.message}>{title}</Font500>
          <Button
            onPress={close}
            buttonContainerStyle={styles.button}
            buttonTextStyle={styles.buttonText}>
            {'Try Again'}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ErrorModel);

const styles = StyleSheet.create({
  model: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent_black,
  },
  error: {
    position: 'absolute',
    height: 60,
    width: 60,
    top: -30,
    alignSelf: 'center',
  },
  container: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  closeContainer: {
    padding: 10,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeIcon: {
    height: 12,
    width: 12,
  },
  title: {
    fontSize: 22,
    color: colors.red,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  message: {
    color: colors.gray,
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
    height: 30,
    alignSelf: 'center',
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: colors.red,
  },
  buttonText: {
    fontSize: 12,
  },
});
