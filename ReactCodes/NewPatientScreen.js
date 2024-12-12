import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


import ImagePicker from 'react-native-image-picker';



const NewPatientScreen = ({ navigation }) => {
  const [complaints, setComplaints] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [photo, setPhoto] = useState(null); // State to store uploaded photo

  const handleSubmission = () => {
    // Logic for submitting form
    console.log('Complaints:', complaints);
    console.log('Selected Doctor:', selectedDoctor);
    console.log('Uploaded Photo:', photo);
  };

  const handleImagePicker = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setPhoto(response.uri);
      }
    });
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.heading}>Hello Patient</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your complaints"
        value={complaints}
        onChangeText={setComplaints}
        multiline={true}
      />
      {/* Upload option for relevant clinical photo */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
        <Text style={styles.buttonText}>Upload Clinical Photo</Text>
      </TouchableOpacity>
      {/* Display selected photo if available */}
      {photo && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageText}>Selected Photo:</Text>
          <Image source={{ uri: photo }} style={styles.image} />
        </View>
      )}
      {/* Dropdown list for informing doctor */}
      <Text style={styles.label}>Inform Doctor</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDoctor}
          onValueChange={(itemValue, itemIndex) => setSelectedDoctor(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Doctor" value="" />
          {[...Array(10)].map((_, index) => (
            <Picker.Item key={index} label={`Doctor ${index + 1}`} value={`doctor${index + 1}`} />
          ))}
        </Picker>
      </View>
      {/* Submit button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmission}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: '#ffffff',
    
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: '80%',
    height: 100,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    marginRight: 75,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 40,
    alignSelf: 'flex-start', // Aligns the label to the left
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: '80%',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  imageText: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
export default NewPatientScreen;


