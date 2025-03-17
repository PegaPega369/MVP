import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
const MobileVerification: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { confirmation } = route.params;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputRefs = Array(6).fill(0).map(() => useRef(null));

  const handleVerifyOtp = async () => {
    const otpValue = otp.join('');
    try {
      const userCredentials=await confirmation.confirm(otpValue);
      const user=userCredentials.user;


      const userDocument=await firestore()
       .collection("users")
       .doc(user.uid)
       .get()
      if(userDocument.exists){
        navigation.navigate('Home',{uid:user.uid});
      }else{
      navigation.navigate('DetailsPg',{uid:user.uid});
      }
      console.log('OTP entered:', otpValue);
    } catch (error) {
      console.error('Invalid code.', error);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const handleChangeText = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (value && index < 5) {
        otpInputRefs[index + 1].current.focus();
      }
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.title2}>
          We've sent an OTP to your mobile number
        </Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={otpInputRefs[index]}
              value={digit}
              onChangeText={value => handleChangeText(index, value)}
              keyboardType="numeric"
              maxLength={1}
              style={styles.otpInput}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
        <View style={styles.resendContainer}>
          <Text style={styles.title3}>Didn't receive one?</Text>
          <TouchableOpacity>
            <Text style={styles.resendText}>Resend code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(0, 0, 0)',
  },
  container: {
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title2: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  title3: {
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: '14%',
    padding: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    // backgroundColor: '#0080ff',
    backgroundColor: '#20c997',
    padding: 15,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 18,
    color: '#888',
  },
});

export default MobileVerification;
