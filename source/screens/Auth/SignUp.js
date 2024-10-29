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

const SignUp = () => {
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

          <Text style={styles.title}>Sign Up</Text>

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
            <Text style={styles.footerText}>
              By signing up, you agree to the{' '}
              <TouchableOpacity onPress={() => navigation.navigate('TermsScreen')}>
                <Text style={styles.linkText}>Terms</Text>
              </TouchableOpacity>.
            </Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Link to Log In */}
            <Text style={styles.footerText}>
              Or{' '}
              <TouchableOpacity onPress={() => navigation.navigate('WelComeScreen')}>
                <Text style={styles.linkText}>Log In</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#422120',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80,
  },
  logo: {
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    color: '#4CAF50',
    fontFamily: NexaSlabHeavy,
    fontWeight: 'bold',
    marginBottom: 130, // Adjust margin for better spacing
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
    marginVertical: 10, // Reduce margin for better spacing
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
    fontFamily: NexaSlabHeavy,
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  footerText: {
    fontFamily: NexaSlabHeavy,
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 4,
  },
  linkText: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
});
