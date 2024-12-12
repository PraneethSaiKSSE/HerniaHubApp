import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import config from './config';

const { width, height } = Dimensions.get('window'); // Get screen width and height

const PatientDetails = (props) => {
  const [selectedTab, setSelectedTab] = useState('treated');
  const [patientDetails, setPatientDetails] = useState(null);
  const [isFullDetailsVisible, setIsFullDetailsVisible] = useState(false); // State for toggling full details
  const { registrationNumber } = props.route.params;

  useEffect(() => {
    fetchPatientDetails();
  }, [selectedTab]);

  const fetchPatientDetails = async () => {
    try {
      const url = selectedTab === 'treated'
       ? `${config.apiBaseUrl}yesdetails.php`
       : `${config.apiBaseUrl}nodetails.php`; // Update this URL based on tab

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationNumber }),
      });

      const data = await response.json();
      setPatientDetails(data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const toggleFullDetails = () => {
    setIsFullDetailsVisible(!isFullDetailsVisible);
  };

  const treatedDetails = patientDetails ? (
    <View style={styles.detailsContainer}>
      <ScrollView>
        <View style={styles.imageContainer}>
          {patientDetails.pic ? (
            <Image
              source={{ uri: `${config.apiBaseUrl}uploaded_images/${patientDetails.pic}` }}
              style={styles.fullImage}
            />
          ) : (
            <Text>No Image</Text>
          )}
        </View>
        <Text style={styles.detailsText}>Patient ID: {patientDetails.pid}</Text>
        <Text style={styles.detailsText}>Operation Date: {patientDetails.date}</Text>
        {isFullDetailsVisible && (
          <>
            <Text style={styles.detailsText}>Complaints: {patientDetails.comp}</Text>
            <Text style={styles.detailsText}>Additional Complaints: {patientDetails.comps}</Text>
            <Text style={styles.detailsText}>Doctor Name: {patientDetails.dname}</Text>
          </>
        )}
        <TouchableOpacity onPress={toggleFullDetails} style={styles.fullDetailsButton}>
          <Text style={styles.fullDetailsButtonText}>
            {isFullDetailsVisible ? 'Hide Full Details' : 'View Full Details'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  ) : (
    <Text>Loading...</Text>
  );

  const notTreatedDetails = patientDetails ? (
    <View style={styles.detailsContainer}>
      <ScrollView>
        <View style={styles.imageContainer}>
          {patientDetails.pic ? (
            <Image
              source={{ uri: `${config.apiBaseUrl}uploads/${patientDetails.pic}` }}
              style={styles.fullImage}
            />
          ) : (
            <Text>No Image</Text>
          )}
        </View>
        <Text style={styles.detailsText}>Patient ID: {patientDetails.pid}</Text>
        <Text style={styles.detailsText}>Complaints: {patientDetails.comp}</Text>
      </ScrollView>
    </View>
  ) : (
    <Text>Loading...</Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.treatedButton, selectedTab === 'treated' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setSelectedTab('treated')}
        >
          <Text style={[styles.buttonText, selectedTab === 'treated' && styles.activeButtonText]}>Treated</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.notTreatedButton, selectedTab === 'notTreated' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setSelectedTab('notTreated')}
        >
          <Text style={[styles.buttonText, selectedTab === 'notTreated' && styles.activeButtonText]}>Not Treated</Text>
        </TouchableOpacity>
      </View>
      {selectedTab === 'treated' ? treatedDetails : notTreatedDetails}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8, // 80% of screen width
    marginTop: 15,
  },
  button: {
    flex: 1,
    paddingVertical: height * 0.02, // Adjust button height based on screen height
    borderRadius: 5,
    alignItems: 'center',
  },
  treatedButton: {
    backgroundColor: '#28a745', // Green
    marginRight: 10,
  },
  notTreatedButton: {
    backgroundColor: '#dc3545', // Red
    marginLeft: 10,
  },
  inactiveButton: {
    backgroundColor: '#6c757d', // Grey for inactive state
  },
  activeButton: {
    backgroundColor: '#0056b3', // Different active color if needed
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045, // Font size adjusts with screen width
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: '#e0e0e0',
  },
  detailsContainer: {
    marginTop: 20,
    padding: width * 0.05, // Padding adjusts with screen width
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    width: width * 0.9, // 90% of screen width
    alignItems: 'center',
  },
  detailsText: {
    fontSize: width * 0.045, // Text size adjusts with screen width
    marginBottom: 10,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.25, // Adjust image container height
    marginBottom: 20,
    backgroundColor: 'white', // Background for the image container
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Adjust the image to fit the container
  },
  fullDetailsButton: {
    marginTop: 10,
    padding: height * 0.015, // Button padding based on screen height
    backgroundColor: '#007bff', // Blue color for button
    borderRadius: 5,
  },
  fullDetailsButtonText: {
    color: '#fff',
    fontSize: width * 0.04, // Adjust text size based on screen width
    fontWeight: 'bold',
  },
});

export default PatientDetails;
