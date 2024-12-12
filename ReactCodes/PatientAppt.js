import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Dimensions, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const AppointmentBooking = ({ route }) => {
  const { patid } = route.params; // Retrieve the id parameter
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const navigation = useNavigation();

  const handleBookAppointment = () => {
    // Ensure both date and time are selected before proceeding
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time.');
      return;
    }

    // Navigate to BookDoctor screen with selected date, time, and id
    navigation.navigate('BookDoctor', {
      date: selectedDate.toISOString().split('T')[0], // Format date as yyyy-mm-dd
      time: selectedTime,
      patid,
    });
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setTimePickerVisible(false);
    if (selectedTime) {
      setSelectedTime(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: 'https://img.freepik.com/free-vector/man-doing-appointment-her-app_23-2148573623.jpg?size=626&ext=jpg' }} style={styles.image} />

        <View style={styles.formContainer}>
          <Text style={styles.label}>Appointment Date</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              style={styles.input}
              placeholder="Select Date"
              placeholderTextColor="#B0B0B0"
              value={selectedDate ? selectedDate.toDateString() : ''}
              editable={false}
            />
          </TouchableOpacity>
          {datePickerVisible && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <Text style={styles.label}>Appointment Time</Text>
          <TouchableOpacity onPress={showTimePicker}>
            <TextInput
              style={styles.input}
              placeholder="Select Time"
              placeholderTextColor="#B0B0B0"
              value={selectedTime || ''}
              editable={false}
            />
          </TouchableOpacity>
          {timePickerVisible && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
              <Text style={styles.buttonText}>BOOK AN APPOINTMENT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
    backgroundColor:'white',
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: 'contain',
    marginBottom: height * 0.02,
  },
  formContainer: {
    backgroundColor: '#E5E5E5',
    padding: width * 0.05,
    borderRadius: width * 0.03,
    width: '100%',
  },
  label: {
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
  input: {
    width: '100%',
    height: height * 0.06,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: width * 0.02,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.03,
  },
  buttonContainer: {
    marginTop: height * 0.04,
  },
  button: {
    marginBottom: height * 0.02,
    backgroundColor: '#0AB7B7',
    padding: height * 0.02,
    elevation: 35,
    borderRadius: width * 0.03,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.04,
    textAlign: 'center',
  },
});

export default AppointmentBooking;
