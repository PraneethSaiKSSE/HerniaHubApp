import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal, TouchableOpacity, Dimensions } from 'react-native';
import config from './config'; 

const MedicReports = ({ route }) => {
  const { patid } = route.params; // Retrieve the passed patient ID
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}fetch_reports.php?patid=${patid}`);
        const result = await response.json();

        if (result.status === 'success') {
          setReportData(result.data);
        } else {
          console.log('Error fetching reports:', result.error);
        }
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [patid]);

  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!reportData) {
    return <Text>No report data available.</Text>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.card}>
        <Text style={styles.header}>Doctor ID: {reportData.docid}</Text>

        <Text style={styles.title}>Clinical Photo:</Text>
        {reportData.cpic ? (
          <TouchableOpacity onPress={() => handleImagePress(`${config.apiBaseUrl}reports_images/${reportData.cpic}`)}>
            <Image
              source={{ uri: `${config.apiBaseUrl}reports_images/${reportData.cpic}` }}
              style={styles.image}
            />
          </TouchableOpacity>
        ) : (
          <Text>No Clinical Photo</Text>
        )}

        <Text style={styles.title}>Lab Photo:</Text>
        {reportData.lpic ? (
          <TouchableOpacity onPress={() => handleImagePress(`${config.apiBaseUrl}reports_images/${reportData.lpic}`)}>

            <Image
             source={{ uri: `${config.apiBaseUrl}reports_images/${reportData.lpic}` }}

              style={styles.image}
            />
          </TouchableOpacity>
        ) : (
          <Text>No Lab Photo</Text>
        )}

        <Text style={styles.title}>Radiological Photo:</Text>
        {reportData.rpic ? (
          <TouchableOpacity onPress={() => handleImagePress(`${config.apiBaseUrl}reports_images/${reportData.rpic}`)}>

            <Image
              source={{ uri: `${config.apiBaseUrl}reports_images/${reportData.rpic}` }}

              style={styles.image}
            />
          </TouchableOpacity>
        ) : (
          <Text>No Radiological Photo</Text>
        )}
      </View>

      {/* Modal for full-size image */}
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            <View style={styles.modalContent}>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.fullImage}
                />
              )}
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#e0e0e0',
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  image: {
    width: width - 40,  // Adjusted for padding
    height: 200,
    marginTop: 5,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: width * 0.9,
    height: height * 0.9,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 80,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MedicReports;
