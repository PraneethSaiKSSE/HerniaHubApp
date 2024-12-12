import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import config from './config'; 

const { width, height } = Dimensions.get('window');

const PatientDetails = ({ route }) => {
  const { patid } = route.params;
  const [patientDetails, setPatientDetails] = useState(null);

  useEffect(() => {
    // Fetch patient details by ID
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}patientdata.php?patid=${patid}`);
        const data = await response.json();
        setPatientDetails(data);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [patid]);

  if (!patientDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{patientDetails.name}</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Age</Text>
        <Text style={styles.value}>{patientDetails.age}</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Gender</Text>
        <Text style={styles.value}>{patientDetails.gender}</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{patientDetails.address}</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Mobile</Text>
        <Text style={styles.value}>{patientDetails.mob}</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{patientDetails.mail}</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.detailContainer}>
        <Text style={styles.label}>ID</Text>
        <Text style={styles.value}>{patientDetails.patid}</Text>
      </View>
      <View style={styles.line} />

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Registration Number</Text>
        <Text style={styles.value}>{patientDetails.RegistrationNumber}</Text>
      </View>
      <View style={styles.line} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    padding: width * 0.05, // Responsive padding
  },
  detailContainer: {
    paddingVertical: height * 0.02, // Responsive padding
  },
  label: {
    fontSize: width * 0.05, // Responsive font size
    fontWeight: 'bold',
    marginBottom: height * 0.01, // Responsive margin
  },
  value: {
    fontSize: width * 0.04, // Responsive font size
    color: '#333',
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: height * 0.02, // Responsive margin
  },
});

export default PatientDetails;
