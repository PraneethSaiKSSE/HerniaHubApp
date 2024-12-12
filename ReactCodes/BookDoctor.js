import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Image10 from './images/doctor.png';
import config from './config';

const { width, height } = Dimensions.get('window'); // Get device width and height

const BookDoctor = ({ route }) => {
  const { date, time, patid } = route.params; // Retrieve the date, time, and id parameters
  const [doctors, setDoctors] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}bookdoctor.php`);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleBookNow = async (doctorId) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}appt.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,  // Date already in the correct format (yyyy-mm-dd)
          time: time,  // Time already in the correct format (HH:mm)
          patid: patid,   // Patient ID from route params
          did: doctorId,  // Doctor ID from the doctor object
        }),
      });

      const result = await response.text();
      Alert.alert("Appointment Booked", result);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {doctors.map((doctor, index) => (
        <View key={index} style={styles.doctorCard}>
          <Image source={Image10} style={styles.profileIcon} />
          <View style={styles.detailsContainer}>
            <Text style={styles.doctorName}>{doctor.Name}</Text>
            <Text style={styles.doctorInfo}>ID: {doctor['Registration Number']}</Text>
            <Text style={styles.doctorInfo}>Qualification: {doctor.Qualification}</Text>
            <Text style={styles.doctorInfo}>Work Place: {doctor.WorkPlace}</Text>
            <View style={styles.buttonContainer}>
             
              <TouchableOpacity style={styles.button} onPress={() => handleBookNow(doctor['Registration Number'])}>
                <Text style={styles.buttonText}>BOOK NOW</Text>
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
    padding: width * 0.05, // Padding based on screen width
    backgroundColor: '#fff',
  },
  doctorCard: {
    flexDirection: 'row',
    marginBottom: height * 0.03, // Adjusted margin based on screen height
    padding: height * 0.02, // Adjusted padding based on screen height
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  profileIcon: {
    width: width * 0.12, // Adjusted image size based on screen width
    height: width * 0.12, // Adjusted height
    marginRight: width * 0.04, // Adjusted margin
  },
  detailsContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: width * 0.045, // Dynamic font size based on screen width
    fontWeight: 'bold',
    marginBottom: height * 0.01, // Adjusted margin based on screen height
  },
  doctorInfo: {
    fontSize: width * 0.04, // Adjusted font size
    marginBottom: height * 0.01, // Adjusted margin
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02, // Adjusted margin
  },
  button: {
    backgroundColor: '#0AB7B7',
    padding: height * 0.018,
    paddingHorizontal:width*0.16, // Adjusted padding based on screen height
    borderRadius: 5,
    marginLeft:-width*0.03,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04, // Dynamic font size
    textAlign: 'center',
  },
});

export default BookDoctor;
