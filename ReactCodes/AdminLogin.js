import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from './config'; // Import the config file

const { width, height } = Dimensions.get('window');

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}adminlogin.php`, { // Use the base URL from config
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        // Login successful, navigate to the AdminDashBoard
        Alert.alert('Login Successful', 'Welcome, ' + username + '!');
        navigation.navigate('AdminDashBoard');
      } else {
        // Show invalid credentials message
        Alert.alert('Invalid Credentials', jsonResponse.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTitWq1r4a-luuWlmEJxHZZKGdBLDGP1439qQ&usqp=CAU' }}
        style={styles.image}
      />
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
  },
  outerBox: {
    width: width * 0.8,
    backgroundColor: '#87BEC5',
    padding: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginTop: height * 0.04,
    marginBottom: height * 0.025,
    borderRadius: 35,
    backgroundColor: 'white',
    width: '100%',
  },
  input: {
    height: height * 0.07,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: width * 0.04,
    color: 'black',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#0AB7B7',
    borderRadius: 10,
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.26,
    alignItems: 'center',
    marginTop: height * 0.04,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#FFFFFF',
    marginTop: height * 0.02,
    textDecorationLine: 'underline',
  },
  image: {
    width: width * 0.35,
    height: width * 0.35,
    marginBottom: height * 0.030,
  },
});

export default AdminLogin;