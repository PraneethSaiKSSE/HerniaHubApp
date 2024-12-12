import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import config from './config';

// Get device width and height
const { width, height } = Dimensions.get('window');

const CheckAppointmentsScreen = ({ route, navigation }) => {
  const { registrationNumber } = route.params;
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const url = `${config.apiBaseUrl}patappt.php`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationNumber }),
      });
      const data = await response.json();
      setAppointments(data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [registrationNumber]);

  const handleStatusUpdate = async (appointment, status) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}status.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patid: appointment.patid, date: appointment.date, time: appointment.time, status }),
      });
      const data = await response.json();
      if (data.success) {
        fetchAppointments();
      } else {
        console.error('Error updating status:', data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Patient list */}
      <ScrollView style={styles.patientList}>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <View key={index} style={styles.patientContainer}>
              <View style={styles.appointmentRow}>
                <Icon name="notifications-outline" size={20} color="#000" style={styles.notificationIcon} />
                <Text style={styles.appointmentText}>
                  You have a pending appointment with Patient ID: {appointment.patid} on {appointment.date} at {appointment.time}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleStatusUpdate(appointment, 'accepted')}
                >
               
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={() => handleStatusUpdate(appointment, 'rejected')}
                >
                  
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noResults}>No pending appointments found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: width * 0.05, // Responsive padding based on screen width
  },
  patientList: {
    flex: 1,
  },
  patientContainer: {
    backgroundColor: '#f0f0f0',
    padding: width * 0.08, // Responsive padding
    marginBottom: height * 0.01, // Responsive margin
    borderRadius: 5,
  },
  appointmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.0004, // Responsive margin
  },
  notificationIcon: {
    marginRight: width * 0.03,
    marginLeft: -width * 0.04,
     // Responsive margin
  },
  appointmentText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02, // Responsive margin
  },
  
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noResults: {
    textAlign: 'center',
    marginTop: height * 0.05, // Responsive margin
  },
});

export default CheckAppointmentsScreen;
