import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SHADOWS } from './theme';

const { width } = Dimensions.get('window');

interface AutomaticSavingsProps {
  onRoundOffPress: () => void;
  onDailySavingsPress: () => void;
  onWeeklySavingsPress: () => void;
  onMonthlySavingsPress: () => void;
}

const AutomaticSavings: React.FC<AutomaticSavingsProps> = ({
  onRoundOffPress,
  onDailySavingsPress,
  onWeeklySavingsPress,
  onMonthlySavingsPress
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Automatic Savings</Text>
      
      <View style={styles.cardsContainer}>
        <View style={styles.row}>
          {/* Round-Off Savings */}
          <TouchableOpacity
            style={styles.card}
            onPress={onRoundOffPress}
          >
            <LinearGradient
              colors={COLORS.darkPurpleGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradientBackground}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Icon name="coins" size={20} color={COLORS.primaryLight} />
                </View>
                <Text style={styles.cardTitle}>Round-Off</Text>
                <Text style={styles.cardDescription}>Invest spare change from transactions</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          {/* Daily Savings */}
          <TouchableOpacity
            style={styles.card}
            onPress={onDailySavingsPress}
          >
            <LinearGradient
              colors={COLORS.darkPurpleGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradientBackground}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Icon name="calendar-day" size={20} color={COLORS.primaryLight} />
                </View>
                <Text style={styles.cardTitle}>Daily Savings</Text>
                <Text style={styles.cardDescription}>Set amount to save every day</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        <View style={styles.row}>
          {/* Weekly Savings */}
          <TouchableOpacity
            style={styles.card}
            onPress={onWeeklySavingsPress}
          >
            <LinearGradient
              colors={COLORS.darkPurpleGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradientBackground}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Icon name="calendar-week" size={20} color={COLORS.primaryLight} />
                </View>
                <Text style={styles.cardTitle}>Weekly Savings</Text>
                <Text style={styles.cardDescription}>Save at the end of each week</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          {/* Monthly Savings */}
          <TouchableOpacity
            style={styles.card}
            onPress={onMonthlySavingsPress}
          >
            <LinearGradient
              colors={COLORS.darkPurpleGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradientBackground}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Icon name="calendar-alt" size={20} color={COLORS.primaryLight} />
                </View>
                <Text style={styles.cardTitle}>Monthly Savings</Text>
                <Text style={styles.cardDescription}>Schedule savings for salary day</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 16,
    marginBottom: 100, // Extra space for navbar
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  cardsContainer: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    flex: 1,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  gradientBackground: {
    flex: 1,
    padding: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 16,
  },
});

export default AutomaticSavings;