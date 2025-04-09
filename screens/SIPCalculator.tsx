import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { PieChart } from 'react-native-chart-kit';
import { COLORS, SHADOWS } from '../components/ProfileComponents/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface RouteParams {
  uid: string;
}

// Types for SIP calculation steps
interface Step {
  title: string;
  description: string;
  formula: string;
  result: string;
}

const SIPCalculator: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { uid } = route.params as RouteParams;
  
  // Form values
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('5000');
  const [returnRate, setReturnRate] = useState<string>('12');
  const [timePeriod, setTimePeriod] = useState<string>('10');
  
  // Step-by-step calculation visibility
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("SIP");
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  
  // Shimmer effect
  const shimmerValue = useRef(new Animated.Value(0)).current;
  const shimmerPosition = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-350, SCREEN_WIDTH + 350]
  });

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    
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
    
    // Shimmer animation loop
    const runShimmer = () => {
      shimmerValue.setValue(0);
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 3500, // Slower shimmer animation
        useNativeDriver: false,
      }).start(() => {
        setTimeout(runShimmer, 2000); // Longer pause between animations
      });
    };
    
    runShimmer();
  }, []);
  
  // Calculation functions with precise math
  const calculateSIP = () => {
    const monthly = parseFloat(monthlyInvestment) || 0;
    const rate = parseFloat(returnRate) || 0;
    const years = parseFloat(timePeriod) || 0;
    
    const totalMonths = years * 12;
    const monthlyRate = rate / 100 / 12;
    const investedAmount = monthly * totalMonths;
    
    // Using the compound interest formula for SIP
    const futureValue = monthly * 
      (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * 
      (1 + monthlyRate));
    
    const estimatedReturns = futureValue - investedAmount;
    const totalValue = investedAmount + estimatedReturns;
    
    // CAGR calculation for verification
    const cagr = (Math.pow(totalValue / investedAmount, 1 / years) - 1) * 100;
    
    return {
      investedAmount: Math.round(investedAmount),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(totalValue),
      cagr: cagr.toFixed(2)
    };
  };
  
  // Generate calculation steps for educational purposes
  const generateSteps = () => {
    const monthly = parseFloat(monthlyInvestment) || 0;
    const rate = parseFloat(returnRate) || 0;
    const years = parseFloat(timePeriod) || 0;
    
    const totalMonths = years * 12;
    const monthlyRate = rate / 100 / 12;
    const investedAmount = monthly * totalMonths;
    
    const steps: Step[] = [
      {
        title: "Step 1: Calculate Invested Amount",
        description: "Multiply monthly investment by total months",
        formula: `₹${monthly.toLocaleString()} × ${totalMonths} months`,
        result: `₹${investedAmount.toLocaleString()}`
      },
      {
        title: "Step 2: Calculate Monthly Growth Rate",
        description: "Convert annual rate to monthly rate",
        formula: `${rate}% ÷ 12 months = ${(monthlyRate * 100).toFixed(4)}% per month`,
        result: `Monthly rate: ${(monthlyRate * 100).toFixed(4)}%`
      },
      {
        title: "Step 3: Apply SIP Formula",
        description: "Calculate final amount using compound interest formula",
        formula: `P × ((1 + r)ⁿ - 1) / r × (1 + r)`,
        result: `Future value: ₹${Math.round(calculateSIP().totalValue).toLocaleString()}`
      },
      {
        title: "Step 4: Calculate Returns",
        description: "Subtract invested amount from total value",
        formula: `₹${Math.round(calculateSIP().totalValue).toLocaleString()} - ₹${investedAmount.toLocaleString()}`,
        result: `Returns: ₹${Math.round(calculateSIP().estimatedReturns).toLocaleString()}`
      }
    ];
    
    return steps;
  };
  
  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-IN');
  };
  
  const { investedAmount, estimatedReturns, totalValue, cagr } = calculateSIP();
  const steps = generateSteps();
  
  // Prepare data for pie chart
  const chartData = [
    {
      name: 'Invested',
      population: investedAmount,
      color: '#673AB7',
      legendFontColor: '#fff',
      legendFontSize: 12,
    },
    {
      name: 'Returns',
      population: estimatedReturns,
      color: '#8A2BE2',
      legendFontColor: '#fff',
      legendFontSize: 12,
    },
  ];
  
  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: '#000',
    backgroundGradientTo: '#000',
    color: (opacity = 1) => `rgba(138, 43, 226, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0,
  };
  
  // Calculate inflation-adjusted value
  const calculateInflationAdjustedValue = () => {
    const inflationRate = 6; // Default inflation rate (India average)
    const years = parseFloat(timePeriod) || 10;
    const futureValue = totalValue;
    
    // Inflation adjustment formula: PV = FV / (1 + inflation)^years
    const inflationAdjustedValue = futureValue / Math.pow(1 + (inflationRate / 100), years);
    
    return Math.round(inflationAdjustedValue);
  };
  
  const inflationAdjustedValue = calculateInflationAdjustedValue();
  
  return (
    <View style={styles.background}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Removed decorative background circles */}
      
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Animated Content */}
        <Animated.View
          style={[
            styles.headerContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => setShowSteps(!showSteps)}
            >
              <Icon 
                name={showSteps ? "calculator-off" : "calculator"} 
                size={22} 
                color="#C9A1FF"
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.headerTitle}>Investment Calculator</Text>
          <Text style={styles.headerSubtitle}>Plan your wealth creation journey</Text>
          
          {/* Calculator Type Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'SIP' && styles.activeTab]}
              onPress={() => setActiveTab('SIP')}
            >
              <Text style={[styles.tabText, activeTab === 'SIP' && styles.activeTabText]}>
                SIP
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Lumpsum' && styles.activeTab]}
              onPress={() => setActiveTab('Lumpsum')}
            >
              <Text style={[styles.tabText, activeTab === 'Lumpsum' && styles.activeTabText]}>
                Lumpsum
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Goal' && styles.activeTab]}
              onPress={() => setActiveTab('Goal')}
            >
              <Text style={[styles.tabText, activeTab === 'Goal' && styles.activeTabText]}>
                Goal
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        {/* Form Inputs */}
        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          {/* Monthly Investment */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Monthly Investment <Text style={styles.currency}>(₹)</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={monthlyInvestment}
                onChangeText={setMonthlyInvestment}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                selectionColor="#8A2BE2"
              />
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1000}
              maximumValue={100000}
              step={1000}
              value={parseFloat(monthlyInvestment) || 5000}
              onValueChange={(value) => setMonthlyInvestment(value.toString())}
              minimumTrackTintColor="#8A2BE2"
              maximumTrackTintColor="rgba(255, 255, 255, 0.15)"
              thumbTintColor="#C9A1FF"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderMinLabel}>₹1,000</Text>
              <Text style={styles.sliderMaxLabel}>₹1,00,000</Text>
            </View>
          </View>

          {/* Return Rate */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Expected Return Rate (%)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={returnRate}
                onChangeText={setReturnRate}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                selectionColor="#8A2BE2"
              />
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={30}
              step={0.5}
              value={parseFloat(returnRate) || 12}
              onValueChange={(value) => setReturnRate(value.toString())}
              minimumTrackTintColor="#8A2BE2"
              maximumTrackTintColor="rgba(255, 255, 255, 0.15)"
              thumbTintColor="#C9A1FF"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderMinLabel}>1%</Text>
              <Text style={styles.sliderMaxLabel}>30%</Text>
            </View>
          </View>

          {/* Time Period */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Time Period (Years)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={timePeriod}
                onChangeText={setTimePeriod}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                selectionColor="#8A2BE2"
              />
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={30}
              step={1}
              value={parseFloat(timePeriod) || 10}
              onValueChange={(value) => setTimePeriod(value.toString())}
              minimumTrackTintColor="#8A2BE2"
              maximumTrackTintColor="rgba(255, 255, 255, 0.15)"
              thumbTintColor="#C9A1FF"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderMinLabel}>1 yr</Text>
              <Text style={styles.sliderMaxLabel}>30 yrs</Text>
            </View>
          </View>
        </Animated.View>
          
        {/* Results Section */}
        <Animated.View
          style={[
            styles.resultSection,
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
            style={styles.resultCardGradient}
          >
            <View style={styles.resultCard}>
              <View style={styles.shineOverlay}>
                <Animated.View 
                  style={[
                    styles.shimmerEffect,
                    {
                      transform: [{ translateX: shimmerPosition }]
                    }
                  ]}
                >
                  <LinearGradient
                    colors={[
                      'rgba(255,255,255,0)',
                      'rgba(255,255,255,0.03)',
                      'rgba(255,255,255,0.1)',
                      'rgba(255,255,255,0.15)',
                      'rgba(255,255,255,0.1)',
                      'rgba(255,255,255,0.03)',
                      'rgba(255,255,255,0)'
                    ]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.shimmerGradient}
                  />
                </Animated.View>
              </View>
              
              <View style={styles.resultHeaderRow}>
                <Text style={styles.resultTitle}>Investment Growth</Text>
                <Text style={styles.cagrValue}>CAGR: {cagr}%</Text>
              </View>
              
              <Text style={styles.totalValueLabel}>Future Value</Text>
              <Text style={styles.totalValue}>₹{formatNumber(totalValue)}</Text>
              
              <View style={styles.breakdownRow}>
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownLabel}>Amount Invested</Text>
                  <Text style={styles.breakdownValue}>₹{formatNumber(investedAmount)}</Text>
                </View>
                
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownLabel}>Est. Returns</Text>
                  <Text style={styles.breakdownValue}>₹{formatNumber(estimatedReturns)}</Text>
                </View>
              </View>
              
              <View style={styles.inflationNotice}>
                <Icon name="alert-circle-outline" size={16} color="#A68BD7" style={styles.inflationIcon} />
                <Text style={styles.inflationText}>
                  Inflation-adjusted value: ₹{formatNumber(inflationAdjustedValue)}
                </Text>
              </View>
            </View>
          </LinearGradient>
          
          {/* Pie Chart - Centered */}
          <View style={styles.chartContainer}>
            <View style={styles.pieChartWrapper}>
              <PieChart
                data={chartData}
                width={SCREEN_WIDTH - 80}
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="0"
                absolute={false}
                hasLegend={false}
                center={[0, 0]} 
              />
            </View>
            
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#673AB7' }]} />
                <Text style={styles.legendText}>
                  Principal: {Math.round((investedAmount / totalValue) * 100)}%
                </Text>
              </View>
              
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#8A2BE2' }]} />
                <Text style={styles.legendText}>
                  Returns: {Math.round((estimatedReturns / totalValue) * 100)}%
                </Text>
              </View>
            </View>
          </View>
          
          {/* Milestones */}
          <View style={styles.milestonesSection}>
            <Text style={styles.milestoneTitle}>Investment Milestones</Text>
            
            <View style={styles.milestoneRow}>
              <View style={styles.milestoneItem}>
                <LinearGradient
                  colors={['rgba(35, 21, 55, 0.7)', 'rgba(75, 0, 130, 0.5)']}
                  style={styles.milestoneIconContainer}
                >
                  <Icon name="calendar-clock" size={20} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.milestoneValue}>
                  ₹{formatNumber(Math.round(totalValue * 0.25))}
                </Text>
                <Text style={styles.milestoneLabel}>
                  {Math.round(parseFloat(timePeriod) * 0.25)} years
                </Text>
              </View>
              
              <View style={styles.milestoneItem}>
                <LinearGradient
                  colors={['rgba(35, 21, 55, 0.7)', 'rgba(75, 0, 130, 0.5)']}
                  style={styles.milestoneIconContainer}
                >
                  <Icon name="calendar-check" size={20} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.milestoneValue}>
                  ₹{formatNumber(Math.round(totalValue * 0.5))}
                </Text>
                <Text style={styles.milestoneLabel}>
                  {Math.round(parseFloat(timePeriod) * 0.5)} years
                </Text>
              </View>
              
              <View style={styles.milestoneItem}>
                <LinearGradient
                  colors={['rgba(35, 21, 55, 0.7)', 'rgba(75, 0, 130, 0.5)']}
                  style={styles.milestoneIconContainer}
                >
                  <Icon name="trophy-outline" size={20} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.milestoneValue}>
                  ₹{formatNumber(Math.round(totalValue * 0.75))}
                </Text>
                <Text style={styles.milestoneLabel}>
                  {Math.round(parseFloat(timePeriod) * 0.75)} years
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
        
        {/* Step-by-step breakdown */}
        {showSteps && (
          <Animated.View 
            style={[
              styles.stepsContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.stepsHeading}>How SIP Calculation Works</Text>
            
            {steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepNumberContainer}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDesc}>{step.description}</Text>
                  <LinearGradient
                    colors={['rgba(35, 21, 55, 0.5)', 'rgba(75, 0, 130, 0.3)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.formulaBox}
                  >
                    <Text style={styles.formula}>{step.formula}</Text>
                  </LinearGradient>
                  <Text style={styles.stepResult}>{step.result}</Text>
                </View>
              </View>
            ))}
            
            <View style={styles.educationalInfo}>
              <View style={styles.educationalHeader}>
                <Icon name="lightbulb-on" size={22} color="#C9A1FF" />
                <Text style={styles.educationalTitle}>What is CAGR?</Text>
              </View>
              <Text style={styles.educationalText}>
                Compound Annual Growth Rate (CAGR) represents the annual rate of return 
                that would be required for an investment to grow from its beginning value 
                to its ending value, assuming the profits were reinvested at the end of each year.
              </Text>
            </View>
            
            <View style={styles.educationalInfo}>
              <View style={styles.educationalHeader}>
                <Icon name="cash-multiple" size={22} color="#C9A1FF" />
                <Text style={styles.educationalTitle}>Power of Compounding</Text>
              </View>
              <Text style={styles.educationalText}>
                Compounding allows your investments to grow exponentially over time as you earn returns 
                not only on your principal amount but also on the accumulated returns. 
                Starting early, even with smaller amounts, can lead to significant wealth creation over the long term.
              </Text>
            </View>
            
            <TouchableOpacity style={styles.closeStepsButton} onPress={() => setShowSteps(false)}>
              <Text style={styles.closeStepsText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        
        {/* Action Button */}
        <Animated.View
          style={[
            styles.actionButtonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.actionButtonWrapper}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#231537', '#4B0082']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>Start Investing</Text>
              <View style={styles.actionButtonIcon}>
                <Icon name="arrow-right" size={22} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    paddingBottom: 40,
  },
  decorationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  blurCircle: {
    position: 'absolute',
    borderRadius: 300,
    opacity: 0.2,
  },
  // Removed blur circles as requested
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#A68BD7',
    marginBottom: 25,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(25, 25, 35, 0.6)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#4B0082',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A68BD7',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  currency: {
    color: '#C9A1FF',
    fontWeight: '400',
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
  },
  input: {
    height: 50,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  sliderMinLabel: {
    fontSize: 12,
    color: '#A68BD7',
  },
  sliderMaxLabel: {
    fontSize: 12,
    color: '#A68BD7',
  },
  resultSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  resultCardGradient: {
    borderRadius: 20,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#8A2BE2',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  resultCard: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'stretch',
    overflow: 'hidden',
    width: '100%',
  },
  shineOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  shimmerEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  shimmerGradient: {
    flex: 1,
  },
  resultHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cagrValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C9A1FF',
  },
  totalValueLabel: {
    fontSize: 14,
    color: '#A68BD7',
    marginBottom: 8,
    alignSelf: 'center',
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    alignSelf: 'center',
  },
  breakdownRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  breakdownItem: {
    flex: 1,
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#A68BD7',
    marginBottom: 4,
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  inflationNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    borderRadius: 8,
    padding: 10,
  },
  inflationIcon: {
    marginRight: 8,
  },
  inflationText: {
    fontSize: 13,
    color: '#A68BD7',
    flex: 1,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  pieChartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#A68BD7',
  },
  milestonesSection: {
    marginBottom: 24,
  },
  milestoneTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  milestoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  milestoneItem: {
    alignItems: 'center',
    flex: 1,
  },
  milestoneIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  milestoneValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  milestoneLabel: {
    fontSize: 12,
    color: '#A68BD7',
  },
  stepsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  stepsHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 2,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  stepDesc: {
    fontSize: 14,
    color: '#A68BD7',
    marginBottom: 12,
    lineHeight: 20,
  },
  formulaBox: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  formula: {
    fontSize: 14,
    color: '#C9A1FF',
    fontWeight: '500',
  },
  stepResult: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  educationalInfo: {
    backgroundColor: 'rgba(25, 20, 40, 0.5)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  educationalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  educationalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  educationalText: {
    fontSize: 14,
    color: '#A68BD7',
    lineHeight: 22,
  },
  closeStepsButton: {
    backgroundColor: 'rgba(138, 43, 226, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  closeStepsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C9A1FF',
  },
  actionButtonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#8A2BE2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  actionButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  actionButtonIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SIPCalculator;