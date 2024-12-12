import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import config from './config';

// Get the screen width and height
const { width, height } = Dimensions.get('window');

const PatPassword = ({ navigation }) => {
  const route = useRoute();
  const { patid } = route.params; // Get the passed patient ID

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (text) => setPassword(text);
  const handleConfirmPasswordChange = (text) => setConfirmPassword(text);

  const handleConfirmPress = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    // Make the API call to update the password in the backend
    fetch(`${config.apiBaseUrl}updatepatientpass.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `patientId=${patid}&pass=${password}&cpass=${confirmPassword}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Alert.alert('Success', 'Password updated successfully.');
          navigation.goBack(); // Go back to the previous screen
        } else {
          Alert.alert('Error', data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Failed to update password. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Set password for Patient ID: {patid}</Text>

        <TextInput
          placeholder="Enter Password"
          value={password}
        placeholderTextColor="#B0B0B0"
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
          style={styles.input}
        />

        <TextInput
          placeholder="Re-enter Password"
          value={confirmPassword}
          placeholderTextColor="#B0B0B0"
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button title="Confirm" onPress={handleConfirmPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    width: width * 0.9, // 90% of the screen width
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    padding: 20,
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: height * 0.03, // Font size based on screen height
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});

export default PatPassword;
