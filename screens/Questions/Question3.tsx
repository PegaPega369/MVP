import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Next from '../../components/Next';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';

const Question2: React.FC = () => {
  const [manual, setmanual] = useState();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const options = [
    {id: 1, text: '10'},
    {id: 2, text: '20'},
    {id: 3, text: '30'},
    {id: 4, text: '50'},
  ];
  const route = useRoute();
  const {uid} = route.params;
  const progress = 100;

  const handleOptionPress = (text: string) => {
    setmanual(text);
  };

  const saveDetails = async () => {
    try {
      console.log('Hi');
      await firestore().collection('users').doc(uid).update({
        manual,
      });
      navigation.navigate('UPI',{uid});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Setting up account</Text>
        <View style={styles.progressBar}>
          <View style={{width: `${progress}%`, ...styles.progress}}></View>
        </View>
        <Text style={styles.progressText}>Question 2/2</Text>
        <Text>{'\n'}</Text>
        <Text style={styles.question}>How would you like to save per day?</Text>
        {options.map(option => (
          <View key={option.id} style={styles.optionContainer}>
            <CheckBox
              checked={manual==option.text}
              onPress={() => handleOptionPress(option.text)}
            />
            <TouchableOpacity
              style={[
                styles.option,
                manual==(option.text) && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress(option.text)}>
              <Text
                style={[
                  styles.optionText,
                  manual==(option.text) && styles.optionTexts,
                ]}>
                {option.text}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={saveDetails}>
          <Text style={styles.nextText}>Next</Text>
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
    backgroundColor: 'rgb(0, 0, 0)',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    width: '80%',
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    marginBottom: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#6bf178', // Green color for filled progress
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  option: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    borderColor: '#ddd',
  },
  selectedOption: {
    backgroundColor: '#cce5ff',
    borderColor: '#3399ff',
    borderRadius: 15,
  },
  optionText: {
    fontSize: 16,
    color: 'white',
  },
  optionTexts: {
    color: 'black',
  },
  button: {
    width: '100%',
    backgroundColor: '#0080ff',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Question2;
