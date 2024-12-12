import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
// Import your local images
import Image1 from './images/hellodoctor.png';
import Image2 from './images/addpatient.png';
import Image3 from './images/docAppoints.png';
import config from './config';
import Image10 from './images/Dash2.jpg';

const { width, height } = Dimensions.get('window');

const DocDashBoard = (props) => {
  const { route } = props;
  const { params } = route;
  const { 'Registration Number': username } = params;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation(); // Initialize navigation
  const [patientIDs, setPatientIDs] = useState([]); // State to store fetched IDs
  const [patientImages, setPatientImages] = useState({});
  const scrollViewRef = useRef(null); // Ref for the ScrollView

  useEffect(() => {
    const fetchPatientIDs = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}patientids.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            registration_number: username,
          }),
        });
        const data = await response.json();
        setPatientIDs(data.patientIDs); // Assuming your PHP script returns an array named 'patientIDs'
      } catch (error) {
        console.error('Error fetching patient IDs:', error);
      }
    };

    fetchPatientIDs();
  }, []);

  useEffect(() => {
    const fetchPatientImages = async () => {
      try {
        const images = {};
        for (const patid of patientIDs) {
          console.log(`Fetching image for Registration Number: ${patid}`); // Log registration number
          const response = await fetch(`${config.apiBaseUrl}patientimage.php?patid=${encodeURIComponent(patid)}`);
          const imageData = await response.json();
          
          if (imageData.success) {
            images[patid] = imageData.image;
          } else {
            console.warn(`No image found for Registration Number ${patid}`);
            images[patid] = null;
          }
        }
        setPatientImages(images);
      } catch (error) {
        console.error('Error fetching doctor images:', error);
      }
    };

    if (patientIDs.length > 0) {
      fetchPatientImages();
    }
  }, [patientIDs]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleAddPatient = () => {
    navigation.navigate('addpatient', { registrationNumber: username });
  };

  const handleFollow = () => {
    navigation.navigate('patstatus', { registrationNumber: username });
  };

  const handleAppt = () => {
    navigation.navigate('apptslist', { registrationNumber: username });
  };

  const handleappclick = () => {
    navigation.navigate('apptslist', { registrationNumber: username });
  };

  const handleAllPatients = () => {
    navigation.navigate('allpatients');
  };

  const handlesearch = () => {
    navigation.navigate('allpatients');
  };

  const handleViewAll = () => {
    navigation.navigate('viewall', { patientIDs: patientIDs, patientImages: patientImages });
  };

  const handleChangePassword = () => {
    navigation.navigate('changedocpass');
  };

  const fetchDoctorDetails = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}docprofile.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registration_number: username,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const doctorDetails = data.doctorDetails;
        navigation.navigate('DoctorDetails', { doctorDetails });
      } else {
        console.error('Error fetching doctor details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  const handleProfileClick = () => {
    fetchDoctorDetails();
  };

  const handleLogoutClick = () => {
    navigation.navigate("DoctorLogin");
  };

  const handleNotificationClick = async () => {
    navigation.navigate('notif', { registrationNumber: username });
  };

  const handlePatientIDPress = (patid) => {
    navigation.navigate('patfulldetails', { selectedPatientID: patid, registrationNumber: username, patientImage: patientImages[patid] });
  };

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]} onStartShouldSetResponder={closeMenu}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Ionicons name="menu-outline" size={24} color="black" />
        </TouchableOpacity>
        
      </View>

      {isMenuOpen && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={[styles.menuOption, { backgroundColor: 'transparent' }]} onPress={handleProfileClick}>
            <Text>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuOption, { backgroundColor: 'transparent' }]} onPress={handleappclick}>
            <Text>Appointment Schedule</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuOption, { backgroundColor: 'transparent' }]} onPress={handleChangePassword}>
            <Text>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuOption, { backgroundColor: 'transparent' }]} onPress={handleAllPatients}>
            <Text>All Patients</Text>
          </TouchableOpacity>
         
          
          <TouchableOpacity style={[styles.menuOption, { backgroundColor: 'transparent' }]} onPress={handleFollow}>
            <Text>Follow-Up Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuOption, { backgroundColor: 'transparent' }]} onPress={handleLogoutClick}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={Image10} style={styles.image} />
        </View>

        <TouchableOpacity onPress={handleViewAll} style={styles.viewAllContainer}>
          <Text style={styles.viewall}>View All</Text>
        </TouchableOpacity>

        <View style={styles.scrollViewContainer}>
          <ScrollView
            horizontal
            style={[styles.scrollView, { width: width * 0.9, height: height * 0.13 }]}
            ref={scrollViewRef}
          >
            {patientIDs.length > 0 ? (
              patientIDs.map((patid, index) => (
                <TouchableOpacity key={index} style={styles.scrollViewItem} onPress={() => handlePatientIDPress(patid)}>
                  <View style={styles.circle}>
                    {patientImages[patid] ? (
                      <Image
                        source={{ uri: patientImages[patid] }}
                        style={styles.circleImage}
                      />
                    ) : (
                      <Ionicons name="person-circle-outline" size={50} color="gray" />
                    )}
                  </View>
                  <Text>ID {patid}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Text style={{ fontSize: 16, color: 'gray' }}>No patients available</Text>
              </View>
            )}
          </ScrollView>
        </View>

        <TouchableOpacity onPress={handleAddPatient} style={styles.image2Container}>
          <Image source={Image2} style={styles.image2} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAppt} style={styles.image3Container}>
          <Image source={Image3} style={styles.image3} />
        </TouchableOpacity>

        <Text style={styles.add}>
          ADD PATIENT
        </Text>

        <Text style={styles.appointments}>APPOINTMENTS</Text>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.bottomIcon} onPress={handleProfileClick}>
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomIcon} onPress={handlesearch}>
            <Ionicons name="search-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomIcon} onPress={handleNotificationClick}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomIcon} onPress={handleLogoutClick}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  topBar: {
    position: 'absolute',
    top: height * 0.05,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  
    paddingHorizontal: width * 0.05,
    zIndex: 1, // Ensure icons are above other elements
  },
  menuButton: {
    position: 'absolute',
    top: height * 0.01,
    width: 50,
    height: 50,
    left: width * 0.05,
    zIndex: 1, // Ensure the button is above other elements
  },
  
  notificationButton: {
    zIndex: 1,
    left: width * 0.83,
    top: height * 0.02,
    position: 'absolute',
    


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
  viewAllContainer: {
    position: 'absolute',
   right:'8%',
    top: '38%',
  },
  viewall: {
    color: 'black',
  },
  
  
  scrollViewContainer: {
   
      marginTop: height * 0.41,
      marginLeft: width * 0.05,
      marginRight: width * 0.05,
      marginBottom: height * 0.44,
      backgroundColor: '#e8e5e5',
      paddingVertical: height * 0.01,
      paddingHorizontal: height * 0.01,
      borderRadius: width * 0.02,
      borderColor: 'grey',
      borderWidth: 1,
      elevation: 20,
     // Adjust margin bottom to ensure it ends above image2 and image3
  },
  scrollView: {
    paddingHorizontal: width * 0.05,
  },
  scrollViewItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.34,
    height: height * 0.12,
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
  circleImage: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.125,
  },
  image2Container: {
    position: 'absolute',
    top: height * 0.63,
    left: width * 0.07,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: width * 0.02,
    padding: width * 0.005,
    elevation: 15,
  },
  image3Container: {
    position: 'absolute',
    top: height * 0.63,
    right: width * 0.07,
    borderColor: 'orange',
    borderWidth: 2,
    borderRadius: width * 0.02,
    padding: width * 0.005,
    elevation: 15,
  },
  image2: {
    width: width * 0.33,
    height: width * 0.33,
    resizeMode: 'cover',
  },
  image3: {
    width: width * 0.33,
    height: width * 0.33,
    resizeMode: 'cover',
  },
  add: {
    position: 'absolute',
    top: height * 0.81,
    left: width * 0.1,
    fontSize: 15,
    textAlign: 'center',
    fontWeight:'bold',
    marginLeft: 9,
  },
  appointments: {
    position: 'absolute',
    top: height * 0.81,
    right: width * 0.093,
    fontSize: 15,
    textAlign: 'center',
    fontWeight:'bold',
    marginLeft: 12,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '90%',
    height: '8%',
    borderRadius: 15,
    backgroundColor: '#2fbcbc',
  },
  bottomIcon: {
    padding: 10,
    
  },
});

export default DocDashBoard;