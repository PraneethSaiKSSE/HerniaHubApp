import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

// Import your local images
import Image6 from './images/doctorslist.jpeg';
import Image7 from './images/download.jpeg';

const { width, height } = Dimensions.get('window');

const AdminDashBoard = ({ navigation }) => {
  const handleDoctorPasswordPress = () => {
    // Navigate to AdminDash.js when the card is pressed
    navigation.navigate('admindash');
  };

  const handlePatientPasswordPress = () => {
    // Navigate to the desired screen when the card is pressed
    navigation.navigate('updatepatpass');
  };

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <TouchableOpacity onPress={handleDoctorPasswordPress} style={styles.cardContainer}>
        <View style={styles.card}>
          <Image source={Image6} style={styles.image6} />
          <Text style={styles.cardText}>SET DOCTOR PASSWORD</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePatientPasswordPress} style={styles.cardContainer}>
        <View style={styles.card}>
          <Image source={Image7} style={styles.image7} />
          <Text style={styles.cardText}>SET PATIENT PASSWORD</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    marginTop: height * 0.1, // Adjust this value to fit your design
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: 2,
    padding: width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.08,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image6: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  image7: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cardText: {
    marginTop: height * 0.01,
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default AdminDashBoard;