import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  StatusBar,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, PROFILE_COLORS, SHADOWS } from '../../components/ProfileComponents/theme';

const { width } = Dimensions.get('window');

const SetupAutopay: React.FC = () => {
  const navigation = useNavigation();
  const [isAutopayEnabled, setIsAutopayEnabled] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  
  StatusBar.setBarStyle('light-content');

  // Reset amount selection when frequency changes
  useEffect(() => {
    setSelectedAmount(null);
    setCustomAmount('');
    setShowCustomInput(false);
  }, [selectedFrequency]);

  const frequencyOptions = [
    { id: 'daily', label: 'Daily', icon: 'calendar-today' },
    { id: 'weekly', label: 'Weekly', icon: 'calendar-week' },
    { id: 'monthly', label: 'Monthly', icon: 'calendar-month' }
  ];

  // Amount options based on selected frequency
  const getAmountOptions = () => {
    if (selectedFrequency === 'daily') {
      return [
        { id: '20', label: '₹20', isPopular: false },
        { id: '30', label: '₹30', isPopular: true },
        { id: '50', label: '₹50', isPopular: false },
        { id: '100', label: '₹100', isPopular: false },
        { id: 'custom', label: 'Custom', isCustom: true }
      ];
    } else if (selectedFrequency === 'weekly') {
      return [
        { id: '100', label: '₹100', isPopular: false },
        { id: '200', label: '₹200', isPopular: false },
        { id: '300', label: '₹300', isPopular: true },
        { id: '400', label: '₹400', isPopular: false }, 
        { id: 'custom', label: 'Custom', isCustom: true }
      ];
    } else if (selectedFrequency === 'monthly') {
      return [
        { id: '500', label: '₹500', isPopular: false },
        { id: '1000', label: '₹1,000', isPopular: false },
        { id: '2000', label: '₹2,000', isPopular: true },
        { id: '5000', label: '₹5,000', isPopular: false },
        { id: 'custom', label: 'Custom', isCustom: true }
      ];
    }
    return [];
  };

  const renderFrequencyOption = (id: string, label: string, icon: string) => {
    const isSelected = selectedFrequency === id;
    
    return (
      <TouchableOpacity
        key={id}
        style={[
          styles.frequencyOption,
          isSelected && styles.selectedFrequencyOption
        ]}
        onPress={() => setSelectedFrequency(id)}
        disabled={!isAutopayEnabled}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={isSelected ? COLORS.lightPurpleGradient : ['rgba(15,15,15,0.8)', 'rgba(10,10,10,0.9)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.frequencyGradient,
            !isAutopayEnabled && styles.disabledOption
          ]}
        >
          <Icon 
            name={icon} 
            size={22} 
            color={isSelected ? COLORS.text : (isAutopayEnabled ? COLORS.primary : COLORS.textMuted)} 
          />
          <Text style={[
            styles.frequencyLabel,
            isSelected ? styles.selectedFrequencyLabel : null,
            !isAutopayEnabled && styles.disabledText
          ]}>
            {label}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  // Adjusted to use an option object parameter
  const renderAmountOption = (option: any) => {
    const { id, label, isPopular, isCustom } = option;
    const isSelected = selectedAmount === id;
    
    const handleAmountPress = () => {
      if (id === 'custom') {
        setSelectedAmount(id);
        setShowCustomInput(true);
      } else {
        setSelectedAmount(id);
        setShowCustomInput(false);
      }
    };
    
    return (
      <TouchableOpacity
        key={id}
        style={[
          styles.amountOption,
          isSelected && styles.selectedAmountOption,
          isCustom && styles.customOption
        ]}
        onPress={handleAmountPress}
        disabled={!isAutopayEnabled}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={isSelected ? COLORS.purpleGradient : ['rgba(15,15,15,0.3)', 'rgba(10,10,10,0.5)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.amountGradient,
            !isAutopayEnabled && styles.disabledOption
          ]}
        >
          {isPopular && (
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>Popular</Text>
            </View>
          )}
          <Text style={[
            styles.amountLabel,
            isSelected ? styles.selectedAmountLabel : null,
            !isAutopayEnabled && styles.disabledText
          ]}>
            {label}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color={COLORS.text} />
      </TouchableOpacity>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Hero section */}
          <View style={styles.heroSection}>
            <LinearGradient
              colors={COLORS.darkPurpleGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroGradient}
            >
              <Text style={styles.heroTitle}>Setup Autopay</Text>
              <Text style={styles.heroSubtitle}>Automate your investment journey and never miss an opportunity</Text>
              
              <View style={styles.securityBadge}>
                <Icon name="shield-lock" size={18} color={COLORS.primary} />
                <Text style={styles.securityText}>Secure payments</Text>
              </View>
            </LinearGradient>
          </View>
          
          {/* Main toggle section */}
          <View style={styles.toggleCard}>
            <View style={styles.toggleHeader}>
              <View style={styles.toggleLeft}>
                <Icon name="autorenew" size={22} color={isAutopayEnabled ? COLORS.primary : COLORS.textMuted} />
                <Text style={styles.toggleLabel}>Enable Autopay</Text>
              </View>
              
              <Switch
                trackColor={{ 
                  false: PROFILE_COLORS.switchTrackInactive, 
                  true: PROFILE_COLORS.switchTrackActive 
                }}
                thumbColor={isAutopayEnabled ? PROFILE_COLORS.switchThumbActive : PROFILE_COLORS.switchThumbInactive}
                onValueChange={() => setIsAutopayEnabled(!isAutopayEnabled)}
                value={isAutopayEnabled}
                style={styles.switch}
              />
            </View>
            
            <Text style={styles.toggleDescription}>
              {isAutopayEnabled 
                ? "Autopay is enabled. Set up your preferred schedule below."
                : "Turn on Autopay to automate your investment in Digital Gold"}
            </Text>
          </View>
          
          {/* Frequency selection */}
          <View style={[styles.sectionCard, !isAutopayEnabled && styles.disabledCard]}>
            <Text style={styles.sectionTitle}>Investment Frequency</Text>
            <Text style={styles.sectionDescription}>
              How often would you like to invest in Digital Gold?
            </Text>
            
            <View style={styles.frequencyContainer}>
              {frequencyOptions.map(option => 
                renderFrequencyOption(option.id, option.label, option.icon)
              )}
            </View>
          </View>
          
          {/* Amount selection */}
          {selectedFrequency && (
            <View style={[styles.sectionCard, !isAutopayEnabled && styles.disabledCard]}>
              <Text style={styles.sectionTitle}>Investment Amount</Text>
              <Text style={styles.sectionDescription}>
                How much would you like to invest each time?
              </Text>
              
              <View style={styles.amountContainer}>
                {/* First Row - 2 items */}
                <View style={styles.amountRow}>
                  {getAmountOptions().slice(0, 2).map(option => 
                    renderAmountOption(option)
                  )}
                </View>
                
                {/* Second Row - 2 items */}
                <View style={styles.amountRow}>
                  {getAmountOptions().slice(2, 4).map(option => 
                    renderAmountOption(option)
                  )}
                </View>
                
                {/* Custom button centered */}
                <View style={styles.customRow}>
                  {renderAmountOption(getAmountOptions()[4])}
                </View>
              </View>
              
              {/* Custom amount input */}
              {showCustomInput && (
                <View style={styles.customAmountContainer}>
                  <Text style={styles.customAmountLabel}>Enter custom amount:</Text>
                  <View style={styles.customInputWrapper}>
                    <Text style={styles.currencySymbol}>₹</Text>
                    <TextInput
                      style={styles.customAmountInput}
                      value={customAmount}
                      onChangeText={setCustomAmount}
                      placeholder="Amount"
                      placeholderTextColor={COLORS.textMuted}
                      keyboardType="numeric"
                      editable={isAutopayEnabled}
                    />
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      
      {/* Action Button */}
      {isAutopayEnabled && (
        <View style={styles.bottomAction}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={!selectedFrequency || !selectedAmount || (selectedAmount === 'custom' && !customAmount)}
              activeOpacity={0.8}
              style={[
                styles.saveButton, 
                (!selectedFrequency || !selectedAmount || (selectedAmount === 'custom' && !customAmount)) && styles.disabledButton
              ]}
            >
              <LinearGradient
                colors={COLORS.purpleGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  Save Preferences
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1000,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10, 10, 10, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 120,
  },
  contentContainer: {
    padding: 16,
  },
  heroSection: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  heroGradient: {
    padding: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: COLORS.textDim,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(35, 21, 55, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
    marginTop: 8,
  },
  securityText: {
    color: COLORS.primary,
    fontSize: 13,
    marginLeft: 6,
  },
  toggleCard: {
    backgroundColor: COLORS.cardDark,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(106, 78, 156, 0.3)',
    ...SHADOWS.small,
  },
  toggleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 10,
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  toggleDescription: {
    fontSize: 14,
    color: COLORS.textDim,
    marginTop: 4,
    paddingLeft: 30,
  },
  sectionCard: {
    backgroundColor: COLORS.cardDark,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(106, 78, 156, 0.2)',
    ...SHADOWS.small,
  },
  disabledCard: {
    opacity: 0.75,
    borderColor: 'rgba(106, 78, 156, 0.1)',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  sectionDescription: {
    fontSize: 14,
    color: COLORS.textDim,
    marginBottom: 16,
  },
  frequencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  frequencyOption: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(106, 78, 156, 0.15)',
  },
  selectedFrequencyOption: {
    borderColor: COLORS.primary,
    ...SHADOWS.small,
  },
  frequencyGradient: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  frequencyLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textDim,
    marginTop: 6,
  },
  selectedFrequencyLabel: {
    color: COLORS.text,
    fontWeight: '600',
  },
  amountContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  amountOption: {
    width: '48%',
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(106, 78, 156, 0.15)',
  },
  selectedAmountOption: {
    borderColor: COLORS.primary,
    ...SHADOWS.small,
  },
  amountGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  amountLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textDim,
  },
  selectedAmountLabel: {
    color: COLORS.text,
    fontWeight: '600',
  },
  disabledOption: {
    opacity: 0.7,
  },
  disabledText: {
    color: COLORS.textMuted,
  },
  customAmountContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(106, 78, 156, 0.1)',
  },
  customAmountLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textDim,
    marginBottom: 10,
  },
  customInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 15, 15, 0.6)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(106, 78, 156, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    marginRight: 8,
  },
  customAmountInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    height: 40,
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 320,
    ...SHADOWS.medium,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  customOption: {
    width: '48%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: 'rgba(106, 78, 156, 0.3)',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 11,
  },
  popularText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '700',
  },
  amountRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
});

export default SetupAutopay;