import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

const LoginPage: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Enable app verification disabled for testing
    auth().settings.appVerificationDisabledForTesting = true;
  }, []);

  const signUp = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`);
      navigation.navigate('MobileVerification', { confirmation });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {/* Image section */}
        <View style={styles.imageContainer}>
          <Image source={require('../components/assets/Fincraft.png')} style={styles.image} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Login/Signup</Text>

        {/* Mobile Number Input */}
        <TextInput 
          placeholder="Mobile Number" 
          style={styles.input} 
          placeholderTextColor={'gray'} 
          keyboardType='numeric'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        {/* Get OTP Button */}
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  container: {
    padding: 20,
    width: '100%',
    alignItems: 'center', 
  },
  imageContainer: {
    alignItems: 'center', 
    marginBottom: 20,
  },
  image: {
    width: 360,
    height: 200,
    marginTop: 10,
  },
  title: {
    fontSize: 24, 
    marginBottom: 20,
    color: '#FFFFFF', 
    fontWeight: 'bold', 
  },
  input: {
    width: '100%',
    backgroundColor: '#1E1E1E', 
    padding: 15, 
    marginBottom: 20, 
    borderRadius: 10,
    color: '#FFFFFF', 
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#0080ff',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18, 
    fontWeight: 'bold', 
  },
});

export default LoginPage;
