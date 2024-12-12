import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Linking, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const DocFullDetails = () => {
  const route = useRoute();
  const { doctorDetails, doctorImages } = route.params;

  // Construct the image URL
  const imageUrl = doctorImages[doctorDetails['Registration Number']];

  // Function to handle chat button press
  const handleChatPress = () => {
    if (doctorDetails && doctorDetails['Mobile Number']) {
      const phoneNumber = doctorDetails['Mobile Number'];
      const message = "Hello Doctor"; // Your default message
      const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

      Linking.openURL(whatsappUrl).catch(() => {
        Alert.alert('Error', 'Make sure WhatsApp is installed on your device.');
      });
    } else {
      Alert.alert('Error', 'Doctor contact number is not available.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.imageCircle}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }} // Use the image URL
            style={styles.image}
          />
        ) : (
          <Text style={styles.imageText}>No Image</Text>
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
        <Text style={styles.text}>Mob Number: {doctorDetails['Mobile Number']}</Text>
        <Text style={styles.text}>Home Address: {doctorDetails['Home Address']}</Text>
        <Text style={styles.text}>WorkPlace: {doctorDetails['WorkPlace']}</Text>
      </View>

      <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
        <Text style={styles.chatButtonText}>Chat with Doctor</Text>
      </TouchableOpacity>
    </View>
  );
};

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.04, // Responsive padding
    width: width,  // Use screen width
    height: height, // Use screen height
  },
  imageCircle: {
    width: width * 0.25, // Adjust size proportionally
    height: width * 0.25, // Adjust size proportionally
    borderRadius: (width * 0.25) / 2, // Keep the circle shape
    backgroundColor: '#a9a9a9',
    marginBottom: width * 0.05, // Responsive margin
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: (width * 0.25) / 2, // Keep the circle shape
  },
  imageText: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: width * 0.25, // Center text vertically
  },
  detailsContainer: {
    backgroundColor: '#e0e0e0', // Grey background
    padding: width * 0.04, // Responsive padding
    borderRadius: 8,
    width: width * 0.9, // Use a proportion of screen width
  },
  text: {
    fontSize: width * 0.04, // Responsive font size
    marginBottom: width * 0.02, // Responsive margin
  },
  chatButton: {
    backgroundColor: '#25D366', // WhatsApp color
    borderRadius: 5,
    height: 40,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width * 0.05, // Responsive margin
  },
  chatButtonText: {
    color: '#fff',
    fontSize: width * 0.04, // Responsive font size
  },
});

export default DocFullDetails;
