import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC, memo } from 'react';
import { AuthParamStackList } from '../components/types/StackTypes';
import { colors } from '../constant/colors';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';

const Stack = createNativeStackNavigator<AuthParamStackList>();

const AuthStack: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: colors.white},
        }}>
        <Stack.Screen component={SignIn} name={'SIGN_IN'} />
        <Stack.Screen component={SignUp} name={'SIGN_UP'} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(AuthStack);
