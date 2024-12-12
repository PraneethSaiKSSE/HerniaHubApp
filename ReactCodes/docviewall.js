import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import for navigation
import config from './config';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const ViewAll = ({ route }) => {
  const { DoctorIDs, doctorImages } = route.params; // Retrieve passed doctor IDs and images from navigation params

  const [searchText, setSearchText] = useState(''); // State for search bar

  const filteredDoctors = searchText
    ? DoctorIDs.filter((registrationNumber) => registrationNumber.toLowerCase().includes(searchText.toLowerCase()))
    : DoctorIDs; // Filter doctors based on search text

  const navigation = useNavigation(); // Get the navigation object

  
  const onDoctorIDPress = async (registrationNumber) => {
    try {
      // Fetch doctor details based on the registration number
      const response = await fetch(`${config.apiBaseUrl}docdetscroll.php?RegistrationNumber=${registrationNumber}`);
      const doctorDetails = await response.json();
  
      if (doctorDetails.error) {
        // Show an error alert if there was an issue
        Alert.alert("Error", doctorDetails.error);
      } else {
        // Navigate to 'scrollitem' page with both doctor details and images
        navigation.navigate('scrollitem', { 
          doctorDetails, 
          doctorImages // Pass the doctorImages object
        });
      }
    } catch (error) {
      // Log any errors that occur during the fetch
      console.error('Error fetching doctor details:', error);
    }
  };
  


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Doctor ID"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <ScrollView style={styles.scrollView}>
        {filteredDoctors.map((registrationNumber, index) => (
          <TouchableOpacity key={index} style={styles.doctorItem} onPress={() => onDoctorIDPress(registrationNumber)}>
            <View style={styles.circle}>
              {doctorImages[registrationNumber] ? (
                <Image
                  source={{ uri: doctorImages[registrationNumber] }} // Use the URL directly
                  style={styles.circleImage}
                />
              ) : (
                <Text style={styles.noImage}>No Image</Text>
              )}
            </View>
            <Text style={styles.doctorID}>Doctor ID: {registrationNumber}</Text>
          </TouchableOpacity>
        ))}
        {filteredDoctors.length === 0 && (
          <Text style={styles.noResults}>No results found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // 5% of the screen width for padding
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: height * 0.02, // 2% of screen height for padding
    marginBottom: height * 0.015, // 1.5% of screen height for margin
    width: width * 0.9, // 90% of screen width for search bar width
  },
  scrollView: {
    flex: 1,
  },
  doctorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: height * 0.015, // 1.5% of screen height for padding
    marginBottom: height * 0.02, // 2% of screen height for margin between items
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  circle: {
    width: width * 0.15, // Circle's width is 15% of the screen width
    height: width * 0.15, // Circle's height is 15% of the screen width (makes it a perfect circle)
    borderRadius: (width * 0.15) / 2, // Radius to make the circle
    backgroundColor: '#ccc',
    marginRight: width * 0.04, // Margin between image and text (4% of screen width)
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleImage: {
    width: '100%',
    height: '100%',
    borderRadius: (width * 0.15) / 2, // Keep the image circular
  },
  noImage: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.04, // Font size is 4% of screen width
  },
  doctorID: {
    fontSize: width * 0.045, // Font size is 4.5% of screen width
    fontWeight: 'bold',
  },
  noResults: {
    textAlign: 'center',
    marginTop: height * 0.05, // 5% of screen height for no results message
  },
});

export default ViewAll;
