import React from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const handleDoctorPress = () => {
    navigation.navigate('DoctorLogin');
  };

  const handlePatientPress = () => {
    navigation.navigate('PatientLogin');
  };

  const handleAdminPress = () => {
    navigation.navigate('AdminLogin');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>Welcome, Choose Your Category</Text>
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/8815/8815112.png' }}
            style={styles.logo}
          />
          <TouchableOpacity style={styles.button} onPress={handleDoctorPress}>
            <Text style={styles.buttonText}>Doctor</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoWrapper}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s' }}
            style={styles.logo}
          />
          <TouchableOpacity style={styles.button} onPress={handlePatientPress}>
            <Text style={styles.buttonText}>Patient</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoWrapper}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4mh8vDFdunxMQ7wyAB6uP8C2mU7Kwjw9RIA&usqp=CAU' }}
            style={styles.logo}
          />
          <TouchableOpacity style={styles.button} onPress={handleAdminPress}>
            <Text style={styles.buttonText}>Admin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05, // Padding for better spacing
  },
  welcomeText: {
    fontSize: width * 0.05, // Responsive font size
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: height * 0.02, // Responsive margin
  },
  logoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02, // Responsive margin
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: height * 0.015, // Responsive margin
  },
  logo: {
    width: width * 0.31, // Responsive width
    height: width * 0.32, // Responsive height
    marginVertical: height * 0.02, // Responsive margin
  },
  button: {
    backgroundColor: '#0AB7B7',
    paddingVertical: height * 0.02, // Responsive padding
    paddingHorizontal: width * 0.2, // Responsive padding
    marginVertical: height * 0.01, // Responsive margin
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: width * 0.04, // Responsive font size
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
