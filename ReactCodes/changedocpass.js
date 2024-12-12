import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Platform, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleConfirm = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    // Implement logic to send new password to your server for update
    console.log('New password:', newPassword);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./images/pass.jpg')} style={styles.headerImage} />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={true} // Make text invisible for passwords
          onChangeText={handleNewPasswordChange}
          value={newPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={true} // Make text invisible for passwords
          onChangeText={handleConfirmPasswordChange}
          value={confirmPassword}
        />
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 20 : 0, // Adjust for Android status bar
    width: width - 40, // Adjust width to fit screen
    alignSelf: 'center',
    backgroundColor: '#fff', // Set background color to white
  },
  headerImage: {
    width: width * 0.45,
    height: width * 0.45,
    marginBottom: height * 0.024,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, // For Android
    width: width - 60, // Adjust width to fit screen
    alignSelf: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
});

export default ChangePassword;
