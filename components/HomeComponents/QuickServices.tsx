import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SHADOWS } from './theme';

const { width } = Dimensions.get('window');

interface QuickServicesProps {
  onExpensesPress: () => void;
  onGoalSavingsPress: () => void;
  onSIPCalculatorPress: () => void;
}

const QuickServices: React.FC<QuickServicesProps> = ({
  onExpensesPress,
  onGoalSavingsPress,
  onSIPCalculatorPress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Quick Services</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.servicesContainer}>
        {/* Expense Tracker */}
        <TouchableOpacity
          style={styles.serviceCard}
          onPress={onExpensesPress}
        >
          <View style={styles.serviceContent}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(244, 67, 54, 0.2)' }]}>
              <Icon name="wallet" size={20} color={COLORS.error} />
            </View>
            <Text style={styles.serviceTitle}>Expense Tracker</Text>
            <Text style={styles.serviceDescription}>Track daily expenses and set budgets</Text>
          </View>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(244, 67, 54, 0.1)']}
            style={styles.gradientOverlay}
          />
        </TouchableOpacity>
        
        {/* Goal Savings */}
        <TouchableOpacity
          style={styles.serviceCard}
          onPress={onGoalSavingsPress}
        >
          <View style={styles.serviceContent}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(76, 175, 80, 0.2)' }]}>
              <Icon name="bullseye" size={20} color={COLORS.success} />
            </View>
            <Text style={styles.serviceTitle}>Goal Savings</Text>
            <Text style={styles.serviceDescription}>Create and track your savings goals</Text>
          </View>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(76, 175, 80, 0.1)']}
            style={styles.gradientOverlay}
          />
        </TouchableOpacity>
        
        {/* SIP Calculator */}
        <TouchableOpacity
          style={styles.serviceCard}
          onPress={onSIPCalculatorPress}
        >
          <View style={styles.serviceContent}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(33, 150, 243, 0.2)' }]}>
              <Icon name="calculator" size={20} color={COLORS.info} />
            </View>
            <Text style={styles.serviceTitle}>SIP Calculator</Text>
            <Text style={styles.serviceDescription}>Plan your investments with our calculator</Text>
          </View>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(33, 150, 243, 0.1)']}
            style={styles.gradientOverlay}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  viewAllButton: {
    padding: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: COLORS.primaryLight,
  },
  servicesContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  serviceCard: {
    width: '100%',
    height: 80,
    borderRadius: 16,
    backgroundColor: COLORS.cardDark,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.small,
  },
  serviceContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    zIndex: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    width: 110,
  },
  serviceDescription: {
    fontSize: 12,
    color: COLORS.textMuted,
    flex: 1,
    paddingHorizontal: 8,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 1,
  },
});

export default QuickServices;