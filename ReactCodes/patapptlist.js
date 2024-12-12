import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import config from './config';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const PatientAppt = ({ route }) => {
  const { patid } = route.params;
  const [selectedTab, setSelectedTab] = useState('Pending');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments(selectedTab);
  }, [selectedTab]);

  const fetchAppointments = async (status) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}getpatappt.php?patid=${patid}&status=${status}`);
      const data = await response.json();
      if (data.success) {
        setAppointments(data.data);
      } else {
        Alert.alert('Error', 'Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <View style={styles.container}>
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

      <ScrollView style={styles.scrollView}>
        {appointments.map((appointment, index) => (
          <View key={index} style={styles.appointmentContainer}>
            <View style={styles.detailsContainer}>
              <Text>Date: {appointment.date}</Text>
              <Text>Time: {appointment.time}</Text>
              <Text>Doctor ID: {appointment.did}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    paddingVertical: height * 0.02, // Adjust padding based on screen height
  },
  tab: {
    paddingVertical: height * 0.015, // Vertical padding adjusted based on height
    paddingHorizontal: width * 0.05, // Horizontal padding adjusted based on width
    borderRadius: 5,
  },
  selectedTab: {
    backgroundColor: '#2fbcbc',
  },
  tabText: {
    color: '#000',
    fontSize: width * 0.04, // Dynamic font size based on screen width
  },
  scrollView: {
    paddingHorizontal: width * 0.05, // Adjusted padding
    paddingVertical: height * 0.03,
  },
  appointmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    padding: height * 0.02, // Adjusted padding
    borderRadius: 5,
    marginBottom: height * 0.02, // Adjusted margin
  },
  imageCircle: {
    width: width * 0.1, // Circle image width based on screen width
    height: width * 0.1, // Circle image height
    borderRadius: (width * 0.1) / 2, // Make it circular
    backgroundColor: '#a9a9a9',
    marginRight: width * 0.03, // Adjust margin
  },
  detailsContainer: {
    flex: 1,
  },
});

export default PatientAppt;
