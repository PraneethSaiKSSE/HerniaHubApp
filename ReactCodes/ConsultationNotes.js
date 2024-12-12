import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import config from './config';

const { width, height } = Dimensions.get('window');

const InputForm = ({ selectedPatientID, registrationNumber }) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (text, index) => {
    setInputs({ ...inputs, [index]: text });
  };

  const handleSubmit = async () => {
    const formData = {
      reg: registrationNumber,
      name: inputs[0],
      pid: inputs[1],
      poday: inputs[2],
      genexm: inputs[3],
      bp: inputs[4],
      pulse: inputs[5],
      temp: inputs[6],
      rr: inputs[7],
      spo2: inputs[8],
      drain: inputs[9],
      inpout: inputs[10],
      pallor: inputs[11],
      clublym: inputs[12],
      pa: inputs[13],
      rs: inputs[14],
      cvs: inputs[15],
      cns: inputs[16],
      locexm: inputs[17],
      diag: inputs[18],
      abx: inputs[19],
      spi_h2: inputs[20],
      analg: inputs[21],
      antipy: inputs[22],
      stool: inputs[23],
      local: inputs[24],
      thyroid: inputs[25],
      invest: inputs[26],
      advice: inputs[27],
      regnum: selectedPatientID
    };

    try {
      const response = await fetch(`${config.apiBaseUrl}consult.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.status === 'success') {
        console.log('Data inserted successfully');
      } else {
        console.log('Error inserting data:', result.error);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {[
          "Patient Name", "Patient ID", "Post Operation Day No(dd-mm-yyyy)", "General Examination", "Blood Pressure", 
          "Pulse Rate", "Temperature", "Respiratory Rate", "SpO2", "Drain/RT", "Input/Output", 
          "Pallor/Icterus/Lyozone", "Clubbing/Lymphadenopathy", "P/A", "RS", "CVS", "CNS", 
          "Local Examination", "Diagnosis", "Antibiotics", "SPI/H2 Blockers", "Analgesics", 
          "Anti-Pyretics", "Stool Softener", "Local Applicant", "Thyroid Medications", 
          "Investigation to be done", "Advice/plan"
        ].map((placeholder, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              placeholder={placeholder}
              placeholderTextColor="#B0B0B0"
              style={styles.input}
              value={inputs[index]}
              onChangeText={(text) => handleChange(text, index)}
            />
          </View>
        ))}
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const App = ({ route }) => {
  const { selectedPatientID, registrationNumber } = route.params; // Retrieve passed patient ID and registration number

  return (
    <SafeAreaView style={styles.safeArea}>
      <InputForm selectedPatientID={selectedPatientID} registrationNumber={registrationNumber} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.03,
  },
  container: {
    backgroundColor: 'lightgrey',
    padding: width * 0.05,
    borderRadius: width * 0.02,
  },
  inputContainer: {
    marginBottom: height * 0.02,
  },
  input: {
    height: height * 0.06,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: width * 0.03,
    backgroundColor: 'white',
    borderRadius: width * 0.01,
    fontSize: width * 0.04,
    paddingTop: height * 0.015, // Adjust the position of the placeholder text
  },
});

export default App;
