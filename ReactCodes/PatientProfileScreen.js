import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PatientProfileScreen = ({ route }) => {
  // Extract patientDetails from route.params
  const { patientDetails } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        {/* Display patient details */}
        <Text style={styles.detail}>Patient Name    :    {patientDetails.name}</Text>
        <Text style={styles.detail}>Patient ID           :    {patientDetails.id}</Text>
        <Text style={styles.detail}>Patient Age        :    {patientDetails.age}</Text>
        <Text style={styles.detail}>Patient Gender               :  {patientDetails.gender}</Text>

        <Text style={styles.detail}>Mobile Number :    9701201425</Text>
        <Text style={styles.detail}>Email Id              :    pan@gmail.com</Text>
        {/* Display other patient details as needed */}
        <Text></Text>
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
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: width * 0.05, // Responsive padding
    borderRadius: 10,
    width: width * 0.9, // Responsive width
    height: height * 0.6, // Responsive height
    overflow: 'scroll', // Enable scrolling if content exceeds container height
  },
  detail: {
    marginBottom: height * 0.02, // Responsive margin
    fontSize: width * 0.04, // Responsive font size
    fontWeight: '200',
  },
});

export default PatientProfileScreen;
