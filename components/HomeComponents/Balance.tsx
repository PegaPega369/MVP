import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const {width} = Dimensions.get('window');
const containerWidth = width * 0.92;

const Balance: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <Shadow
        distance={20}
        startColor="rgba(170, 0, 255, 0.25)"
        endColor="rgba(170, 0, 255, 0)"
        offset={[0, 0]}
        style={[styles.shadowContainer, {width: containerWidth}]}>
        
        {/* Main Gradient Container */}
        <LinearGradient
          colors={['#000000', '#1F1F1F']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientContainer}>

          {/* Inner Glow Effect */}
          <LinearGradient
            colors={['black', '#8A2BE2']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.innerGlow}
          />

          <View style={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.titleSection}>
                <Text style={styles.title}>Portfolio Balance</Text>
                <View style={styles.growthContainer}>
                  <Icon name="arrow-up" size={10} color="#4CD964" />
                  <Text style={styles.growthText}>+2.4%</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.detailsButton}
                onPress={() => navigation.navigate('PortfolioDetails')}
              >
                <Text style={styles.detailsButtonText}>Details</Text>
                <Icon name="chevron-right" size={10} color="#8A2BE2" style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>

            {/* Balance Section */}
            <View style={styles.balanceSection}>
              <Text style={styles.currencySymbol}>₹</Text>
              <Text style={styles.balance}>123.5</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.primaryButton}>
                <LinearGradient
                  colors={['#8A2BE2', '#9932CC']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.buttonGradient}>
                  <Icon name="bolt" size={14} color="gold" />
                  <Text style={styles.primaryButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton}>
                <Icon name="exchange-alt" size={14} color="#FFFFFF" />
                <Text style={styles.secondaryButtonText}>Withdraw</Text>
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
    marginTop: 24,
    marginBottom: 32,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowContainer: {
    borderRadius: 20,
  },
  gradientContainer: {
    borderRadius: 20,
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  innerGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  contentContainer: {
    position: 'relative',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
  },
  growthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 217, 100, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  growthText: {
    color: '#4CD964',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 3,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
  },
  detailsButtonText: {
    color: '#8A2BE2',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 4,
  },
  balanceSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 8,
    marginBottom: 20,
  },
  currencySymbol: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '400',
    marginRight: 4,
    marginBottom: 4,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  primaryButton: {
    width: '48%',
    height: 46,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    width: '48%',
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default Balance;
