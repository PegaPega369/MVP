// components/Balance.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');
const containerWidth = width * 0.92; // Original card size

interface BalanceData {
  balance: number;
  growth: {
    percentage: number;
    isPositive: boolean;
  };
  currency: string;
}

interface BalanceProps {
  onDetailsPress: () => void;
  balanceData?: BalanceData;
  isLoading?: boolean;
  onSavePress?: () => void;
  onWithdrawPress?: () => void;
}

const Balance: React.FC<BalanceProps> = ({
  onDetailsPress,
  balanceData = {
    balance: 123.5,
    growth: { percentage: 2.4, isPositive: true },
    currency: '₹'
  },
  isLoading = false,
  onSavePress,
  onWithdrawPress,
}) => {
  // Format balance with commas for thousands
  const formatBalance = (amount: number): string => {
    return amount.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  };

  return (
    <View style={styles.container}>
      <Shadow
        distance={15}
        startColor="rgba(155, 81, 224, 0.15)"
        endColor="rgba(155, 81, 224, 0)"
        offset={[0, 5]}
        style={[styles.shadowContainer, { width: containerWidth }]}>
        <LinearGradient
          colors={['#13111C', '#1E1A29']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <View style={styles.titleSection}>
                <Text style={styles.title}>Portfolio</Text>
                {balanceData.growth && (
                  <View style={[
                    styles.growthContainer,
                    { backgroundColor: balanceData.growth.isPositive 
                      ? 'rgba(76, 217, 100, 0.15)' 
                      : 'rgba(255, 59, 48, 0.15)' 
                    }
                  ]}>
                    <Icon 
                      name={balanceData.growth.isPositive ? "arrow-up" : "arrow-down"} 
                      size={10} 
                      color={balanceData.growth.isPositive ? "#4CD964" : "#FF3B30"} 
                    />
                    <Text style={[
                      styles.growthText,
                      { color: balanceData.growth.isPositive ? "#4CD964" : "#FF3B30" }
                    ]}>
                      {balanceData.growth.isPositive ? "+" : "-"}
                      {balanceData.growth.percentage}%
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={onDetailsPress}
                activeOpacity={0.7}>
                <Text style={styles.detailsButtonText}>Details</Text>
                <Icon
                  name="chevron-right"
                  size={10}
                  color="#ffffff"
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
            </View>
            
            <View style={styles.balanceRow}>
              {isLoading ? (
                <ActivityIndicator size="large" color="#9D4EDD" />
              ) : (
                <Text style={styles.balance}>
                  {`${balanceData.currency}${formatBalance(balanceData.balance)}`}
                </Text>
              )}
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={onSavePress}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#9D4EDD', '#7B2CBF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}>
                  <Icon name="bolt" size={14} color="#FFD700" />
                  <Text style={styles.primaryButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={onWithdrawPress}
                activeOpacity={0.7}
              >
                <Icon name="exchange-alt" size={14} color="#E0E0E0" />
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
    marginVertical: 20,
    alignItems: 'center',
    width: '100%',
  },
  shadowContainer: {
    borderRadius: 20,
  },
  gradientContainer: {
    borderRadius: 20,
    padding: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },

  contentContainer: {
    position: 'relative',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
    letterSpacing: 0.3,
  },
  balanceRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(157, 78, 221, 0.15)',
  },
  detailsButtonText: {
    color: '#F5F5F5',
    fontSize: 12,
    fontWeight: '500',
  },
  buttonIcon: {
    marginLeft: 4,
  },
  growthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  growthText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  primaryButton: {
    width: '48%',
    height: 46,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#9D4EDD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#E0E0E0',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 8,
  },

});

export default Balance;