/* eslint-disable react/react-in-jsx-scope */
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Portal} from '@gorhom/portal';
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets/images';
import {colors} from '../../constant/colors';
import {SORT} from '../../constant/SORT';
import Font500 from '../fonts/Font500';
import Font600 from '../fonts/Font600';
import Backdrop from './Backdrop';

export type SortBottomModelRef = {
  open: () => void;
  close: () => void;
};

type SortBottomModelProps = {
  value?: string;
  setValue?: (value: string) => void;
};

const SortBottomModel = forwardRef<SortBottomModelRef, SortBottomModelProps>(
  ({value, setValue = () => {}}, ref) => {
    const bottomRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          open: () => bottomRef?.current?.present(),
          close: () => bottomRef?.current?.dismiss(),
        };
      },
      [],
    );
    const backDropHandler = (backdropProps: any) => {
      return (
        <Backdrop
          {...backdropProps}
          enableTouchThrough={true}
          onPress={() => {
            bottomRef.current?.dismiss();
          }}
        />
      );
    };

    const onChangeSortingWithDate = useCallback(() => {
      bottomRef?.current?.dismiss();
      if (value === SORT.NEWEST_FIRST) {
        setValue(SORT.OLDEST_FIRST);
      } else {
        setValue(SORT.NEWEST_FIRST);
      }
    }, [value, setValue]);

    const onChangeSortingWithAmount = useCallback(() => {
      bottomRef?.current?.dismiss();
      if (value === SORT.HIGH_TO_LOW_AMOUNT) {
        setValue(SORT.LOW_TO_HIGH_AMOUNT);
      } else {
        setValue(SORT.HIGH_TO_LOW_AMOUNT);
      }
    }, [value, setValue]);

    const onChangeSortingWithQuantity = useCallback(() => {
      bottomRef?.current?.dismiss();
      if (value === SORT.HIGH_TO_LOW_QUANTITY) {
        setValue(SORT.LOW_TO_HIGH_QUANTITY);
      } else {
        setValue(SORT.HIGH_TO_LOW_QUANTITY);
      }
    }, [value, setValue]);

    return (
      <Portal>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomRef}
            index={0}
            snapPoints={[280]}
            backdropComponent={backDropHandler}>
            <View style={[styles.content]}>
              <View style={styles.header}>
                <Font600 style={styles.title}>{'Sort By'}</Font600>
              </View>
              <Pressable
                onPress={onChangeSortingWithDate}
                style={styles.container}>
                <FastImage
                  style={styles.icon}
                  resizeMode="contain"
                  source={images.date}
                />
                <Font500 style={styles.containerText}>{'Date'}</Font500>
                {value === SORT.NEWEST_FIRST || value === SORT.OLDEST_FIRST ? (
                  <View style={styles.valueContainer}>
                    <Font500 style={styles.value}>{value}</Font500>
                    <Image
                      tintColor={
                        colors[value === SORT.NEWEST_FIRST ? 'blue' : 'red']
                      }
                      style={styles.arrowIcon}
                      resizeMode="contain"
                      source={
                        images[
                          value === SORT.NEWEST_FIRST
                            ? 'arrow_up'
                            : 'arrow_down'
                        ]
                      }
                    />
                  </View>
                ) : null}
              </Pressable>
              <Pressable
                onPress={onChangeSortingWithAmount}
                style={styles.container}>
                <FastImage
                  style={styles.icon}
                  resizeMode="contain"
                  source={images.amount}
                />
                <Font500 style={styles.containerText}>{'Amount'}</Font500>
                {value === SORT.HIGH_TO_LOW_AMOUNT ||
                value === SORT.LOW_TO_HIGH_AMOUNT ? (
                  <View style={styles.valueContainer}>
                    <Font500 style={styles.value}>{value}</Font500>
                    <FastImage
                      style={styles.arrowIcon}
                      resizeMode="contain"
                      source={
                        images[
                          value === SORT.HIGH_TO_LOW_AMOUNT
                            ? 'high_to_low_amount'
                            : 'low_to_high_amount'
                        ]
                      }
                    />
                  </View>
                ) : null}
              </Pressable>
              <Pressable
                onPress={onChangeSortingWithQuantity}
                style={styles.container}>
                <FastImage
                  style={styles.icon}
                  resizeMode="contain"
                  source={images.date}
                />
                <Font500 style={styles.containerText}>{'Quantity'}</Font500>
                {value === SORT.HIGH_TO_LOW_QUANTITY ||
                value === SORT.LOW_TO_HIGH_QUANTITY ? (
                  <View style={styles.valueContainer}>
                    <Font500 style={styles.value}>{value}</Font500>
                    <FastImage
                      style={styles.arrowIcon}
                      resizeMode="contain"
                      source={
                        images[
                          value === SORT.HIGH_TO_LOW_QUANTITY
                            ? 'high_to_low_quantity'
                            : 'low_to_high_quantity'
                        ]
                      }
                    />
                  </View>
                ) : null}
              </Pressable>
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
    );
  },
);

export default memo(SortBottomModel);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: colors.black,
    textAlign: 'center',
  },
  container: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 22,
    width: 22,
  },
  containerText: {
    fontSize: 18,
    color: colors.black,
    paddingHorizontal: 10,
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    paddingHorizontal: 8,
  },
  arrowIcon: {
    height: 16,
    width: 16,
  },
});
