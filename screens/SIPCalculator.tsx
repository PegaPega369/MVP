import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { PieChart } from 'react-native-chart-kit';
import { COLORS, SHADOWS } from '../components/ProfileComponents/theme';

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
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(1))[0];
  const scaleAnim = useState(new Animated.Value(1))[0];
  
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
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
  
  // Handle animation when recalculating
  const animateResult = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  };
  
  // Recalculate on any input change
  useEffect(() => {
    animateResult();
  }, [monthlyInvestment, returnRate, timePeriod]);
  
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
  
  return (
    <View style={styles.background}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color={COLORS.text} />
          </TouchableOpacity>
          
          <Text style={styles.headerText}>SIP Calculator</Text>
          
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => setShowSteps(!showSteps)}
          >
            <Icon 
              name={showSteps ? "calculator-off" : "calculator"} 
              size={24} 
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        
        {/* Form Inputs */}
        <View style={styles.formContainer}>
          {/* Monthly Investment */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Monthly Investment <Text style={styles.currency}>(₹)</Text>
            </Text>
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={monthlyInvestment}
                  onChangeText={setMonthlyInvestment}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  selectionColor={COLORS.primary}
                />
              </View>
              <View style={styles.quickActionButtons}>
                <TouchableOpacity
                  style={styles.quickButton}
                  onPress={() => setMonthlyInvestment(
                    (parseFloat(monthlyInvestment) - 1000 > 0 ? 
                    parseFloat(monthlyInvestment) - 1000 : 0).toString()
                  )}
                >
                  <Text style={styles.quickButtonText}>-1K</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.quickButton}
                  onPress={() => setMonthlyInvestment(
                    (parseFloat(monthlyInvestment) + 1000).toString()
                  )}
                >
                  <Text style={styles.quickButtonText}>+1K</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1000}
              maximumValue={100000}
              step={1000}
              value={parseFloat(monthlyInvestment) || 5000}
              onValueChange={(value) => setMonthlyInvestment(value.toString())}
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
              thumbTintColor={COLORS.primary}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>₹1K</Text>
              <Text style={styles.sliderLabel}>₹50K</Text>
              <Text style={styles.sliderLabel}>₹100K</Text>
            </View>
          </View>

          {/* Return Rate */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Expected Return Rate (%)</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={returnRate}
                  onChangeText={setReturnRate}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  selectionColor={COLORS.primary}
                />
              </View>
              <View style={styles.quickActionButtons}>
                <TouchableOpacity
                  style={styles.quickButton}
                  onPress={() => setReturnRate(
                    (parseFloat(returnRate) - 1 > 0 ? 
                    parseFloat(returnRate) - 1 : 0).toString()
                  )}
                >
                  <Text style={styles.quickButtonText}>-1%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.quickButton}
                  onPress={() => setReturnRate(
                    (parseFloat(returnRate) + 1).toString()
                  )}
                >
                  <Text style={styles.quickButtonText}>+1%</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={30}
              step={0.5}
              value={parseFloat(returnRate) || 12}
              onValueChange={(value) => setReturnRate(value.toString())}
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
              thumbTintColor={COLORS.primary}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>1%</Text>
              <Text style={styles.sliderLabel}>15%</Text>
              <Text style={styles.sliderLabel}>30%</Text>
            </View>
          </View>

          {/* Time Period */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Time Period (Years)</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={timePeriod}
                  onChangeText={setTimePeriod}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  selectionColor={COLORS.primary}
                />
              </View>
              <View style={styles.quickActionButtons}>
                <TouchableOpacity
                  style={styles.quickButton}
                  onPress={() => setTimePeriod(
                    (parseFloat(timePeriod) - 1 > 0 ? 
                    parseFloat(timePeriod) - 1 : 0).toString()
                  )}
                >
                  <Text style={styles.quickButtonText}>-1yr</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.quickButton}
                  onPress={() => setTimePeriod(
                    (parseFloat(timePeriod) + 1).toString()
                  )}
                >
                  <Text style={styles.quickButtonText}>+1yr</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={30}
              step={1}
              value={parseFloat(timePeriod) || 10}
              onValueChange={(value) => setTimePeriod(value.toString())}
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
              thumbTintColor={COLORS.primary}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>1yr</Text>
              <Text style={styles.sliderLabel}>15yrs</Text>
              <Text style={styles.sliderLabel}>30yrs</Text>
            </View>
          </View>
        </View>
        
        {/* Results Section */}
        <Animated.View 
          style={[
            styles.resultsContainer,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          <View style={styles.totalValueContainer}>
            <Text style={styles.totalValueLabel}>Future Value</Text>
            <Text style={styles.totalValueAmount}>
              ₹{formatNumber(totalValue)}
            </Text>
          </View>
          
          <View style={styles.breakdownContainer}>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Invested Amount</Text>
              <Text style={styles.breakdownValue}>
                ₹{formatNumber(investedAmount)}
              </Text>
            </View>
            
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Estimated Returns</Text>
              <Text style={[styles.breakdownValue, styles.returnsValue]}>
                ₹{formatNumber(estimatedReturns)}
              </Text>
            </View>
            
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>CAGR</Text>
              <Text style={[styles.breakdownValue, styles.cagrValue]}>
                {cagr}%
              </Text>
            </View>
            
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Monthly Investment</Text>
              <Text style={styles.breakdownValue}>
                ₹{formatNumber(parseFloat(monthlyInvestment) || 0)} × {parseFloat(timePeriod) * 12 || 0} months
              </Text>
            </View>
          </View>
          
          {/* Pie Chart */}
          <View style={styles.chartContainer}>
            <PieChart
              data={chartData}
              width={Dimensions.get('window').width - 60}
              height={180}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="0"
              absolute={false}
              hasLegend={false}
            />
            
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
          
          {/* Download or Share Button */}
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={COLORS.purpleGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.actionButtonGradient}
            >
              <Icon name="content-save" size={20} color="#fff" style={styles.actionButtonIcon} />
              <Text style={styles.actionButtonText}>Save Summary</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
        
        {/* Step-by-Step Calculation Section */}
        {showSteps && (
          <View style={styles.stepsContainer}>
            <Text style={styles.stepsTitle}>Step-by-Step Calculation</Text>
            
            {steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumberContainer}>
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                </View>
                
                <Text style={styles.stepDescription}>{step.description}</Text>
                <View style={styles.formulaContainer}>
                  <Text style={styles.formulaText}>{step.formula}</Text>
                </View>
                <Text style={styles.stepResult}>{step.result}</Text>
              </View>
            ))}
            
            <View style={styles.mathFactsContainer}>
              <Text style={styles.mathFactsTitle}>SIP Investment Insights</Text>
              <Text style={styles.mathFact}>
                • Power of compounding: Your money earns interest, and then that interest earns interest.
              </Text>
              <Text style={styles.mathFact}>
                • Time impact: Doubling your investment period can more than triple your returns due to compounding.
              </Text>
              <Text style={styles.mathFact}>
                • Return rate: A 2% increase in return rate can yield significantly higher results over longer periods.
              </Text>
            </View>
          </View>
        )}
        
        {/* Bottom Padding for scrolling */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10, 10, 10, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  headerText: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10, 10, 10, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '500',
  },
  currency: {
    color: COLORS.textDim,
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
    borderRadius: 12,
    height: 54,
    paddingHorizontal: 16,
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  input: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '500',
    padding: 0,
  },
  quickActionButtons: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  quickButton: {
    backgroundColor: 'rgba(138, 43, 226, 0.15)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
    ...SHADOWS.small,
  },
  quickButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  sliderLabel: {
    color: COLORS.textDim,
    fontSize: 12,
  },
  resultsContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
    padding: 20,
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  totalValueContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  totalValueLabel: {
    color: COLORS.textDim,
    fontSize: 16,
    marginBottom: 6,
  },
  totalValueAmount: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: 'bold',
  },
  breakdownContainer: {
    marginBottom: 20,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  breakdownLabel: {
    color: COLORS.textDim,
    fontSize: 14,
  },
  breakdownValue: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
  },
  returnsValue: {
    color: '#8A2BE2',
  },
  cagrValue: {
    color: '#9370DB',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
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
    color: COLORS.text,
    fontSize: 14,
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
    ...SHADOWS.medium,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  actionButtonIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  stepsContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
    padding: 20,
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  stepsTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  stepItem: {
    marginBottom: 24,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNumberContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumber: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
  stepDescription: {
    color: COLORS.textDim,
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 34,
  },
  formulaContainer: {
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    marginLeft: 34,
  },
  formulaText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
  stepResult: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 34,
  },
  mathFactsContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(138, 43, 226, 0.05)',
    borderRadius: 12,
  },
  mathFactsTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  mathFact: {
    color: COLORS.textDim,
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default SIPCalculator;