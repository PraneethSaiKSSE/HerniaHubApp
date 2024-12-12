import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from './config';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const PatientPasswordUpdate = () => {
  const [patientIds, setPatientIds] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Use navigation hook

  useEffect(() => {
    // Fetching data from the backend
    fetch(`${config.apiBaseUrl}patpass.php`) // Replace with the correct backend API endpoint
      .then(response => response.json())
      .then(data => {
        console.log(data); // Logging to see the data structure
        setPatientIds(data); // Set the data to state
        setLoading(false); // Stop loading once data is received
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Unable to fetch patient data.');
        setLoading(false); // Stop loading on error
      });
  }, []);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const filteredPatientIds = patientIds.filter((patientId) => {
    return patientId.patid.toString().includes(searchText);
  });

  const handleSetPasswordPress = (patientId) => {
    // Navigate to the SetPatientPassword screen and pass the patient ID
    navigation.navigate('SetPatientPassword', { patientId: patientId.patid });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search input */}
      <TextInput
        placeholder="Search patient ID"
        placeholderTextColor="#B0B0B0"
        value={searchText}
        onChangeText={handleSearchTextChange}
        style={styles.searchInput}
      />

      {/* Display filtered patient IDs */}
      {filteredPatientIds.length === 0 ? (
        <Text>No patients found.</Text>
      ) : (
        <FlatList
          data={filteredPatientIds}
          renderItem={({ item }) => (
            <View style={styles.patientContainer}>
              <View style={styles.patientIdContainer}>
                <Text style={styles.patientIdLabel}>Patient-ID: </Text>
                <Text>{item.patid}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => handleSetPasswordPress(item)}>
                <Text style={styles.buttonText}>Set Password</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.patid.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // Responsive padding
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 5,
  },
  patientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: width * 0.03, // Responsive padding
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  patientIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientIdLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: height * 0.01, // Responsive padding
    paddingHorizontal: width * 0.05, // Responsive padding
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.04, // Responsive font size
    fontWeight: 'bold',
  },
});

export default PatientPasswordUpdate;
