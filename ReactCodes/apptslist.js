import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, Dimensions } from 'react-native';
import config from './config';

// Get device width and height
const { width, height } = Dimensions.get('window');

const CheckAppointmentsScreen = ({ route, navigation }) => {
  const { registrationNumber } = route.params;
  const [selectedTab, setSelectedTab] = useState('Pending');
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async (status) => {
    let url = `${config.apiBaseUrl}patappt.php`;

    // Change URL based on status
    if (status === 'accepted') {
      url = `${config.apiBaseUrl}accept.php`;
    } else if (status === 'rejected') {
      url = `${config.apiBaseUrl}reject.php`;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationNumber }),
      });
      const data = await response.json();

      // Add the status to each appointment for filtering purposes
      const appointmentsWithStatus = data.appointments.map(appt => ({ ...appt, status }));

      setAppointments(appointmentsWithStatus);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments('pending');
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
        fetchAppointments(selectedTab.toLowerCase());
      } else {
        console.error('Error updating status:', data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    if (selectedTab === 'Pending') {
      fetchAppointments('pending');
    } else if (selectedTab === 'Accepted') {
      fetchAppointments('accepted');
    } else if (selectedTab === 'Rejected') {
      fetchAppointments('rejected');
    }
  }, [selectedTab]);

  return (
    <View style={styles.container}>
      {/* Tab bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Accepted' && styles.selectedTab]}
          onPress={() => setSelectedTab('Accepted')}
        >
          <Text style={styles.tabText}>Accepted</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Rejected' && styles.selectedTab]}
          onPress={() => setSelectedTab('Rejected')}
        >
          <Text style={styles.tabText}>Rejected</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Pending' && styles.selectedTab]}
          onPress={() => setSelectedTab('Pending')}
        >
          <Text style={styles.tabText}>Pending</Text>
        </TouchableOpacity>
      </View>

      {/* Patient list */}
      <ScrollView style={styles.patientList}>
        {appointments
          .filter(appointment => {
            if (selectedTab === 'Pending') {
              return true; // Show all pending appointments
            } else if (selectedTab === 'Accepted') {
              return appointment.status === 'accepted'; // Show only accepted appointments
            } else {
              return appointment.status === 'rejected'; // Show only rejected appointments
            }
          })
          .map((appointment, index) => (
            <View key={index} style={styles.patientContainer}>
              <Text style={styles.patientName}>Patient ID: {appointment.patid}</Text>
              <Text>Date: {appointment.date}</Text>
              <Text>Time: {appointment.time}</Text>
              {selectedTab === 'Pending' && (
                <View style={styles.buttonContainer}>
                  <Button title="Accept" onPress={() => handleStatusUpdate(appointment, 'accepted')} />
                  <TouchableOpacity style={styles.rejectButton} onPress={() => handleStatusUpdate(appointment, 'rejected')}>
                    <Text style={styles.rejectButtonText}>REJECT</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        {appointments.length === 0 && (
          <Text style={styles.noResults}>No results found.</Text>
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
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: height * 0.02, // Responsive margin
  },
  tab: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.065,
    borderRadius: 5,
  },
  selectedTab: {
    backgroundColor: '#2fbcbc',
  },
  tabText: {
    color: '#000',
  },
  patientList: {
    flex: 1,
  },
  patientContainer: {
    backgroundColor: '#f0f0f0',
    padding: width * 0.05, // Responsive padding
    marginBottom: height * 0.02, // Responsive margin
    borderRadius: 5,
  },
  patientName: {
    fontWeight: 'bold',
    marginBottom: height * 0.01, // Responsive margin
  },
  buttonContainer: {
    marginTop: height * 0.02, // Responsive margin
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: width * 0.03, // Responsive padding
    borderRadius: 5,
    marginTop: height * 0.015, // Responsive margin
  },
  rejectButtonText: {
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
