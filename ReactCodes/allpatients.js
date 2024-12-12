import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from './config';

const { width, height } = Dimensions.get('window'); // Get screen width and height

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  const navigation = useNavigation(); // Hook to get navigation

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}patdet2.php`);
        const data = await response.json();
        setPatients(data);
        setFilteredPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const filterPatients = () => {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = patients.filter(patient =>
        patient.patid.toString().includes(lowercasedQuery) ||
        patient.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredPatients(filtered);
    };

    filterPatients();
  }, [searchQuery, patients]);

  const handleViewDetails = (patid) => {
    navigation.navigate('Patientdata', { patid }); // Navigate to Patientdata screen with id parameter
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search patient by ID/Name"
        placeholderTextColor="#B0B0B0"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredPatients.map((patient) => (
        <View key={patient.patid} style={styles.patientContainer}>
          <View style={styles.imageAndDetails}>
            <View style={styles.imageContainer}>
              {patient.image ? (
                <Image
                  source={{ uri: `${config.apiBaseUrl}images/${patient.image}` }}
                  style={styles.image}
                />
              ) : (
                <Text>No Image</Text>
              )}
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.patientText}>Patient ID: {patient.patid}</Text>
              <Text style={styles.patientText}>Patient Name: {patient.name}</Text>
              <TouchableOpacity onPress={() => handleViewDetails(patient.patid)}>
                <Text style={styles.viewDetails}>View Full Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: width * 0.05, // Adjust padding based on screen width
    backgroundColor: '#F5F5F5',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: height * 0.02, // Adjust padding based on screen height
    marginVertical: height * 0.01,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  patientContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: height * 0.02, // Adjust padding based on screen height
    marginVertical: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  imageAndDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    height: height * 0.1, // Adjust image container size based on screen height
    width: height * 0.1, // Keep it square
    borderRadius: (height * 0.1) / 2, // Make it circular
    overflow: 'hidden',
    marginRight: width * 0.04, // Space between image and details
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
  },
  patientText: {
    fontSize: height * 0.022, // Adjust font size based on screen height
    marginVertical: height * 0.01,
  },
  viewDetails: {
    fontSize: height * 0.022,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: height * 0.01,
  },
});

export default PatientList;
