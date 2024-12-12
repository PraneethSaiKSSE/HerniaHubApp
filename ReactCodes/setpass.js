import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import config from './config';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const PasswordConfirmation = ({ route, navigation }) => {
  const { registrationNumber } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleConfirm = async () => {
    if (password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please enter both password and confirm password.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Instead of hashing the password, use the plain text password
    const plainPassword = password;

    try {
      const response = await fetch(`${config.apiBaseUrl}docpass.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationNumber,
          password: plainPassword, // Send the plain text password
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'Password updated successfully!');
        navigation.goBack(); // Optionally navigate back
      } else {
        Alert.alert('Error', data.message || 'An error occurred while updating password.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', 'An error occurred while updating password. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.registrationNumberText}>Registration Number: {registrationNumber}</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Confirm" onPress={handleConfirm} color="#007BFF" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: width * 0.05, // Responsive padding
  },
  registrationNumberText: {
    fontSize: width * 0.05, // Responsive font size
    marginBottom: height * 0.03, // Responsive margin
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: width * 0.05, // Responsive padding for form container
  },
  inputContainer: {
    marginBottom: height * 0.02, // Responsive margin
    width: '100%',
  },
  input: {
    height: height * 0.05, // Responsive height
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: width * 0.04, // Responsive padding
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: height * 0.03, // Adding margin to the top of the button container
  },
});

export default PasswordConfirmation;
