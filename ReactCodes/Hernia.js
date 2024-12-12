import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const Image15 = require('./images/AppLogo.jpg');

const Hernia = () => {
    const navigation = useNavigation();
    
    const handleGetStarted = () => {
        navigation.navigate('Welcome');
    };

    return (
        <View style={styles.container}>
            <View style={styles.hernia}>
                <View style={styles.ellipse} />
                <View style={styles.ellipse2} />
                <Image source={Image15} style={styles.logo} />
               
                <Text style={styles.bridgingText}>Bridging the gap to recovery</Text>
                <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    hernia: {
        width: width * 0.9,  // 90% of the screen width
        height: height * 0.8, // 80% of the screen height
        borderRadius: 35,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    ellipse: {
        width: width * 0.6,  // 60% of the screen width
        height: height * 0.25, // 25% of the screen height
        backgroundColor: '#0AB7B7',
        position: 'absolute',
        top: -height * 0.150, // Adjust based on screen height
        left: -width * 0.18, // Adjust based on screen width
        borderRadius: (width * 0.6) / 2, // Half of the width to make it a circle
    },
    ellipse2: {
        width: width * 0.6,  // 60% of the screen width
        height: height * 0.25, // 25% of the screen height
        backgroundColor: '#0AB7B7',
        position: 'absolute',
        top: height * 0.70, // Adjust based on screen height
        left: width * 0.5, // Adjust based on screen width
        borderRadius: (width * 0.6) / 2, // Half of the width to make it a circle
    },
    logo: {
        width: width * 0.65, // Adjust as needed
        height: width * 0.65, // Keep it square
        resizeMode: 'contain', // Adjust based on image aspect ratio
        position: 'absolute',
        top: height * 0.2, // Adjust based on screen height
    },
    herniaHub: {
        fontWeight: '700',
        fontSize: width * 0.08, // 8% of the screen width
        lineHeight: width * 0.1, // 10% of the screen width
        color: '#000000',
        position: 'absolute',
        top: height * 0.42, // Adjust based on screen height
    },
    bridgingText: {
        fontWeight: '700',
        fontSize: width * 0.054, // 5% of the screen width
        lineHeight: width * 0.07, // 7% of the screen width
        color: '#000000',
        position: 'absolute',
        top: height * 0.52, // Adjust based on screen height
    },
    button: {
        width: width * 0.4,  // 40% of the screen width
        height: height * 0.071, // 7% of the screen height
        backgroundColor: '#0AB7B7',
        borderRadius: 30,
        top: height * 0.06,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.36, // Adjust based on screen height
    },
    buttonText: {
        fontWeight: '500',
        fontSize: width * 0.05, // 5% of the screen width
        lineHeight: width * 0.07, // 7% of the screen width
        color: '#FFFFFF',
    },
});

export default Hernia;
