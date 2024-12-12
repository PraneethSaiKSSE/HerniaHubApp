import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import config from './config';

export default function AddPatient() {
  const navigation = useNavigation();
  const route = useRoute();
  const { registrationNumber } = route.params; // Extract Registration Number from route params

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [patient, setPatient] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    phoneNumber: '',
    email: '',
    loginId: '',
    password: '',
    confirmPassword: '',
    image: null,
  });

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        maxHeight: 200,
        maxWidth: 200,
        quality: 1,
      }, (response) => {
        if (response.didCancel) {
          console.log('Image selection canceled.');
        } else if (response.errorCode) {
          console.error('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setPatient({ ...patient, image: response.assets[0].uri });
        }
      });
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!patient.name.trim() || !patient.phoneNumber.trim() || !patient.age.trim() || !patient.gender.trim() || !patient.address.trim() || !patient.password.trim() || !patient.confirmPassword.trim()) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }

      if (patient.password !== patient.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(patient.phoneNumber)) {
        Alert.alert('Error', 'Please enter a valid phone number.');
        return;
      }

      const formData = new FormData();
      formData.append('name', patient.name);
      formData.append('age', patient.age);
      formData.append('gender', patient.gender);
      formData.append('address', patient.address);
      formData.append('phoneNumber', patient.phoneNumber);
      formData.append('email', patient.email);
      formData.append('loginId', patient.loginId);
      formData.append('password', patient.password);
      formData.append('confirmPassword', patient.confirmPassword);
      formData.append('registrationNumber', registrationNumber); // Ensure registrationNumber is included
      if (patient.image) {
        formData.append('image', {
          uri: patient.image,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
      }

      const response = await fetch(`${config.apiBaseUrl}patientdetails.php`, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        setPatient({
          name: '',
          age: '',
          gender: '',
          address: '',
          phoneNumber: '',
          email: '',
          loginId: '',
          password: '',
          confirmPassword: '',
          image: null,
        });
        console.log('Form submitted successfully.');
      } else {
        console.error('Form submission failed:', responseData.message);
      }
    } catch (error) {
      console.error('Submission Error:', error);
    }
  };

  return (
    <View style={styles.container}>
     
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
            {patient.image ? (
              <Image source={{ uri: patient.image }} style={styles.profileImage} />
            ) : (
              <Ionicons name="person-circle-outline" size={Dimensions.get('window').width * 0.5} color="#CCCCCC" />
            )}
          </TouchableOpacity>
          <Text style={styles.uploadText}>Upload image</Text>
        </View>
        
        {/* Form Details Container */}
        <View style={styles.formDetailsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#D3D3D3"
            onChangeText={(text) => setPatient({ ...patient, name: text })}
            value={patient.name}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#D3D3D3"
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9]/g, '');
              setPatient({ ...patient, phoneNumber: numericText });
            }}
            value={patient.phoneNumber}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#D3D3D3"
            placeholder="Age"
            onChangeText={(text) => setPatient({ ...patient, age: text })}
            value={patient.age}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#D3D3D3"
            placeholder="Gender"
            onChangeText={(text) => setPatient({ ...patient, gender: text })}
            value={patient.gender}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#D3D3D3"
            placeholder="Address"
            onChangeText={(text) => setPatient({ ...patient, address: text })}
            value={patient.address}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#D3D3D3"
            onChangeText={(text) => setPatient({ ...patient, email: text })}
            value={patient.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Login ID"
            placeholderTextColor="#D3D3D3"
            onChangeText={(text) => setPatient({ ...patient, loginId: text })}
            value={patient.loginId}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#D3D3D3"
            onChangeText={(text) => setPatient({ ...patient, password: text })}
            secureTextEntry={true}
            value={patient.password}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={(text) => setPatient({ ...patient, confirmPassword: text })}
            secureTextEntry={true}
            placeholderTextColor="#D3D3D3"
            value={patient.confirmPassword}
          />
        </View>
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
 
  
  uploadText: {
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: '700',
    color: '#000000',
    bottom: Dimensions.get('window').height * 0.038,
    left: Dimensions.get('window').height * 0.0,
  },
  formDetailsContainer: {
    backgroundColor: '#F9F9F9', // Light grey background for contrast
    padding: Dimensions.get('window').height * 0.019,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginVertical: -Dimensions.get('window').height * 0.035,
    width: '90%',
    alignSelf: 'center',
  },
  
  scrollContent: {
    alignItems: 'center',
    paddingTop: Dimensions.get('window').height * 0.1,
    paddingBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: (Dimensions.get('window').width * 0.5) / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2DC2D7',
    overflow: 'hidden',
    alignSelf: 'center',
    top: Dimensions.get('window').height * -0.05,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: Dimensions.get('window').height * 0.05,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BABACC',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    marginBottom: Dimensions.get('window').height * 0.013,
    bottom: Dimensions.get('window').height * -0.02,
    alignSelf: 'center',
    justifyContent: 'center', // Center text vertically
  },
  submitButton: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.06,
    backgroundColor: '#0AB7B7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.06,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});