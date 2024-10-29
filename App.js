import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './source/screens/Auth/SignUp';
import SignIn from './source/screens/Auth/SignIn';  
import WelComeScreen from './source/screens/App/WelComeScreen';
import TermsScreen from './source/screens/App/TermsScreen';
import { enableScreens } from 'react-native-screens';

enableScreens();

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelComeScreen">
        <Stack.Screen name="WelComeScreen" component={WelComeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUp}  options={{ headerShown: false }} />
        <Stack.Screen name='SignIn' component={SignIn}  options={{ headerShown: false }} />
        <Stack.Screen name="TermsScreen" component={TermsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

