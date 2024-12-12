import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import config from './config';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const EditProfile = ({ route, navigation }) => {
  const { doctorDetails } = route.params;
  const [name, setName] = useState(doctorDetails.Name);
  const [dob, setDob] = useState(doctorDetails.DOB);
  const [age, setAge] = useState(doctorDetails.Age);
  const [sex, setSex] = useState(doctorDetails.Sex);
  const [qualification, setQualification] = useState(doctorDetails.Qualification);
  const [regNo, setRegNo] = useState(doctorDetails['Registration Number']);
  const [email, setEmail] = useState(doctorDetails['Email-Id']);
  const [mobile, setMobile] = useState(doctorDetails['Mobile Number']);
  const [address, setAddress] = useState(doctorDetails['Home Address']);
  const [workplace, setWorkplace] = useState(doctorDetails['WorkPlace']);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('Name', name);
      formData.append('DOB', dob);
      formData.append('Age', age);
      formData.append('Sex', sex);
      formData.append('Qualification', qualification);
      formData.append('RegistrationNumber', regNo);
      formData.append('EmailId', email);
      formData.append('MobileNumber', mobile);
      formData.append('HomeAddress', address);
      formData.append('WorkPlace', workplace);

      const response = await fetch(`${config.apiBaseUrl}updatedocprofile.php`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        navigation.goBack(); // Go back to previous screen on success
      } else {
        alert('Error updating profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Sex"
        value={sex}
        onChangeText={setSex}
      />
      <TextInput
        style={styles.input}
        placeholder="Qualification"
        value={qualification}
        onChangeText={setQualification}
      />
      <TextInput
        style={styles.input}
        placeholder="Registration Number"
        value={regNo}
        onChangeText={setRegNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
      />
      <TextInput
        style={styles.input}
        placeholder="Home Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="WorkPlace"
        value={workplace}
        onChangeText={setWorkplace}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: width * 0.05, // Responsive padding
    backgroundColor: '#F5F5F5',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: width * 0.04, // Responsive padding
    marginVertical: height * 0.015, // Responsive margin
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: width * 0.04, // Responsive font size
  },
  saveButton: {
    marginTop: height * 0.03, // Responsive margin
    padding: width * 0.05, // Responsive padding
    backgroundColor: '#007bff', // Blue color for button
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: width * 0.04, // Responsive font size
    fontWeight: 'bold',
  },
});

export default EditProfile;
