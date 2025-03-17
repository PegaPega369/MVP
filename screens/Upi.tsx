import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore'
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Upi = () => {
  const route = useRoute();
  const [upiId, setUpiId] = useState('');
  const {uid} = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleupi = async() => {
    try {
      await firestore().collection("users").doc(uid).update({
        upiId
      })
      navigation.navigate('Home', {uid});
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add UPI I'd</Text>
        <Text style={styles.limitTitle}>
          Max Daily Savings and Round Ups Limit:
        </Text>
        <Text style={styles.amount}>₹100 / Day</Text>
        <Text style={styles.note}>
          Note: Finecraft will never debit more than ₹100 on your behalf.
        </Text>
        <View style={styles.upiAppContainer}>
          <Text style={styles.selectUpi}>
            Select preferred UPI App to auto-save
          </Text>
          <View style={styles.upiApps}>
            <TouchableOpacity
              style={[styles.upiApp, styles.gpay]}
              onPress={() => {
                console.log('GPay');
              }}>
              <Image
                source={require('../components/assets/gpay.png')}
                style={styles.upiImg}
              />
              <Text style={styles.upiText}>Gpay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.upiApp, styles.phonepe]}
              onPress={() => {
                console.log('PhonePay');
              }}>
              <Image
                source={require('../components/assets/phonepe.png')}
                style={styles.upiImg}
              />
              <Text style={styles.upiText}>Phone Pe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.upiApp, styles.paytm]}
              onPress={() => {
                console.log('Paytm');
              }}>
              <Image
                source={require('../components/assets/paytm.png')}
                style={styles.upiImg}
              />
              <Text style={styles.upiText}>Paytm</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          value={upiId}
          onChangeText={setUpiId}
          placeholder="123456789@hdfc"
          style={styles.input}
          placeholderTextColor={'gray'}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.chargeNote}>
          You will be charged ₹1 to set up auto invest.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleupi}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SmsReq')}
            style={styles.button}>
            <Text style={{color: 'white'}}>Read SMS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000',
  },
  backArrow: {
    fontSize: 24,
    color: '#fff',
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    // marginBottom: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  limitTitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
  },
  amount: {
    fontSize: 24,
    color: '#4A90E2',
    marginTop: 10,
  },
  note: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  upiAppContainer: {
    backgroundColor: '#000',
    padding: 20,
    // marginTop: 20,
  },
  selectUpi: {
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  upiApps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  upiApp: {
    alignItems: 'center',
  },
  gpay: {
    marginRight: 10,
  },
  phonepe: {
    marginRight: 10,
  },
  paytm: {},
  upiImg: {
    width: 40,
    height: 40,
  },
  upiText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    color: '#FFFFFF',
  },
  footer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000',
  },
  chargeNote: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#0080ff',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Upi;
