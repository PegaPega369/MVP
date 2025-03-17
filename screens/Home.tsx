import React, {useEffect, useState} from 'react';
import {View, ScrollView, useWindowDimensions, Dimensions, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Navbar from '../components/Navbar';
import Header from '../components/HomeComponents/Header';
import Balance from '../components/HomeComponents/Balance';
import InvestmentOptions from '../components/HomeComponents/InvestmentOptions';
import QuickServices from '../components/HomeComponents/QuickServices';
import AutomaticSavings from '../components/HomeComponents/AutomaticSavings';

const HomePage: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [firstName, setFirstName] = useState('Hi');
  const [LastName, setLastName] = useState('');

  const route = useRoute();
  const {uid} = route.params as {uid: string};

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userDoc = await firestore().collection('users').doc(uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setFirstName(userData?.firstName || '');
          setLastName(userData?.lastName || '');
        }
      } catch (error) {
        console.log('Error fetching user data: ', error);
      }
    };

    fetchUserName();
  }, [uid]);

  const handleLogOut = async () => {
    try {
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          firstName={firstName}
          LastName={LastName}
          onProfilePress={() => navigation.navigate('Profile', {uid})}
        />
        <Balance />
        <InvestmentOptions
          onGoldPress={() => navigation.navigate('Gold', {uid})}
          onMutualFundPress={() => navigation.navigate('MutualFund', {uid})}
          onP2PPress={() => console.log('P2P')}
        />
        <QuickServices
          onExpensesPress={() => navigation.navigate('Expenses', {uid})}
          onGoalSavingsPress={() => navigation.navigate('GoalSavings1', {uid})}
          onSIPCalculatorPress={() => navigation.navigate('SIP', {uid})}
        />
        <AutomaticSavings
          onRoundOffPress={() => navigation.navigate('RoundOff', {uid})}
          onDailySavingsPress={() => navigation.navigate('DailySavings', {uid})}
          onWeeklySavingsPress={() => navigation.navigate('WeeklySavings', {uid})}
          onMonthlySavingsPress={() => navigation.navigate('MonthlySavings', {uid})}
        />
        <View style={styles.footer}></View>
      </ScrollView>
      <Navbar uid={uid} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  footer: {
    height: 10,
  },
});

export default HomePage;