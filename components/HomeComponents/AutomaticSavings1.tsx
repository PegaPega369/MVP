import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

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
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>Smart Autopilot</Text>
        <TouchableOpacity style={styles.manageButton}>
          <Text style={styles.manageButtonText}>Manage</Text>
          <Icon name="cog" size={12} color="#8A2BE2" style={{marginLeft: 5}} />
        </TouchableOpacity>
      </View>

      <View style={styles.descriptiveText}>
        <Text style={styles.descriptiveTextContent}>
          Automate your investments and achieve goals on autopilot
        </Text>
      </View>
      
      <View style={styles.cardsContainer}>
        {/* Round-Off Savings Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={onRoundOffPress}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#0A0A0A', '#121212']}
            style={styles.cardGradient}
          >
            <View style={styles.cardContent}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(138, 43, 226, 0.1)' }]}>
                <Icon name="coins" size={20} color="#8A2BE2" />
              </View>
              
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Round-Off Savings</Text>
                <Text style={styles.cardDescription}>Automatically save spare change from transactions</Text>
                
                <View style={styles.cardStatsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>₹2,450</Text>
                    <Text style={styles.statLabel}>Total Saved</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>182</Text>
                    <Text style={styles.statLabel}>Transactions</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.switchContainer}>
                <Icon name="toggle-on" size={24} color="#8A2BE2" />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        
        {/* Daily/Weekly/Monthly Options Container */}
        <View style={styles.optionsContainer}>
          {/* Daily Savings */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={onDailySavingsPress}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <View style={[styles.smallIconContainer, { backgroundColor: 'rgba(255, 193, 7, 0.1)' }]}>
                <Icon name="calendar-day" size={16} color="#FFC107" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Daily</Text>
                <Text style={styles.optionDescription}>₹50/day</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          {/* Weekly Savings */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={onWeeklySavingsPress}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <View style={[styles.smallIconContainer, { backgroundColor: 'rgba(0, 191, 166, 0.1)' }]}>
                <Icon name="calendar-week" size={16} color="#00BFA6" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Weekly</Text>
                <Text style={styles.optionDescription}>₹200/week</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          {/* Monthly Savings */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={onMonthlySavingsPress}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <View style={[styles.smallIconContainer, { backgroundColor: 'rgba(3, 169, 244, 0.1)' }]}>
                <Icon name="calendar-alt" size={16} color="#03A9F4" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Monthly</Text>
                <Text style={styles.optionDescription}>₹1,000/month</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 100, // Extra space for navbar
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headingText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  manageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  manageButtonText: {
    color: '#8A2BE2',
    fontSize: 12,
    fontWeight: '600',
  },
  descriptiveText: {
    marginBottom: 20,
  },
  descriptiveTextContent: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 16,
  },
  cardGradient: {
    padding: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 14,
    lineHeight: 16,
  },
  cardStatsRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  statItem: {
    marginRight: 16,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8A2BE2',
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  switchContainer: {
    marginLeft: 'auto',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  optionCard: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#0A0A0A',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    height: 90,
    padding: 12,
  },
  optionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionTextContainer: {
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
  }
});

export default AutomaticSavings;