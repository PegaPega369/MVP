// components/Balance.tsx
import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5'; // For icons (FaMoneyBillWave, FaExchangeAlt, FaChartLine)

const {width} = Dimensions.get('window'); // Get the screen width
const containerWidth = width * 0.9; // 80% of the screen width

const Balance: React.FC = () => {
  return (
    <View style={styles.container}>
      <Shadow
        distance={20} // Controls the spread of the shadow
        startColor="#AA00FF40" // Purple glow with 30% opacity
        endColor="#AA00FF00" // Fades out the glow
        offset={[0, 0]} // Centers the glow
        style={[styles.shadowContainer, {width: containerWidth}]}>
        <LinearGradient
          colors={['#000000', '#1F1F1F']} // Black to dark gray to black
          start={{x: 0, y: 0}} // Gradient starts at the top-left
          end={{x: 1, y: 1}} // Gradient ends at the top-right
          style={styles.gradientContainer}>
          {/* Inner Glow Effect */}
          <LinearGradient
            colors={['black', '#8A2BE2']} // Transparent to purple to transparent
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.innerGlow}
          />
          <View style={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Portfolio</Text>
              <TouchableOpacity style={styles.addMoneyButton}>
                <Text style={styles.addMoneyButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.balance}>₹123.5</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
              <Icon name="bolt" size={16} color="gold" />
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 40,
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  shadowContainer: {
    borderRadius: 16, // Rounded corners
  },
  gradientContainer: {
    borderRadius: 16, // Rounded corners
    padding: 20, // Add padding to the gradient container
    overflow: 'hidden', // Ensure the inner glow stays within the container
  },
  innerGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3, // Adjust glow opacity
  },
  contentContainer: {
    position: 'relative',
    zIndex: 10, // Ensure content is above the glow
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#F2F2F2',
    fontSize: 13,
    fontWeight: '600',
  },
  addMoneyButton: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth:1,
    borderColor:'#FFFFFF'
  },
  addMoneyButtonText: {
    color: '#FFFFFF', // Black text
    fontSize: 8,
    fontWeight: 'bold',
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth:1,
    borderColor:'#FFFFFF'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14, 
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default Balance;