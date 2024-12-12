import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { launchImageLibrary } from 'react-native-image-picker'; // Import react-native-image-picker
import { useRoute, useNavigation } from '@react-navigation/native';
import config from './config';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const ComplaintsForm = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { patid } = route.params; // Get the passed route parameter

  const [postOperationDate, setPostOperationDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [complaints, setComplaints] = useState({
    "Abdominal Pain": false,
    Fever: false,
    Nausea: false,
    Vomiting: false,
    "Mobilizing Well": false,
    "Paged Flatus": false,
    "Passed Stools": false,
    "Voided Urine": false,
  });
  const [complaintsText, setComplaintsText] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}docnames.php`);
        const data = await response.json();
        const formattedDoctors = data.map(doctor => ({
          label: `${doctor.label} (${doctor.value})`,
          value: doctor.value
        }));
        setDoctors(formattedDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleCheckboxChange = (key) => {
    setComplaints({ ...complaints, [key]: !complaints[key] });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setPostOperationDate(formattedDate);
    }
  };

  const handleSubmit = async () => {
    const selectedComplaints = Object.keys(complaints).filter(key => complaints[key]);
    const formData = new FormData();
    formData.append('pid', patid);
    formData.append('date', postOperationDate);
    formData.append('comp', complaintsText);
    formData.append('comps', JSON.stringify(selectedComplaints));
    formData.append('dname', doctors.find(doctor => doctor.value === selectedDoctor)?.label.split(' (')[0]);
    formData.append('did', selectedDoctor);
    if (image) {
      formData.append('pic', {
        uri: image,
        name: 'clinical_pic.jpg',
        type: 'image/jpeg'
      });
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}complaint.php`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const result = await response.json();
      if (result.success) {
        Alert.alert('Form Submitted Successfully');
      } else {
        Alert.alert('Successfully submitted');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error submitting form');
    }
  };

  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorCode) {
          console.log('Error selecting image: ', response.errorMessage);
        } else {
          setImage(response.assets[0].uri); // Get the image URI
        }
      }
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.oper}>POST OPERATION DATE</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              value={postOperationDate}
             
              editable={false}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.comp}>ENTER COMPLAINTS</Text>
          <TextInput
            style={[styles.input, styles.complaintsInput]}
            multiline
            value={complaintsText}
            onChangeText={setComplaintsText}
           
          />
        </View>

        <View style={styles.checkboxBackground}>
          <View style={styles.checkboxContainer}>
            {Object.entries(complaints).map(([key, value]) => (
              <View key={key} style={styles.checkboxItem}>
                <TouchableOpacity
                  style={[styles.tickBox, value ? styles.tickBoxChecked : null]}
                  onPress={() => handleCheckboxChange(key)}
                >
                  {value && <Text style={styles.tick}>&#10003;</Text>}
                </TouchableOpacity>
                <Text style={styles.option}>{key}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.attachPhotoContainer}>
          <TouchableOpacity style={styles.uploadInput} onPress={handleImagePicker}>
            <Text style={styles.uploadInputText}>Select Clinical Picture from Gallery <Icon name="upload" size={20} color="#000" /></Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>

        <View style={styles.box}>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => setSelectedDoctor(value)}
            items={doctors}
            placeholder={{ label: "Select Doctor", value: null }}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // 5% of screen width
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  inputContainer: {
    marginBottom: height * 0.02, // 2% of screen height
  },
  box: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: height * 0.02, // 2% of screen height
    padding: width * 0.03, // 3% of screen width
    marginTop: height * 0.02, // 2% of screen height
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: width * 0.03, // 3% of screen width
    fontSize: width * 0.04, // 4% of screen width
  },
  complaintsInput: {
    height: height * 0.2, // 20% of screen height
  },
  checkboxBackground: {
    backgroundColor: '#dee4e6',
    padding: width * 0.03, // 3% of screen width
    borderRadius: 5,
    marginBottom: height * 0.02, // 2% of screen height
  },
  checkboxContainer: {},
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02, // 2% of screen height
  },
  tickBox: {
    width: width * 0.06, // 6% of screen width
    height: width * 0.06, // 6% of screen width
    borderWidth: 1,
    borderColor: 'grey',
    marginRight: width * 0.03, // 3% of screen width
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  tickBoxChecked: {
    backgroundColor: '#00BFFF',
  },
  tick: {
    color: '#fff',
    fontSize: width * 0.05, // 5% of screen width
  },
  option: {
    fontSize: width * 0.04, // 4% of screen width
  },
  attachPhotoContainer: {
    marginBottom: height * 0.02, // 2% of screen height
  },
  uploadInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: width * 0.03, // 3% of screen width
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadInputText: {
    fontSize: width * 0.04, // 4% of screen width
    marginRight: width * 0.03, // 3% of screen width
  },
  image: {
    marginTop: height * 0.02, // 2% of screen height
    width: width * 0.8, // 80% of screen width
    height: height * 0.2, // 20% of screen height
    resizeMode: 'cover',
  },
  submitButton: {
    backgroundColor: '#0AB7B7',
    padding: width * 0.04, // 4% of screen width
    borderRadius: 5,
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
     // 2% of screen height
  },
  submitButtonText: {
    color: '#fff',
    fontSize: width * 0.05, // 5% of screen width
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: width * 0.04, // 4% of screen width
    padding: width * 0.03, // 3% of screen width
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
  },
  inputAndroid: {
    fontSize: width * 0.04, // 4% of screen width
    padding: width * 0.03, // 3% of screen width
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
  },
});

export default ComplaintsForm;
