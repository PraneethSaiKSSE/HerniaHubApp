import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from './config';

const { width, height } = Dimensions.get('window');

const RegistrationList = () => {
  const [registrationDetails, setRegistrationDetails] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation(); // Access navigation prop

  useEffect(() => {
    fetchRegistrationNumbers();
  }, []);

  const fetchRegistrationNumbers = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}adminview.php`);
      const data = await response.json();
      console.log('Registration Numbers:', data);
      setRegistrationDetails(data);
    } catch (error) {
      console.error('Error fetching registration numbers:', error);
    }
  };

  const handleRegistrationPress = async (registrationNumber) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}adminview.php?registration_number=${registrationNumber}`);
      const data = await response.json();
      console.log('Registration details:', data);
      // Handle registration details as needed
    } catch (error) {
      console.error('Error fetching registration details:', error);
    }
  };

  const handleSetPassword = (registrationNumber) => {
    // Navigate to SetPass.js with registrationNumber as parameter
    navigation.navigate('setpass', { registrationNumber });
  };

  const filteredRegistrations = registrationDetails.filter(registration =>
    registration.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Doctor by Reg-No"
        placeholderTextColor="#B0B0B0"
        value={searchText}
        onChangeText={setSearchText}
      />
      <ScrollView style={styles.scrollView}>
        {filteredRegistrations.map((registration, index) => (
          <TouchableOpacity key={index} onPress={() => handleRegistrationPress(registration)}>
            <View style={styles.registrationContainer}>
              <Text style={styles.registrationText}>Reg-No: {registration}</Text>
              <TouchableOpacity
                style={styles.setPasswordButton}
                onPress={() => handleSetPassword(registration)}
              >
                <Text style={styles.buttonText}>Set Password</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: height * 0.06,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: width * 0.05,
    marginBottom: height * 0.03,
  },
  scrollView: {
    flex: 1,
  },
  registrationContainer: {
    padding: width * 0.05,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  registrationText: {
    fontSize: width * 0.04,
  },
  setPasswordButton: {
    backgroundColor: '#007BFF',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.035,
    fontWeight: 'bold',
  },
});

export default RegistrationList;