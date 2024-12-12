import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import config from './config';

// Get the screen width and height
const { width, height } = Dimensions.get('window');

const ConsultPat = ({ route }) => {
  const { patid } = route.params; // Retrieve the passed patient ID
  const [consultData, setConsultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullNotes, setShowFullNotes] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchConsultData = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}fetch_consult.php?patid=${patid}`);
        const result = await response.json();

        if (result.status === 'success') {
          setConsultData(result.data);
          fetchImage(result.data[0].reg); // Assuming the Doctor ID is the same for all items
        } else {
          console.log('Error fetching data:', result.error);
        }
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchImage = async (doctorId) => {
      try {
        const response = await fetch(`${config.apiBaseUrl}fetchdoc_img.php?doctorId=${doctorId}`);
        const result = await response.json();

        if (result.status === 'success') {
          setImageUri(result.imagePath);
        } else {
          console.log('Error fetching image:', result.error);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchConsultData();
  }, [patid]);

  const toggleFullNotes = () => {
    setShowFullNotes(!showFullNotes);
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : consultData.length > 0 ? (
        consultData.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.headerContainer}>
              <View style={styles.circleContainer}>
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.circleImage}
                  />
                ) : (
                  <Text>No Image</Text>
                )}
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.text}>Doctor ID: {item.reg}</Text>
                <Text style={styles.text}>Post Operation Date: {item.poday}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={toggleFullNotes}>
              <Text style={styles.viewNotesText}>
                {showFullNotes ? 'Hide Full Notes' : 'View Full Notes'}
              </Text>
            </TouchableOpacity>

            {showFullNotes && (
              <ScrollView style={styles.fullNotesContainer}>
                <Text style={styles.text}>General Examination: {item.genexm}</Text>
                <Text style={styles.text}>Blood Pressure: {item.bp}</Text>
                <Text style={styles.text}>Pulse Rate: {item.pulse}</Text>
                <Text style={styles.text}>Temperature: {item.temp}</Text>
                <Text style={styles.text}>Respiratory Rate: {item.rr}</Text>
                <Text style={styles.text}>Spo2: {item.spo2}</Text>
                <Text style={styles.text}>Drain/RT: {item.drain}</Text>
                <Text style={styles.text}>Input/Output: {item.inpout}</Text>
                <Text style={styles.text}>Pallor/Icterus/Lyozone: {item.pallor}</Text>
                <Text style={styles.text}>Clubbing/Lymphadenopathy: {item.clublym}</Text>
                <Text style={styles.text}>P/A: {item.pa}</Text>
                <Text style={styles.text}>RS: {item.rs}</Text>
                <Text style={styles.text}>CVS: {item.cvs}</Text>
                <Text style={styles.text}>CNS: {item.cns}</Text>
                <Text style={styles.text}>Diagnosis: {item.diag}</Text>
                <Text style={styles.text}>Antibiotics: {item.abx}</Text>
                <Text style={styles.text}>SPI/H2 Blockers: {item.spi_h2}</Text>
                <Text style={styles.text}>Analgesics: {item.analg}</Text>
                <Text style={styles.text}>Anti-spasmodics: {item.antipy}</Text>
                <Text style={styles.text}>Stool softener: {item.stool}</Text>
                <Text style={styles.text}>Local Examination: {item.local}</Text>
                <Text style={styles.text}>Thyroid Medications: {item.thyroid}</Text>
                <Text style={styles.text}>Investigation: {item.invest}</Text>
                <Text style={styles.text}>Advice/Plan: {item.advice}</Text>
              </ScrollView>
            )}
          </View>
        ))
      ) : (
        <Text>No consultation data found for this patient.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#e0e0e0', // Set background color to grey
    borderColor: '#ccc', // Grey border color
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1, // Border width
    width: width * 0.9, // 90% of the screen width
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleContainer: {
    width: width * 0.15, // Adjust circle size based on screen width
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  circleImage: {
    width: width * 0.15, // Adjust image size based on screen width
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
  },
  infoContainer: {
    flex: 1,
  },
  text: {
    fontSize: height * 0.02, // Adjust font size based on screen height
    marginBottom: 5,
  },
  viewNotesText: {
    color: '#1E90FF',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: height * 0.02, // Adjust font size based on screen height
  },
  fullNotesContainer: {
    marginTop: 15,
    maxHeight: height * 0.5, // Limit height of notes to half the screen height
  },
});

export default ConsultPat;
