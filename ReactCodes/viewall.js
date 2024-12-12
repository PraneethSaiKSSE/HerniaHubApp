import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window'); // Get screen width and height

const ViewAll = ({ route }) => {
  const { patientIDs, patientImages } = route.params;

  const [searchText, setSearchText] = useState('');

  const filteredPatients = searchText
    ? patientIDs.filter((id) => id.toLowerCase().includes(searchText.toLowerCase()))
    : patientIDs;

  const navigation = useNavigation();

  const onPatientIDPress = (id) => {
    navigation.navigate('patfulldetails',
       { 
        selectedPatientID: id,
        patientImage: patientImages[id]
       });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Patient ID"
        placeholderTextColor="grey"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <ScrollView style={styles.scrollView}>
        {filteredPatients.map((id, index) => (
          <TouchableOpacity key={index} style={styles.patientItem} onPress={() => onPatientIDPress(id)}>
            <View style={styles.circle}>
              {patientImages[id] ? (
                <Image
                  source={{ uri: patientImages[id] }} // Use the URL directly
                  style={styles.circleImage}
                />
              ) : (
                <Text style={styles.noImage}>No Image</Text>
              )}
            </View>
            <Text style={styles.patientID}>Patient ID: {id}</Text>
          </TouchableOpacity>
        ))}
        {filteredPatients.length === 0 && (
          <Text style={styles.noResults}>No results found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // Adjust padding based on screen width
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: height * 0.02, // Adjust padding based on screen height
    marginBottom: height * 0.015, // Adjust margin based on screen height
    borderRadius: width * 0.02, // Dynamic border radius
  },
  scrollView: {
    flex: 1,
  },
  patientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: height * 0.02, // Adjust padding based on screen height
    marginBottom: height * 0.015, // Adjust margin based on screen height
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  circle: {
    width: width * 0.1, // Dynamic size based on screen width
    height: width * 0.1, // Keep width and height the same to maintain a circle
    borderRadius: (width * 0.1) / 2, // Make it circular
    backgroundColor: '#ccc',
    marginRight: width * 0.04, // Adjust space between image and text
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleImage: {
    width: '100%',
    height: '100%',
    borderRadius: (width * 0.1) / 2, // Keep the image circular
  },
  patientID: {
    fontSize: height * 0.022, // Adjust font size based on screen height
    fontWeight: 'bold',
  },
  noResults: {
    textAlign: 'center',
    marginTop: height * 0.02, // Adjust margin based on screen height
    fontSize: height * 0.022, // Adjust font size
  },
  noImage: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: height * 0.015, // Adjust font size for 'No Image' text
  },
});

export default ViewAll;
