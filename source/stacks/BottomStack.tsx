import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FC, memo } from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../assets/images';
import { BottomStackPramList } from '../components/types/StackTypes';
import { colors } from '../constant/colors';
import { fontFamily } from '../constant/fontFamily';
import Home from '../screens/App/Home';

const Tab = createBottomTabNavigator<BottomStackPramList>();

type TabBarIconProps = {
  focused: boolean;
  icon: ImageSourcePropType | undefined;
};

const TabBarIcon: FC<TabBarIconProps> = ({focused, icon}) => (
  <Image
    tintColor={focused ? colors.black : colors.gray}
    resizeMode="contain"
    source={icon}
    style={styles.icon}
  />
);

const BottomStack = () => {
  const {bottom} = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          height: bottom + 60,
          paddingBottom: bottom + 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: fontFamily.Font400,
        },
      }}>
      <Tab.Screen
        component={Home}
        name={'HOME'}
        options={{
          tabBarLabel: 'Marketplace',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} icon={images.marketplace} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default memo(BottomStack);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
