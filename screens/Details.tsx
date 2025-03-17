import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';

const Details: React.FC = () =>{
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { uid } = route.params;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const saveDetails= async()=>{
    try{
      console.log('Hi')
      await firestore().collection("users").doc(uid).set({
        firstName,
        lastName
      });
    navigation.navigate('Question1', { uid });
    }catch(error){
      console.log(error);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.background} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Hello There!</Text>
        <Text style={styles.subHeaderText}>Let's get introduced properly?</Text>
        <Text style={styles.infoText}>*Please enter name as per your PAN.</Text>

        <Text style={styles.title2}>First Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your first name" 
          placeholderTextColor="#888"
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />

        <Text style={styles.title2}>Last Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your last name" 
          placeholderTextColor="#888"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />

        <View style={styles.spacer}></View>

        {/* <Text style={styles.termsText}>
          By continuing, you allow Fincraft to view transaction SMS for automatic savings and investments.
        </Text> */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {saveDetails()}}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => {
            // Add navigation to Privacy and Policy page if needed
            console.log('View Privacy and Policy clicked');
          }}>
          <Text style={styles.linkText}>View Privacy and Policy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  container: {
    width: '100%',
    backgroundColor: '#000', // Changed to black
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  headerText: {
    fontSize: 26,
    color: '#fff',
    // textAlign: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 20,
    color: '#fff',
    // textAlign: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#888',
    // textAlign: 'center',
    marginBottom: 10,
  },
  title2: {
    fontSize: 16,
    fontWeight: '300',
    color: '#fff',
    marginTop: 15,
  },
  input: {
    width: '100%',
    padding: 12,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#2C2C2C',
    color: '#fff',
    fontSize: 16,
  },
  spacer: {
    height: 20,
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
  linkButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#4A90E2',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default Details;