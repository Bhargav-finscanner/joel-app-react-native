import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Image, 
  Dimensions, 
  KeyboardAvoidingView, 
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import React from 'react';
import NexaSlabHeavy from '../../components/fonts/NexaSlabHeavy';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjusts behavior based on the platform
      keyboardVerticalOffset={100} // Adjust this value to position correctly above the keyboard
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Image
            source={require('../../assets/images/joelsdirtykitchen_logo.png')}
            style={[styles.logo, { width: screenWidth }]}
          />

          <Text style={styles.title}>Log In</Text>

          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="Email" 
              placeholderTextColor="#8A8A8A" 
            />
            <TextInput 
              style={styles.input} 
              placeholder="Password" 
              placeholderTextColor="#8A8A8A" 
              secureTextEntry 
            />

            {/* Link to Terms */}
            <TouchableOpacity onPress={() => navigation.navigate('TermsScreen')}>
              <Text style={[styles.footerText, styles.forgotPassword]}>
                <Text style={styles.linkText}>Forgot password?</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            {/* Link to Log In */}
            <Text style={styles.footerText}>
              Or{' '}
              <TouchableOpacity onPress={() => navigation.navigate('WelComeScreen')}>
                <Text style={styles.linkText}>Sign Up</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#422120',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  logo: {
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    color: '#4CAF50',
    fontFamily: 'NexaSlabHeavy',
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  inputContainer: {
    width: '90%',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginVertical: 10,
    fontSize: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonText: {
    fontFamily: 'NexaSlabHeavy',
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  footerText: {
    fontFamily: 'NexaSlabHeavy',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 4,
  },
  forgotPassword: {
    marginTop: 30, // Adjust the top margin as needed
    marginBottom: 10, // Adjust the bottom margin as needed
  },
  linkText: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 16,
  },
});
