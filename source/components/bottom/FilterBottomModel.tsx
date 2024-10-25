import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Portal} from '@gorhom/portal';
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import {colors} from '../../constant/colors';
import {dynamics} from '../../constant/dynamics';
import {fontFamily} from '../../constant/fontFamily';
import {get_brands, get_category} from '../../utils/api';
import Font500 from '../fonts/Font500';
import Font600 from '../fonts/Font600';
import Button from '../styles/Button';
import {error} from '../tost/error';
import {BrandType, CategoryType} from '../types/stateTypes';
import BackDrop from './Backdrop';

export type FilterBottomModelRef = {
  open: () => void;
  close: () => void;
};

const FilterBottomModel = forwardRef<FilterBottomModelRef>(({}, ref) => {
  const bottomRef = useRef<BottomSheetModal>(null);

  const {bottom} = useSafeAreaInsets();

  const [selectedCategoryId, setSelectedCategoryIds] = useState<
    (number | string)[]
  >([]);
  const [selectedBrandId, setSelectedBrandIds] = useState<(number | string)[]>(
    [],
  );
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [brandList, setBrandList] = useState<BrandType[]>([]);

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
      <BackDrop
        {...backdropProps}
        enableTouchThrough={true}
        onPress={() => {
          bottomRef.current?.dismiss();
        }}
      />
    );
  };

  const getListOfBrand = useCallback(async () => {
    try {
      const response = await get_category();
      setCategoryList(response);
    } catch (err: any) {
      error(err);
    }
  }, []);

  const getListOfCategory = useCallback(async () => {
    try {
      const response = await get_brands();
      setBrandList(response);
    } catch (err: any) {
      error(err);
    }
  }, []);

  useEffect(() => {
    getListOfCategory();
    getListOfBrand();
  }, [getListOfCategory, getListOfBrand]);

  const onSelectedCategoryId = useCallback((id: number | string) => {
    setSelectedCategoryIds((prev: (number | string)[]) => {
      if (prev?.findIndex((ele: number | string) => ele === id) === -1) {
        return [id, ...prev];
      } else {
        return prev?.filter((ele: number | string) => ele !== id);
      }
    });
  }, []);

  const onSelectedBrandId = useCallback((id: number | string) => {
    setSelectedBrandIds((prev: (number | string)[]) => {
      if (prev?.findIndex((ele: number | string) => ele === id) === -1) {
        return [id, ...prev];
      } else {
        return prev?.filter((ele: number | string) => ele !== id);
      }
    });
  }, []);

  return (
    <Portal>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomRef}
          index={0}
          snapPoints={[dynamics.height - 100]}
          backdropComponent={backDropHandler}>
          <View style={[styles.content]}>
            <View style={styles.header}>
              <Font600 style={styles.title}>{'Filter'}</Font600>
              <Pressable
                onPress={() => bottomRef?.current?.dismiss()}
                style={styles.closeContainer}>
                <Image
                  resizeMode="contain"
                  source={images.close}
                  style={styles.closeIcon}
                  tintColor={colors.colorA42242}
                />
              </Pressable>
            </View>
            <View style={styles.line} />

            <View style={styles.listContainer}>
              <Font500 style={styles.listTitle}>{'Category'}</Font500>
              <View style={styles.list}>
                {categoryList.map((ele: CategoryType, index: number) => (
                  <Pressable
                    key={index?.toString()}
                    onPress={onSelectedCategoryId?.bind(null, ele?.id)}
                    style={[
                      styles.itemContainer,
                      selectedCategoryId?.findIndex(
                        (id: number | string) => id === ele?.id,
                      ) !== -1
                        ? styles.selectedItemContainer
                        : {},
                    ]}>
                    <Text
                      style={[
                        styles.itemText,
                        selectedCategoryId?.findIndex(
                          (id: number | string) => id === ele?.id,
                        ) !== -1
                          ? styles.selectedItemText
                          : {},
                      ]}>
                      {ele?.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={styles.listContainer}>
              <Font500 style={styles.listTitle}>{'Brands'}</Font500>
              <View style={styles.list}>
                {brandList.map((ele: BrandType, index: number) => (
                  <Pressable
                    key={index?.toString()}
                    onPress={onSelectedBrandId?.bind(null, ele?.id)}
                    style={[
                      styles.itemContainer,
                      selectedBrandId?.findIndex(
                        (id: number | string) => id === ele?.id,
                      ) !== -1
                        ? styles.selectedItemContainer
                        : {},
                    ]}>
                    <Text
                      style={[
                        styles.itemText,
                        selectedBrandId?.findIndex(
                          (id: number | string) => id === ele?.id,
                        ) !== -1
                          ? styles.selectedItemText
                          : {},
                      ]}>
                      {ele?.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
          <View style={[styles.buttonContainer, {paddingBottom: bottom + 20}]}>
            <Button buttonContainerStyle={styles.buttonStyle}>{'Apply'}</Button>
            <Button
              buttonContainerStyle={[
                styles.buttonStyle,
                styles.buttonResetStyle,
              ]}
              buttonTextStyle={styles.buttonResetTextStyle}>
              {'Reset'}
            </Button>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Portal>
  );
});

export default memo(FilterBottomModel);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    color: colors.black,
    textAlign: 'center',
  },
  line: {
    height: 1,
    marginVertical: 6,
    backgroundColor: colors.gray,
  },
  closeContainer: {
    backgroundColor: colors.transparent_black_1,
    height: 28,
    width: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    height: 10,
    width: 10,
  },
  listContainer: {
    paddingVertical: 10,
  },
  listTitle: {
    marginHorizontal: 5,
  },
  list: {flexDirection: 'row', flexWrap: 'wrap'},
  itemContainer: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderColor: colors.colorA42242,
  },
  selectedItemContainer: {
    backgroundColor: colors.colorA42242,
  },
  itemText: {
    fontSize: 14,
    color: colors.colorA42242,
    fontFamily: fontFamily.Font500,
  },
  selectedItemText: {
    color: colors.white,
    fontFamily: fontFamily.Font700,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  buttonStyle: {
    flex: 1,
    marginRight: 10,
  },
  buttonResetStyle: {
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  buttonResetTextStyle: {
    color: colors.colorA42242,
  },
});
