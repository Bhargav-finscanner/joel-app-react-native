import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown';
import {images} from '../../assets/images';
import {colors} from '../../constant/colors';
import {fontFamily} from '../../constant/fontFamily';
import Font400 from '../fonts/Font400';
import Font600 from '../fonts/Font600';

export type DropDownType = {
  title: string;
  value: string;
};

export type DropDownRef = {
  set: (value: DropDownType) => void; // Method to set the selected option
  get: () => DropDownType | undefined; // Method to get the selected option
};

type DropDownProps = {
  data: DropDownType[];
  label?: string;
  rootStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputContainerStyle?: ViewStyle;
  onSelect?: (value: DropDownType | undefined) => void;
  config?: Partial<SelectDropdownProps>;
};

const DropDown = forwardRef<DropDownRef, DropDownProps>(
  (
    {
      data,
      label,
      rootStyle,
      labelStyle = {},
      inputContainerStyle,
      onSelect,
      config,
    },
    ref,
  ) => {
    const [selectedOption, setSelectedOption] = useState<DropDownType>();

    useImperativeHandle(
      ref,
      () => {
        return {
          set: (value: DropDownType) => {
            setSelectedOption(value);
          },
          get: (): DropDownType | undefined => selectedOption,
        };
      },
      [selectedOption],
    );

    useEffect(() => {
      if (data?.[0]) {
        setSelectedOption(data[0]);
      }
    }, [data]);

    useEffect(() => {
      if (onSelect && selectedOption) {
        onSelect(selectedOption);
      }
    }, [onSelect, selectedOption]);

    return (
      <View style={rootStyle}>
        {label ? (
          <Font600 style={[styles.label, labelStyle]}>{label}</Font600>
        ) : null}
        <View style={[styles.inputContainer, inputContainerStyle]}>
          <SelectDropdown
            data={data}
            defaultValue={data[0]}
            searchInputTxtColor={colors.black}
            searchInputTxtStyle={{
              fontFamily: fontFamily.Font500,
            }}
            onSelect={selectedItem => {
              setSelectedOption(selectedItem);
            }}
            renderButton={selectedItem => {
              return (
                <View style={styles.renderButtonStyle}>
                  <Text style={styles.input}>
                    {(selectedItem && selectedItem.title) ||
                      selectedOption?.title}
                  </Text>
                  <FastImage
                    style={styles.dropDownIcon}
                    source={images.drop_down}
                    resizeMode="contain"
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && {backgroundColor: colors.colorA42242}),
                  }}>
                  <Font400
                    style={{color: isSelected ? colors.white : colors.black}}>
                    {item.title}
                  </Font400>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            {...config}
          />
        </View>
      </View>
    );
  },
);

export default DropDown;

const styles = StyleSheet.create({
  root: {},
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
  renderButtonStyle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.darkGray,
    fontFamily: fontFamily.Font400,
  },
  dropDownIcon: {
    width: 14,
    height: 14,
    marginHorizontal: 14,
  },
  dropdownItemStyle: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
