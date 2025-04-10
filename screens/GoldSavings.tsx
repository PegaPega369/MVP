import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  TextInput,
  Animated,
  StatusBar
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

// Chart data for different timeframes
const chartData = {
  day: [62, 64, 63, 65, 67, 66, 68, 70, 69, 72, 73, 74],
  week: [64, 63, 65, 68, 67, 69, 72, 74, 73, 75, 78, 77],
  month: [62, 65, 64, 67, 70, 68, 72, 75, 74, 77, 80, 78],
  halfYear: [60, 62, 65, 68, 71, 70, 73, 75, 78, 80, 82, 85]
};

// Benefits data
const benefits = [
  {
    title: "Tax Benefits",
    description: "Digital gold held for more than 36 months qualifies for long-term capital gains tax benefits.",
    icon: "chart-line-variant"
  },
  {
    title: "Inflation Hedge",
    description: "Gold traditionally retains value and protects against inflation over time.",
    icon: "shield-outline"
  },
  {
    title: "Portfolio Diversification",
    description: "Adding gold to your portfolio reduces overall risk due to its low correlation with stocks.",
    icon: "chart-pie"
  },
  {
    title: "High Liquidity",
    description: "Digital gold can be sold instantly at prevailing market prices with minimal effort.",
    icon: "cash-fast"
  }
];

// Quick select amount options
const quickAmounts = [100, 200, 500, 1000, 5000];

// Define chart height
const CHART_HEIGHT = 180;

interface RouteParams {
  uid: string;
}

const PremiumSilverInvestment: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { uid } = route.params as RouteParams;
  
  const [timeframe, setTimeframe] = useState('day');
  const [amount, setAmount] = useState('');
  const [gramsEquivalent, setGramsEquivalent] = useState('0.00');
  const [selectedTab, setSelectedTab] = useState('invest');
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  
  // Calculate silver grams equivalent based on input amount
  const calculateGrams = (value: string) => {
    const numValue = parseFloat(value) || 0;
    // Assuming current silver price is ₹78.45 per gram
    const grams = (numValue / 78.45).toFixed(2);
    setGramsEquivalent(grams);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    calculateGrams(value);
  };

  const handleQuickAmountSelect = (value: number) => {
    setAmount(value.toString());
    calculateGrams(value.toString());
  };

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const renderTimeframeButton = (value: string, label: string) => (
    <TouchableOpacity
      style={[
        styles.timeframeButton,
        timeframe === value && styles.activeTimeframeButton
      ]}
      onPress={() => setTimeframe(value)}
    >
      <Text
        style={[
          styles.timeframeButtonText,
          timeframe === value && styles.activeTimeframeButtonText
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderTabButton = (value: string, label: string, icon: string) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        selectedTab === value && styles.activeTabButton
      ]}
      onPress={() => setSelectedTab(value)}
    >
      <Icon
        name={icon}
        size={20}
        color={selectedTab === value ? '#FFF' : 'rgba(255, 255, 255, 0.6)'}
      />
      <Text
        style={[
          styles.tabButtonText,
          selectedTab === value && styles.activeTabButtonText
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderChart = () => {
    const data = chartData[timeframe as keyof typeof chartData];
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    
    return (
      <View style={styles.chartContainer}>
        {/* Y-axis labels */}
        <View style={styles.yAxisLabels}>
          <Text style={styles.axisLabel}>₹{Math.round(maxValue * 1000)}</Text>
          <Text style={styles.axisLabel}>₹{Math.round((maxValue - range/2) * 1000)}</Text>
          <Text style={styles.axisLabel}>₹{Math.round(minValue * 1000)}</Text>
        </View>
        
        {/* Chart */}
        <View style={styles.chartContent}>
          {/* Grid lines */}
          <View style={[styles.gridLine, { top: 0 }]} />
          <View style={[styles.gridLine, { top: CHART_HEIGHT / 2 }]} />
          <View style={[styles.gridLine, { top: CHART_HEIGHT - 1 }]} />
          
          {/* Chart bars */}
          <View style={styles.barsContainer}>
            {data.map((value, index) => {
              const barHeight = ((value - minValue) / range) * CHART_HEIGHT;
              const isLast = index === data.length - 1;
              
              return (
                <View key={index} style={styles.barColumn}>
                  <View 
                    style={[
                      styles.bar, 
                      {
                        height: barHeight,
                        backgroundColor: isLast ? '#9D6DF9' : 'rgba(157, 109, 249, 0.5)'
                      }
                    ]}
                  />
                  {isLast && (
                    <View style={styles.currentPriceDot}>
                      <View style={styles.dotInner} />
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header backdrop for scroll effect */}
      <Animated.View 
        style={[
          styles.headerBackdrop,
          { opacity: headerOpacity }
        ]}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Gold Investment</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Silver Price Card
        <View style={styles.priceCardContainer}>
          <Animated.View
            style={[
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
            
          >
            
          
            <View style={styles.priceCard}>
              <View style={styles.priceCardHeader}>
                <View style={styles.silverBadge}>
                  <Icon name="brightness-7" size={16} color="#FFFFFF" />
                  <Text style={styles.silverText}>Silver</Text>
                </View>
                <View style={styles.priceChange}>
                  <Icon name="arrow-up" size={12} color="#4CD964" />
                  <Text style={styles.priceChangeText}>+2.45%</Text>
                </View>
              </View>

              <View style={styles.priceDisplay}>
                <Text style={styles.currentPrice}>₹78,450</Text>
                <Text style={styles.perUnitText}>per kg</Text>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>24h High</Text>
                  <Text style={styles.statValue}>₹78,690</Text>
                </View>
                <View style={styles.statSeparator} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>24h Low</Text>
                  <Text style={styles.statValue}>₹76,120</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </View> */}
        {/* Silver Price Card */}
<View style={styles.priceCardContainer}>
  <Animated.View
    style={[
      {
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }
    ]}
  >
    <LinearGradient
      colors={['#231537', '#4B0082']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.priceCard}
    >
      <View style={styles.priceCardHeader}>
        <View style={styles.silverBadge}>
          <Icon name="gold" size={16} color="#FFFFFF" />
          <Text style={styles.silverText}>Gold</Text>
        </View>
        <View style={styles.priceChange}>
          <Icon name="arrow-up" size={12} color="#4CD964" />
          <Text style={styles.priceChangeText}>+2.45%</Text>
        </View>
      </View>

      <View style={styles.priceDisplay}>
        <Text style={styles.currentPrice}>₹78,450</Text>
        <Text style={styles.perUnitText}>per kg</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>24h High</Text>
          <Text style={styles.statValue}>₹78,690</Text>
        </View>
        <View style={styles.statSeparator} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>24h Low</Text>
          <Text style={styles.statValue}>₹76,120</Text>
        </View>
      </View>
    </LinearGradient>
  </Animated.View>
</View>

        {/* Chart section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Price Trend</Text>
          
          <View style={styles.card}>
            <View style={styles.timeframeSelector}>
              {renderTimeframeButton('day', '1D')}
              {renderTimeframeButton('week', '1W')}
              {renderTimeframeButton('month', '1M')}
              {renderTimeframeButton('halfYear', '6M')}
            </View>
            
            {renderChart()}
          </View>
        </View>

        {/* Tabs for Invest/Benefits */}
        <View style={styles.sectionContainer}>
          <View style={styles.tabsContainer}>
            {renderTabButton('invest', 'Invest', 'cash-plus')}
            {renderTabButton('benefits', 'Benefits', 'star-outline')}
          </View>
        </View>

        {/* Tab content */}
        {selectedTab === 'invest' ? (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Buy Digital Gold</Text>
            
            <View style={styles.card}>
              <Text style={styles.inputLabel}>Enter Amount (₹)</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>₹</Text>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={handleAmountChange}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                />
              </View>
              
              <Text style={styles.gramsConversion}>
                ≈ {gramsEquivalent} grams of digital gold
              </Text>
              
              <Text style={styles.quickSelectLabel}>Quick Select</Text>
              <View style={styles.quickSelectContainer}>
                {quickAmounts.map((value) => (
                  <TouchableOpacity
                    key={value}
                    style={[
                      styles.quickSelectButton,
                      amount === value.toString() && styles.activeQuickSelectButton
                    ]}
                    onPress={() => handleQuickAmountSelect(value)}
                  >
                    <Text
                      style={[
                        styles.quickSelectText,
                        amount === value.toString() && styles.activeQuickSelectText
                      ]}
                    >
                      ₹{value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.infoContainer}>
              <Icon name="shield-check" size={20} color="#9D6DF9" />
              <Text style={styles.infoText}>
                Your digital gold is 100% backed by physical gold and securely stored in our vault.
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Benefits of Gold Investment</Text>
            
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.benefitHeader}>
                  <Icon name={benefit.icon} size={24} color="#9D6DF9" />
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                </View>
                <Text style={styles.benefitDescription}>{benefit.description}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      
      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <LinearGradient
          colors={['#231537', '#4B0082']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <TouchableOpacity 
            style={styles.proceedButton}
            activeOpacity={0.8}
            disabled={!amount && selectedTab === 'invest'}
          >
            <Text style={styles.proceedButtonText}>
              {selectedTab === 'invest' ? 'Buy Now' : 'Start Investing'}
            </Text>
            {selectedTab === 'invest' && (
              <Icon name="arrow-right" size={18} color="#FFFFFF" style={styles.buttonIcon} />
            )}
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  },
  backButton: {
    padding: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  menuButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  priceCardContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  priceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  priceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  silverBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(157, 109, 249, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  silverText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  priceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 217, 100, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  priceChangeText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#4CD964',
  },
  priceDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  perUnitText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    alignItems: 'center',
  },
  statSeparator: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sectionContainer: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  timeframeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeframeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeTimeframeButton: {
    backgroundColor: 'rgba(157, 109, 249, 0.2)',
  },
  timeframeButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  activeTimeframeButtonText: {
    color: '#FFFFFF',
  },
  chartContainer: {
    flexDirection: 'row',
    height: CHART_HEIGHT,
    marginTop: 8,
  },
  yAxisLabels: {
    width: 54,
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  axisLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'right',
  },
  chartContent: {
    flex: 1,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  bar: {
    width: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(157, 109, 249, 0.5)',
  },
  currentPriceDot: {
    position: 'absolute',
    top: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#9D6DF9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFF',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: 'rgba(157, 109, 249, 0.2)',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.6)',
    marginLeft: 8,
  },
  activeTabButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.6)',
    marginRight: 4,
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingVertical: 4,
  },
  gramsConversion: {
    fontSize: 14,
    color: '#9D6DF9',
    textAlign: 'right',
    marginBottom: 20,
  },
  quickSelectLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  quickSelectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  quickSelectButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginHorizontal: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeQuickSelectButton: {
    backgroundColor: 'rgba(157, 109, 249, 0.2)',
    borderColor: '#9D6DF9',
  },
  quickSelectText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeQuickSelectText: {
    color: '#FFFFFF',
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(157, 109, 249, 0.1)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  benefitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  benefitDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  gradientButton: {
    borderRadius: 12,
  },
  proceedButton: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});

export default PremiumSilverInvestment;