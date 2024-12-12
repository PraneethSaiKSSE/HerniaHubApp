import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button, TouchableOpacity, Linking } from 'react-native';
import config from './config'; 

const PatFullDetails = ({ route, navigation }) => {
  const { selectedPatientID, registrationNumber, patientImage } = route.params; // Retrieve passed patient ID and registration number
  const [patientDetails, setPatientDetails] = useState(null); // State to store fetched details

  useEffect(() => {
    if (selectedPatientID) {
      fetchPatientDetails(selectedPatientID);
    }
  }, [selectedPatientID]);

  const fetchPatientDetails = async (patid) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}patientfulldet.php?patid=${patid}`); // Assuming the server-side script is a PHP file
      const data = await response.json();
      setPatientDetails(data); // Update state with fetched details
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const handleSendConsultationNotes = () => {
    navigation.navigate('ConsultationNotes', { selectedPatientID, registrationNumber });
  };

  const handleSendReports = () => {
    navigation.navigate('SendReports', { selectedPatientID, registrationNumber });
  };

  const handleChatWithPatient = () => {
    if (patientDetails && patientDetails.mob) {
      const whatsappUrl = `whatsapp://send?phone=${patientDetails.mob}&text=Hi! I am your doctor`;
      Linking.openURL(whatsappUrl).catch(() => {
        alert('Make sure WhatsApp is installed on your device.');
      });
    } else {
      alert('Patient contact number is not available.');
    }
  };

  return (
    <View style={styles.container}>
      {patientDetails ? (
        <ScrollView style={styles.scrollView}>
          <View style={styles.circleContainer}>
            {patientImage ? (
              <Image
                source={{ uri: patientImage }} // Display the image URL
                style={styles.circleImage}
              />
            ) : (
              <Text style={styles.noImage}>No Image</Text>
            )}
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Patient ID      :     {patientDetails.patid}</Text>
            <Text style={styles.detailText}>Name            :     {patientDetails.name}</Text>
            <Text style={styles.detailText}>Age               :     {patientDetails.age}</Text>
            <Text style={styles.detailText}>Gender         :     {patientDetails.gender}</Text>
            <Text style={styles.detailText}>Contact        :     {patientDetails.mob}</Text>
            <Text style={styles.detailText}>Mail              :     {patientDetails.mail}</Text>
            <Text style={styles.detailText}>Address       :     {patientDetails.address}</Text>
            {/* Add more details based on your patient data structure */}
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <Button title="Send Consultation Notes" onPress={handleSendConsultationNotes} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="Send Reports" onPress={handleSendReports} />
            </View>
            <View style={styles.buttonWrapper}>
              {/* Chat with Patient Button */}
              <TouchableOpacity style={styles.whatsappButton} onPress={handleChatWithPatient}>
                <Image
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' }} // WhatsApp logo from URL or your local image asset
                  style={styles.whatsappLogo}
                />
                <Text style={styles.whatsappText}>Chat with Patient</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.loadingText}>Loading patient details...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  circleContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 100,
    marginBottom: 20,
  },
  circleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
  },
  detailsContainer: {
    backgroundColor: 'lightgrey',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    padding: 10,
    borderRadius: 5,
  },
  whatsappLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  whatsappText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 60,
  },
});

export default PatFullDetails;
