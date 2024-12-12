import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import config from './config';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const UpdateProfile = ({ route, navigation }) => {
  const { patientId } = route.params; // Retrieve the patientId passed from the previous screen
  
  // Initialize state for each field
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mob, setMob] = useState('');
  const [mail, setMail] = useState('');

  const handleUpdateProfile = () => {
    // Basic validation (optional)
    if (!name || !address || !mob || !mail) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    // Backend request to update the profile
    fetch(`${config.apiBaseUrl}update_profile.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patid: patientId,  // Pass patientId to identify the record
        name,
        address,
        mob,
        mail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Alert.alert('Success', 'Profile updated successfully');
          navigation.goBack(); // Go back to the previous screen
        } else {
          Alert.alert('Error', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred while updating the profile.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Profile</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      {/* Address Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Address"
        value={address}
        onChangeText={setAddress}
      />

      {/* Mobile Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        value={mob}
        onChangeText={setMob}
        keyboardType="phone-pad"
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={mail}
        onChangeText={setMail}
        keyboardType="email-address"
      />

      {/* Confirm Button */}
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: width * 0.05, // Responsive padding
  },
  heading: {
    fontSize: width * 0.07, // Responsive font size
    fontWeight: 'bold',
    marginBottom: height * 0.03, // Responsive margin
  },
  input: {
    width: '100%',
    padding: width * 0.04, // Responsive padding
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: width * 0.03, // Responsive border radius
    marginBottom: height * 0.02, // Responsive margin
  },
  button: {
    backgroundColor: '#0AB7B7',
    padding: width * 0.04, // Responsive padding
    borderRadius: width * 0.03, // Responsive border radius
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.05, // Responsive font size
    fontWeight: 'bold',
  },
});

export default UpdateProfile;
