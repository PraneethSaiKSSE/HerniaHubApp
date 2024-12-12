import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from './config';
const API_URL = process.env.API_URL || config.apiBaseUrl;
console.log(API_URL);

const { width, height } = Dimensions.get('window');

const DoctorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Missing Credentials', 'Please provide both registration number and password.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch(`${config.apiBaseUrl}checkdocdet.php`, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        navigation.navigate('DocDashBoard', { 'Registration Number': username });
      } else {
        Alert.alert('Login Failed', 'Invalid registration number or password.');
      }
    })
    .catch(error => {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    });
  };

  const handleSignUp = () => {
    navigation.navigate('DoctorSignUp');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image source={require('./images/Dash2.jpg')} style={styles.headerImage} />
      <View style={styles.outerBox}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
              placeholderTextColor="#ccc"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry
            />
          </View>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>Not a user yet?</Text>
        <Text style={styles.signup} onPress={handleSignUp}>SignUp</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: width * 0.05,
  },
  headerImage: {
  
    width: width * 0.45,
    height: width * 0.45,
    marginBottom: height * 0.020,
    marginTop: -height * 0.090,
  
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  outerBox: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: width * 0.04,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: height * 0.01,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: height * 0.032,
    marginTop: height * 0.026,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  input: {
    height: 48,
    borderWidth: 0,
    borderRadius: 20,
    paddingHorizontal: width * 0.05,
    fontSize: width * 0.04,
    color: 'black',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#0AB7B7',
    borderRadius: 10,
    paddingVertical: height * 0.024,
    paddingHorizontal: width * 0.30,
    alignItems: 'center',
    marginBottom: height * 0.016,
    marginTop: height * 0.032,
  },
  signupButton: {
    backgroundColor: '#0AB7B7',
    borderRadius: 10,
    paddingVertical: height * 0.024,
    paddingHorizontal: width * 0.28,
    alignItems: 'center',
    marginBottom: height * 0.016,
    marginTop: height * 0.032,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  signup: {
    fontSize: width * 0.04,
    color: 'green',
    textAlign: 'center',
    marginTop: -height * 0.028,
    marginBottom: height * 0.004,
    marginLeft: width*0.34,
  },
  signupText: {
    fontSize: width * 0.04,
   
    textAlign: 'center',
    marginTop: height * 0.005,
    marginLeft: -width * 0.1,
  },
});

export default DoctorLogin;