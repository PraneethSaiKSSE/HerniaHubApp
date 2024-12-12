import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import config from './config';

const DoctorDetails = ({ route, navigation }) => {
  const { doctorDetails } = route.params;
  const [image, setImage] = useState(null); // State to store fetched image URL

  useEffect(() => {
    if (doctorDetails.dpic) {
      // Construct the image URL based on the backend path
      const imageUrl = `${config.apiBaseUrl}uploads/${doctorDetails.dpic}`;
      setImage(imageUrl);
    }
  }, [doctorDetails]);

  const handleEdit = () => {
    navigation.navigate('editprofile', { doctorDetails });
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.uploadText}>No Image</Text>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.text}>Name: {doctorDetails.Name}</Text>
        <Text style={styles.text}>DOB: {doctorDetails.DOB}</Text>
        <Text style={styles.text}>Age: {doctorDetails.Age}</Text>
        <Text style={styles.text}>Gender: {doctorDetails.Sex}</Text>
        <Text style={styles.text}>Qualification: {doctorDetails.Qualification}</Text>
        <Text style={styles.text}>Reg-No: {doctorDetails['Registration Number']}</Text>
        <Text style={styles.text}>Mail: {doctorDetails['Email-Id']}</Text>
        <Text style={styles.text}>Mobile Number: {doctorDetails['Mobile Number']}</Text>
        <Text style={styles.text}>Home Address: {doctorDetails['Home Address']}</Text>
        <Text style={styles.text}>WorkPlace: {doctorDetails['WorkPlace']}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
    backgroundColor: '#F5F5F5',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    resizeMode: 'cover',
  },
  editButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff', // Blue color for button
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  uploadText: {
    color: '#666',
    fontSize: 16,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    width: '90%',
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
  },
});

export default DoctorDetails;
