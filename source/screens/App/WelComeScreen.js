import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions,StyleSheet } from 'react-native';
import { fontFamily } from '../../constant/fontFamily';
import { colors } from '../../constant/colors';


const WelComeScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;

  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to Sign Up screen
  };

  const handleLogin = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/joelsdirtykitchen_logo.png')} // Corrected path
        style={[styles.logo, { width: screenWidth }]} 
      />

      {/* Sign Up Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Subtitle Text */}
        <Text style={styles.subtitle}>Already a user?</Text>

        {/* Log In Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#422120',
    alignItems: 'center',
    paddingTop: 80,
    justifyContent: 'space-between',
  },
  logo: {
    height: 150,
    resizeMode: 'contain',
  },
  bottomButtonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 150, // Adjusted to provide space at the bottom of the screen
  },
  signUpButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 150,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom:20, // Space between Sign Up button and subtitle
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: fontFamily.NexaSlabHeavy,
  },
  subtitle: {
    color: '#4CAF50',
    fontSize: 16,
    marginBottom: 20, // Increased space between subtitle and Log In button
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 155,
    borderRadius: 10,
    alignItems: 'center',
  },
});


export default WelComeScreen;
