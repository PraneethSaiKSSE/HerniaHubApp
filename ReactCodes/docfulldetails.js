import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import config from './config';

const { width, height } = Dimensions.get('window'); // Get screen dimensions for responsiveness

const DocFullDetails = ({ route }) => {
  const { selectedDoctorID, doctorImage } = route.params; // Retrieve passed doctor ID and image URL
  const [doctorDetails, setDoctorDetails] = useState(null); // State to store fetched details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (selectedDoctorID) {
      fetchDoctorDetails(selectedDoctorID);
    }
  }, [selectedDoctorID]);

  const fetchDoctorDetails = async (registrationNumber) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}docfulldet.php?RegistrationNumber=${registrationNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch doctor details');
      }
      const data = await response.json();
      setDoctorDetails(data); // Update state with fetched details
      setLoading(false);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      setError('Failed to load doctor details.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        {doctorImage ? (
          <Image
            source={{ uri: doctorImage }} // Display the image URL
            style={styles.circleImage}
          />
        ) : (
          <Text style={styles.noImage}>No Image</Text>
        )}
      </View>

      <View style={styles.detailsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" /> // Show a loading spinner while data is being fetched
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text> // Display error message if fetching failed
        ) : doctorDetails ? (
          <ScrollView style={styles.scrollView}>
            <Text style={styles.detailText}>Doctor ID: {doctorDetails['Registration Number']}</Text>
            <Text style={styles.detailText}>Doctor Name: {doctorDetails['Name']}</Text>
            <Text style={styles.detailText}>Mobile Number: {doctorDetails['Mobile Number']}</Text>
            <Text style={styles.detailText}>Mail-ID: {doctorDetails['Email-Id']}</Text>
            <Text style={styles.detailText}>Date-Of-Birth: {doctorDetails['DOB']}</Text>
            <Text style={styles.detailText}>Age: {doctorDetails['Age']}</Text>
            <Text style={styles.detailText}>Sex: {doctorDetails['Sex']}</Text>
            <Text style={styles.detailText}>Qualification: {doctorDetails['Qualification']}</Text>
            <Text style={styles.detailText}>Home Address: {doctorDetails['Home Address']}</Text>
            <Text style={styles.detailText}>WorkPlace: {doctorDetails['WorkPlace']}</Text>
            {/* Add more details based on your doctor data structure */}
          </ScrollView>
        ) : (
          <Text style={styles.noDetailsText}>Doctor details not available.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e5e5', // Background color for the container
    padding: width * 0.04, // Responsive padding
  },
  circleContainer: {
    width: width * 0.25, // Adjust size proportionally
    height: width * 0.25, // Adjust size proportionally
    borderRadius: (width * 0.25) / 2, // Circle shape
    backgroundColor: '#cccccc', // Placeholder color
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: width * 0.05, // Space between circle and details
  },
  circleImage: {
    width: '100%',
    height: '100%',
    borderRadius: (width * 0.25) / 2, // Ensure image fits the circle
  },
  noImage: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: width * 0.04, // Responsive padding
    borderRadius: 10,
    width: '90%', // Take up 90% of screen width
    height: '55%', // Max height
  },
  scrollView: {
    flex: 1,
  },
  detailText: {
    fontSize: width * 0.04, // Responsive font size
    marginBottom: width * 0.02, // Space between details
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  noDetailsText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default DocFullDetails;
