import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import config from './config';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const App = ({ route }) => {
  const [complaint, setComplaint] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState('');
  const [headerImage, setHeaderImage] = useState('https://example.com/your-image.jpg'); // Replace with your image URL
  const [uploading, setUploading] = useState(false);

  const { patid } = route.params; // Extract patient ID from route parameters

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}docnames.php`);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.error('ImagePicker Error: ', response.error);
        } else {
          const selectedImage = response.assets[0];
          setImageUri(selectedImage.uri);
          const imageUriParts = selectedImage.uri.split('/');
          setImageName(imageUriParts[imageUriParts.length - 1]);
        }
      }
    );
  };

  const handleSubmit = async () => {
    console.log('Complaint:', complaint);
    console.log('Selected Doctor:', selectedDoctor);
    console.log('Image URI:', imageUri);

    if (!imageUri) {
      Alert.alert('No Image Selected', 'Please select an image to upload.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('pid', patid);  // Use patient ID from route params
    formData.append('comp', complaint);
    formData.append('dname', selectedDoctor);
    formData.append('image', {
      uri: imageUri,
      name: imageName,
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post(`${config.apiBaseUrl}no.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);
      if (response.data.status === 'success') {
        Alert.alert('Upload Success', 'Report uploaded successfully.');
      } else {
        Alert.alert('Upload Error', response.data.message || 'Failed to upload report.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload Error', 'Failed to upload report.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: headerImage }} style={styles.headerImage} />
      <View style={styles.inputContainer}>
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            placeholder="Enter Complaints"
            placeholderTextColor="#B0B0B0"
            value={complaint}
            onChangeText={setComplaint}
          />
        </View>
        <View style={styles.box}>
          {!imageUri && (
            <TouchableOpacity style={styles.uploadHolder} onPress={pickImage}>
              <Icon name="cloud-upload" size={width * 0.05} color="black" style={styles.uploadIcon} />
              <Text style={styles.uploadHolderText}>
                {imageName ? `Selected: ${imageName}` : 'Upload Clinical Pic'}
              </Text>
            </TouchableOpacity>
          )}
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          )}
        </View>
        <View style={styles.box}>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => setSelectedDoctor(value)}
            items={doctors}
            placeholder={{ label: "Select Doctor", value: null }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      {uploading && <ActivityIndicator size="large" color="#0AB7B7" />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: width * 0.05, // 5% of screen width
    backgroundColor: 'white',
    marginTop:-height*0.2,
  },
  headerImage: {
    width: '100%',
    height: height * 0.25, // 25% of screen height
    marginBottom: height * 0.02, // 2% of screen height
  },
  inputContainer: {
    marginBottom: height * 0.03, // 3% of screen height
    padding: width * 0.05, // 5% of screen width
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: 'lightgrey',
  },
  box: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: height * 0.02, // 2% of screen height
    padding: width * 0.04, // 4% of screen width
  },
  input: {
    height: height * 0.05, // 5% of screen height
    paddingHorizontal: width * 0.03, // 3% of screen width
  },
  uploadHolder: {
    flexDirection: 'row',
    height: height * 0.1, // 10% of screen height
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  uploadIcon: {
    marginRight: width * 0.02, // 2% of screen width
    color: 'black',
  },
  uploadHolderText: {
    color: 'black',
    fontSize: width * 0.04, // 4% of screen width
  },
  submitButton: {
    backgroundColor: '#0AB7B7',
    borderRadius: 5,
    height: height * 0.07, // 7% of screen height
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02, // 2% of screen height
  },
  submitButtonText: {
    color: '#fff',
    fontSize: width * 0.04, // 4% of screen width
  },
  imagePreview: {
    marginTop: height * 0.01, // 1% of screen height
    width: width * 0.5, // 50% of screen width
    height: height * 0.2, // 20% of screen height
    borderRadius: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: height * 0.06, // 5% of screen height
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
    paddingHorizontal: width * 0.03, // 3% of screen width
  },
  inputAndroid: {
    height: height * 0.07, // 5% of screen height
    borderColor: '#ccc',
    borderWidth: 1,
    color: 'black',
    borderRadius: 5,
    paddingHorizontal: width * 0.03, // 3% of screen width
  },
});

export default App;
