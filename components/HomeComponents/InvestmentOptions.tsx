import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface InvestmentOptionsProps {
  onGoldPress: () => void;
  onMutualFundPress: () => void;
  onP2PPress: () => void;
}

const InvestmentOptions: React.FC<InvestmentOptionsProps> = ({
  onGoldPress,
  onMutualFundPress,
  onP2PPress,
}) => {
  return (
    <>
      <Text style={styles.headings}>Invest Manually</Text>

      <View style={styles.statsContainer}>
        {/* Gold Investment Option */}
        <LinearGradient colors={['#6a0dad', '#000000']} style={styles.gradientBorder}>
          <TouchableOpacity style={styles.statBox} onPress={onGoldPress}>
            <Image source={require('../assets/gold.png')} style={styles.image} />
            <Text style={styles.font}>Gold</Text>
            {/* <Text style={styles.desc}>
              Start investing in <Text style={styles.highlight}>Gold</Text> with a minimum of ₹10
            </Text> */}
          </TouchableOpacity>
        </LinearGradient>

        {/* Mutual Funds Investment Option */}
        <LinearGradient colors={['#000000', '#6a0dad']} style={styles.gradientBorder}>
          <TouchableOpacity style={styles.statBox} onPress={onMutualFundPress}>
            <Image source={require('../assets/money.png')} style={styles.image} />
            <Text style={styles.font}>Silver</Text>
            {/* <Text style={styles.desc}>
              Start investing in <Text style={styles.highlight}>Mutual Funds</Text> with a minimum of ₹10
            </Text> */}
          </TouchableOpacity>
        </LinearGradient>

        {/* P2P Investment Option */}
        <LinearGradient colors={['#6a0dad', '#000000']} style={styles.gradientBorder}>
          <TouchableOpacity style={styles.statBox} onPress={onP2PPress}>
            <Image source={require('../assets/P2P.png')} style={styles.image} />
            <Text style={styles.font}>P2P</Text>
            {/* <Text style={styles.desc}>
              Start investing in <Text style={styles.highlight}>P2P</Text> with a minimum of ₹10
            </Text> */}
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  gradientBorder: {
    width: '30%', // Ensure all three fit in one row
    borderRadius: 12,
    padding: 2, // Creates a border effect
  },
  statBox: {
    backgroundColor: '#000000', // Dark background inside
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 6,
  },
  font: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  desc: {
    color: '#ddd',
    textAlign: 'center',
    fontSize: 12,
  },
  highlight: {
    fontWeight: 'bold',
    color: 'gold',
  },
  headings: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    marginBottom: 16,
  },
});

export default InvestmentOptions;