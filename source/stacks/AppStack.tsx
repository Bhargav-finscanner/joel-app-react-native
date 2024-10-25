import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC, memo } from 'react';
import { AppStackParamList } from '../components/types/StackTypes';
import { colors } from '../constant/colors';
import PostDetail from '../screens/App/PostDetail';
import BottomStack from './BottomStack';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: colors.white},
        }}
        initialRouteName={'BOTTOM_STACK'}>
        <Stack.Screen
          options={{gestureEnabled: false}}
          component={BottomStack}
          name={'BOTTOM_STACK'}
        />
        <Stack.Screen component={PostDetail} name={'POST_DETAIL'} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(AppStack);
