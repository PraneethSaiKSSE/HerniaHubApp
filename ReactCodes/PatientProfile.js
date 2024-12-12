import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import config from './config'; 

const { width, height } = Dimensions.get('window');

const PatientProfile = ({ route, navigation }) => {
  const { patientDetails } = route.params;
  const [profilePicUri, setProfilePicUri] = useState(null);

  useEffect(() => {
    if (patientDetails.image) {
      setProfilePicUri(`${config.apiBaseUrl}images/${patientDetails.image}`);
    }
  }, [patientDetails]);

  const handleUpdateProfile = () => {
    navigation.navigate('UpdateProfile', { patientId: patientDetails.patid });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Patient Profile</Text>
        <View style={styles.profilePicContainer}>
          {profilePicUri ? (
            <Image source={{ uri: profilePicUri }} style={styles.profilePic} />
          ) : (
            <View style={styles.profilePicPlaceholder}>
              <Text style={styles.uploadText}>Profile Image</Text>
            </View>
          )}
        </View>
        <View style={styles.detailsContainer}>
          {Object.entries(patientDetails).map(([key, value]) => (
            <View key={key} style={styles.detailItem}>
              <Text style={styles.detailTextLabel}>{key.toUpperCase()}</Text>
              <Text style={styles.detailText}>{value}</Text>
              <View style={styles.separator} />
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* Update Profile Button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: height * 0.05,
    paddingBottom: height * 0.02,
  },
  heading: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  profilePicContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  profilePic: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
  },
  profilePicPlaceholder: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    color: '#fff',
    fontSize: width * 0.05,
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: width * 0.05,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: '90%',
  },
  detailItem: {
    marginBottom: height * 0.02,
  },
  detailTextLabel: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  detailText: {
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
  },
  updateButton: {
    backgroundColor: '#0AB7B7',
    padding: height * 0.02,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: height * 0.02,
  },
  updateButtonText: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});

export default PatientProfile;
