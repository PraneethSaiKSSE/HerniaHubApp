import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import config from './config';

const SendReports = ({ route, navigation }) => {
  const { selectedPatientID, registrationNumber } = route.params; // Retrieve passed parameters
  const [clinicalPhoto, setClinicalPhoto] = useState(null);
  const [labInvestigationPhoto, setLabInvestigationPhoto] = useState(null);
  const [radiologyReportPhoto, setRadiologyReportPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = (setImage) => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleSend = async () => {
    if (!clinicalPhoto || !labInvestigationPhoto || !radiologyReportPhoto) {
      Alert.alert('Missing Images', 'Please select all the images before sending.');
      return;
    }

    const formData = new FormData();
    formData.append('patid', selectedPatientID);
    formData.append('docid', registrationNumber);
    formData.append('cpic', {
      uri: clinicalPhoto,
      name: 'clinical_photo.jpg',
      type: 'image/jpeg',
    });
    formData.append('lpic', {
      uri: labInvestigationPhoto,
      name: 'lab_investigation_photo.jpg',
      type: 'image/jpeg',
    });
    formData.append('rpic', {
      uri: radiologyReportPhoto,
      name: 'radiology_report_photo.jpg',
      type: 'image/jpeg',
    });

    try {
      setUploading(true);
      const response = await axios.post(`${config.apiBaseUrl}reports.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 'success') {
        Alert.alert('Success', 'Reports have been sent successfully.');
        navigation.goBack(); // Go back to the previous screen after sending the reports
      } else {
        Alert.alert('Error', response.data.message || 'Failed to send reports. Please try again.');
      }
    } catch (error) {
      console.error('Error sending reports:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Send Reports</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage(setClinicalPhoto)}>
        {clinicalPhoto ? (
          <Image source={{ uri: clinicalPhoto }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Send Clinical Photo</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage(setLabInvestigationPhoto)}>
        {labInvestigationPhoto ? (
          <Image source={{ uri: labInvestigationPhoto }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Send Lab Investigation Photo</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage(setRadiologyReportPhoto)}>
        {radiologyReportPhoto ? (
          <Image source={{ uri: radiologyReportPhoto }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Send Radiology Report Photo</Text>
        )}
      </TouchableOpacity>

      {uploading ? (
        <ActivityIndicator size="large" color="#2DC2D7" />
      ) : (
        <Button title="Send" onPress={handleSend} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagePicker: {
    height: 200,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  placeholderText: {
    color: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default SendReports;
