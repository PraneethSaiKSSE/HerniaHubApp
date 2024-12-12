import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import Image10 from './images/Dash2.jpg';
import Image2 from './images/BookApp.jpeg';
import Image3 from './images/PatApp.jpeg';
import config from './config'; 

const { width, height } = Dimensions.get('window');

const PatDashboard = ({ route }) => {
  const { patid } = route.params;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [DoctorIDs, setDoctorIDs] = useState([]);
  const [doctorImages, setDoctorImages] = useState({});
  const [scrollIndex, setScrollIndex] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchDoctorIDs = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}doctorids.php`);

        const data = await response.json();
        setDoctorIDs(data.DoctorIDs);
      } catch (error) {
        console.error('Error fetching doctor IDs:', error);
      }
    };

    fetchDoctorIDs();
  }, []);

  useEffect(() => {
    const fetchDoctorImages = async () => {
      try {
        const images = {};
        for (const registrationNumber of DoctorIDs) {
          console.log(`Fetching image for Registration Number: ${registrationNumber}`); // Log registration number
          const response = await fetch(`${config.apiBaseUrl}doctorimage.php?registrationNumber=${encodeURIComponent(registrationNumber)}`);

          const imageData = await response.json();
          
          if (imageData.success) {
            images[registrationNumber] = imageData.image;
          } else {
            console.warn(`No image found for Registration Number ${registrationNumber}`);
            images[registrationNumber] = null;
          }
        }
        setDoctorImages(images);
      } catch (error) {
        console.error('Error fetching doctor images:', error);
      }
    };
  
    if (DoctorIDs.length > 0) {
      fetchDoctorImages();
    }
  }, [DoctorIDs]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex(prevIndex => (prevIndex < DoctorIDs.length - 1 ? prevIndex + 1 : 0));
    }, 2000);

    return () => clearInterval(interval);
  }, [DoctorIDs.length]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleIconClick = async (registrationNumber) => {
    try {
      // Fetch doctor details based on the registration number
      const response = await fetch(`${config.apiBaseUrl}docdetscroll.php?RegistrationNumber=${registrationNumber}`);
      const doctorDetails = await response.json();
  
      if (doctorDetails.error) {
        // Show an error alert if there was an issue
        Alert.alert("Error", doctorDetails.error);
      } else {
        // Navigate to 'scrollitem' page with both doctor details and images
        navigation.navigate('scrollitem', { 
          doctorDetails, 
          doctorImages // Pass the doctorImages object
        });
      }
    } catch (error) {
      // Log any errors that occur during the fetch
      console.error('Error fetching doctor details:', error);
    }
  };
  

  const handleViewAll = () => {
    navigation.navigate('docviewall', { DoctorIDs, doctorImages });
  };
  
  const handleapptclick = () => {
    navigation.navigate('patapptlist', { patid });
  };

  const handleImage2Press = () => {
    navigation.navigate('PatientAppt', { patid });
  };
  const handlemedic = () => {
    navigation.navigate('MedicReports',{patid});
    
  };
  const handleconsult = () => {
    navigation.navigate('ConsultPat',{patid});
    
  };
  const handlechangepass = () => {
    navigation.navigate('patpassword', { patid: patid }); // Ensure the screen name is a string and pass patid as an object
  };
  


  

  const handleImage3Press = () => {
    navigation.navigate('patapptlist', { patid });
  };

  const handleInformFollowUp = () => {
    Alert.alert(
      'Has Hernia been operated?',
      '',
      [
        { text: 'Yes', onPress: () => navigation.navigate('YesOption', { patid }) },
        { text: 'No', onPress: () => navigation.navigate('No', { patid }), style: 'cancel' },
      ],
      { cancelable: false }
    );
  };

  const handleProfileClick = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}getPatientDetails.php?patid=${patid}`);

      const data = await response.json();
      if (data.success) {
        navigation.navigate('PatientProfile', { patientDetails: data.data });
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  return (
    <View style={styles.container} onStartShouldSetResponder={closeMenu}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Ionicons name="menu-outline" size={24} color="black" />
      </TouchableOpacity>
      

      {isMenuOpen && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuOption} onPress={handleProfileClick}>
            <Text>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption} onPress={handleapptclick}>
            <Text>Appointment Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption} onPress={handleconsult}>
            <Text>Consultation Notes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuOption} onPress={handlemedic}>
            <Text>Medical Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuOption} onPress={handlechangepass}>
            <Text>Change Password</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuOption} onPress={() => console.log('Log Out clicked')}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={Image10} style={styles.image} />
        </View>

        <TouchableOpacity onPress={handleViewAll} style={styles.viewAllContainer}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>

        <View style={styles.scrollContainer}>
  {DoctorIDs.length > 0 ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.scrollView, { width: width * 0.9, height: height * 0.13 }]}
      contentOffset={{ x: scrollIndex * (width * 0.35), y: 0 }}
    >
      {DoctorIDs.map((registrationNumber, index) => (
        <TouchableOpacity key={index} style={styles.scrollViewItem} onPress={() => handleIconClick(registrationNumber)}>
          <View style={styles.circle}>
            {doctorImages[registrationNumber] ? (
              <Image
                source={{ uri: doctorImages[registrationNumber] }} // Use the URL directly
                style={styles.circleImage}
              />
            ) : (
              <Ionicons name="person-circle-outline" size={50} color="gray" />
            )}
          </View>
          <Text>ID: {registrationNumber}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  ) : (
    <View style={[styles.scrollContainer, { justifyContent: 'center', alignItems: 'center', height: '100%' }]}>
      <Text style={styles.noDoctorsText}>No Doctors Available</Text>
    </View>
  )}
</View>

        <TouchableOpacity onPress={handleImage2Press} style={styles.image2Container}>
          <Image source={Image2} style={styles.image2} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImage3Press} style={styles.image3Container}>
          <Image source={Image3} style={styles.image3} />
        </TouchableOpacity>

        <Text style={styles.add}>BOOK APPOINTMENT</Text>
        <Text style={styles.appointments}>APPOINTMENTS LIST</Text>

        <TouchableOpacity style={styles.followUpButton} onPress={handleInformFollowUp}>
          <Text style={styles.followUpButtonText}>Inform about Follow Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

 
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  menuButton: {
    position: 'absolute',
    top: height * 0.04,
    left: width * 0.05,
    zIndex: 1,
  },
  menuContainer: {
    position: 'absolute',
    height: height * 0.5,
    width: width * 0.60,
    top: height * 0.10,
    left: width * 0.05,
    backgroundColor: 'lightblue',
    borderRadius: 8,
    padding: 10,
    zIndex: 3, // Ensure the menu is above other elements
  },
  menuOption: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  notificationButton: {
    zIndex: 1,
    left: width * 0.87,
    top: height * 0.07,
    position: 'absolute',
    


  },
  noDoctorsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: height * 0.1,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'cover',
  },
  circleImage: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.125,
  },
  viewAllContainer: {
    position: 'absolute',
    top: height * 0.33,
    right: width * 0.05,
  },
  viewAllText: {
    fontSize: width * 0.035,
    color: 'black',
  },
  scrollContainer: {
    marginTop: height * 0.36,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    marginBottom: height * 0.47,
    backgroundColor: '#e8e5e5',
    paddingVertical: height * 0.013,
    paddingHorizontal: height * 0.01,
    borderRadius: width * 0.02,
    borderColor: 'black',
    borderWidth: 1,
    elevation: 20,
  },
  scrollView: {
    paddingHorizontal: width * 0.05,
  },
  scrollViewItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.34,
    height: height * 0.13,
    marginHorizontal:width * 0.02,
    borderRadius: width * 0.07,
    backgroundColor: 'lightgrey',
    borderColor: 'black',
    borderWidth: 1,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white', // Gray background for the placeholder circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5, // Space between the circle and the text
  },

  image2Container: {
    position: 'absolute',
    top: height * 0.60,
    left: width * 0.07,
    borderColor: 'skyblue',
    borderWidth: 2,
    borderRadius: width * 0.02,
    padding: width * 0.005,
    elevation: 15,
  },
  image3Container: {
    position: 'absolute',
    top: height * 0.60,
    right: width * 0.07,
    borderColor: 'skyblue',
    borderWidth: 2,
    borderRadius: width * 0.02,
    padding: width * 0.005,
    elevation: 15,
  },
  image2: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: 'cover',
  },
  image3: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: 'cover',
  },
  add: {
    position: 'absolute',
    top: height * 0.80,
    left: width * 0.09,
    fontSize: width * 0.035,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  appointments: {
    position: 'absolute',
    top: height * 0.80,
    right: width * 0.08,
    fontWeight: 'bold',
    fontSize: width * 0.036,
    textAlign: 'center',
  },
  followUpButton: {
    position: 'absolute',
    bottom: height * 0.05,
    backgroundColor: '#0AB7B7',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.24,
    borderRadius: width * 0.02,
    elevation: 5,
  },
  followUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});

export default PatDashboard;