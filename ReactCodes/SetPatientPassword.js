import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import config from './config';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const SetPatientPassword = () => {
  const route = useRoute(); // Get the route object
  const { patientId } = route.params; // Destructure patientId from route params

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (text) => setPassword(text);
  const handleConfirmPasswordChange = (text) => setConfirmPassword(text);

  const handleConfirmPress = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    // Make a POST request to the backend PHP script
    fetch(`${config.apiBaseUrl}updatepatpass.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `patientId=${patientId}&pass=${password}&cpass=${confirmPassword}`, // Send form data
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Alert.alert('Success', data.message);
        } else {
          Alert.alert('Error', data.message);
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'Unable to update password. Please try again.');
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set password for Patient ID: {patientId}</Text>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Enter Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
          style={styles.input}
        />

        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button title="Confirm" onPress={handleConfirmPress} color="#007BFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // Responsive padding
    justifyContent: 'center',
    backgroundColor: '#f8f8f8', // Optional: Light background color for better contrast
  },
  header: {
    fontSize: width * 0.05, // Responsive font size
    marginBottom: height * 0.02, // Responsive margin
    textAlign: 'center',
  },
  formContainer: {
    padding: width * 0.05, // Responsive padding
    borderRadius: 10,
    backgroundColor: '#fff', // White background for the form container
    shadowColor: '#000', // Shadow for a subtle elevation effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow effect
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: height * 0.05, // Responsive margin
    paddingHorizontal: width * 0.04, // Responsive padding
    borderRadius: 5,
    width: '100%',
  },
});

export default SetPatientPassword;
