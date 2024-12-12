import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';

import axios from 'axios';
import config from './config';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const DocSignUp = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [qualification, setQualification] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // Handle the form submission
  const handleContinue = async () => {
    if (!name || !dob || !age || !sex || !qualification || !registrationNumber || !email || !mobileNumber || !homeAddress || !workplace) {
      Alert.alert('All fields are required.');
      return;
    }

    if (!profileImage) {
      Alert.alert('Please select a profile image.');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('dob', dob);
    formData.append('age', age);
    formData.append('sex', sex);
    formData.append('qualification', qualification);
    formData.append('registrationNumber', registrationNumber);
    formData.append('email', email);
    formData.append('mobileNumber', mobileNumber);
    formData.append('homeAddress', homeAddress);
    formData.append('workplace', workplace);

    // Append the image file
    const uri = profileImage;
    const filename = uri.split('/').pop();
    const type = `image/${filename.split('.').pop()}`;
    
    formData.append('dpic', {
      uri,
      name: filename,
      type,
    });

    // Make the API request
    try {
      const response = await fetch(`${config.apiBaseUrl}project.php`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Registration Response:', result);
      showAlert(result.message);
    } catch (error) {
      console.error('Registration Error:', error);
      showAlert('Registration failed. Please try again.');
    }
  };

  // Pick a profile image from the library
  const pickProfileImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo', // to ensure images are picked
        includeBase64: false, // option to include base64
        selectionLimit: 1, // if you want to limit selection to 1
        quality: 1, // for best quality
      });
    
      if (!result.didCancel && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setProfileImage(selectedImage.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  // Show alert message
  const showAlert = (message) => {
    Alert.alert('Registration', message);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.subtitle}>Kindly fill the following details for signing up:</Text>

        {/* Profile Image Section */}
        <TouchableOpacity style={styles.circleContainer} onPress={pickProfileImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Text style={styles.circleText}>Select Image</Text>
          )}
        </TouchableOpacity>

        {/* Form Inputs */}
        <View style={styles.formContainer}>
          <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#B0B0B0" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="DOB" placeholderTextColor="#B0B0B0" value={dob} onChangeText={setDob} />
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={[styles.picker, { color: sex ? 'black' : '#B0B0B0' }]}
                selectedValue={sex}
                onValueChange={(itemValue) => setSex(itemValue)}
              >
                <Picker.Item label="Select Gender" value="" color="#B0B0B0"/>
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
          </View>

          <TextInput style={styles.input} placeholder="Age" placeholderTextColor="#B0B0B0" value={age} onChangeText={setAge} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Qualification" placeholderTextColor="#B0B0B0" value={qualification} onChangeText={setQualification} />
          <TextInput style={styles.input} placeholder="Registration Number" placeholderTextColor="#B0B0B0" value={registrationNumber} onChangeText={setRegistrationNumber} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Email-Id" placeholderTextColor="#B0B0B0" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Mobile Number" placeholderTextColor="#B0B0B0" value={mobileNumber} onChangeText={setMobileNumber} keyboardType="phone-pad" />
          <TextInput style={styles.input} placeholder="Home Address" placeholderTextColor="#B0B0B0" value={homeAddress} onChangeText={setHomeAddress} />
          <TextInput style={styles.input} placeholder="Workplace" placeholderTextColor="#B0B0B0" value={workplace} onChangeText={setWorkplace} />

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: width * 0.05, // Responsive padding
    paddingTop: height * 0.05, // Responsive padding
  },
  subtitle: {
    fontSize: width * 0.05, // Responsive font size
    marginBottom: height * 0.02, // Responsive margin
    textAlign: 'center',
  },
  circleContainer: {
    width: width * 0.3, // Responsive width
    height: width * 0.3, // Responsive height
    borderRadius: (width * 0.3) / 2, // Responsive border radius
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02, // Responsive margin
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: (width * 0.3) / 2, // Responsive border radius
  },
  circleText: {
    color: '#555',
    fontSize: width * 0.04, // Responsive font size
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: height * 0.06, // Responsive height
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: height * 0.02, // Responsive margin
    paddingHorizontal: width * 0.04, // Responsive padding
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02, // Responsive margin
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  label: {
    marginRight: width * 0.02, // Responsive margin
    paddingHorizontal: width * 0.02, // Responsive padding
  },
  pickerContainer: {
    flex: 1,
    height: height * 0.07, // Responsive height
  },
  picker: {
    flex: 1,
  },
  continueButton: {
    backgroundColor: 'blue',
    paddingVertical: height * 0.016, // Responsive padding
    borderRadius: 5,
    marginBottom: height * 0.03,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.045, // Responsive font size
  },
});

export default DocSignUp;
