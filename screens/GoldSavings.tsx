import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  StatusBar,
  SafeAreaView,
  Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';

// Import components
import GoldPriceSection from '../components/DigitalGoldComponents/GoldPriceSection';
import InvestmentSection from '../components/DigitalGoldComponents/InvestmentSection';
import PaymentSection from '../components/DigitalGoldComponents/PaymentSection';
import { COLORS } from '../components/DigitalGoldComponents/theme';

const DigitalGold: React.FC = () => {
  // State variables
  const [manualGold, setManualGold] = useState(250);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('PhonePe');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Week');
  const [loading, setLoading] = useState(false);
  const [goldData, setGoldData] = useState({
    currentPrice: 7350,
    change: '+2.5%',
    isUp: true,
    highToday: 7400,
    lowToday: 7100,
  });

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { uid } = route.params;

  // Confirm payment function
  const confirmPayment = async () => {
    setModalVisible(false);
    setLoading(true);
    
    try {
      await firestore().collection('users').doc(uid).update({
        manualGold,
        selectedPaymentMethod,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      
      Alert.alert(
        "Investment Successful!",
        `You have successfully invested ₹${manualGold} in Digital Gold.`,
        [{ text: "Done", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Investment Failed",
        "There was a problem processing your investment. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Digital Gold</Text>
        
        {/* <TouchableOpacity style={styles.infoButton}>
          <Icon name="information-circle-outline" type="ionicon" size={22} color={COLORS.text} />
        </TouchableOpacity> */}
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Gold Price Chart Section */}
        <GoldPriceSection 
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
          goldData={goldData}
        />

        {/* Investment Section */}
        <InvestmentSection 
          manualGold={manualGold}
          setManualGold={setManualGold}
        />
      </ScrollView>

      {/* Payment Section */}
      <PaymentSection 
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        manualGold={manualGold}
        goldData={goldData}
        confirmPayment={confirmPayment}
        loading={loading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    position: 'absolute', // Keep it at the left
    left: 20, // Align properly
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  infoButton: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DigitalGold;