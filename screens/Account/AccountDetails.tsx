import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { PROFILE_COLORS, PROFILE_STYLES } from '../../components/ProfileComponents/theme';
import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');

// Define interfaces for TypeScript
interface RouteParams {
  uid: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  pincode: string;
  [key: string]: string; // Index signature for dynamic field access
}

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (field: string, value: string) => void;
  field: string;
  editable?: boolean;
  keyboardType?: 'default' | 'number-pad' | 'email-address' | 'phone-pad';
}

const AccountDetails: React.FC = () => {
  const route = useRoute();
  const params = route.params as RouteParams;
  const uid = params?.uid || 'defaultUser';
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // Animation for the save button
  const [buttonScale] = useState<Animated.Value>(new Animated.Value(1));

  // Loading and error states
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Form state with initial empty values
  const [formData, setFormData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    pincode: '',
  });

  // Editable state tracking
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Fetch user data from Firebase
  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      
      try {
        const userDoc = await firestore().collection('users').doc(uid).get();
        
        if (userDoc.exists) {
          const userData = userDoc.data() as Partial<UserData>;
          
          // Update form data with fetched values, keeping default values for missing fields
          setFormData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            dateOfBirth: userData.dateOfBirth || '',
            address: userData.address || '',
            pincode: userData.pincode || '',
          });
        } else {
          setError('User data not found');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  // Save user data to Firebase
  const saveUserData = async (): Promise<void> => {
    setSaving(true);
    
    try {
      await firestore().collection('users').doc(uid).update({
        ...formData,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      
      Alert.alert('Success', 'Your profile has been updated successfully.');
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving user data:', err);
      Alert.alert('Error', 'Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string): void => {
    // Using a function approach for state updates to ensure we don't lose focus
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleEditMode = (): void => {
    if (isEditing) {
      // If we're currently editing, save changes
      saveUserData();
    } else {
      // Otherwise, enter edit mode
      setIsEditing(true);
    }
  };

  const handlePressIn = (): void => {
    Animated.spring(buttonScale, {
      toValue: 0.96,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (): void => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Custom Input component
  const CustomInput: React.FC<CustomInputProps> = ({ 
    label, 
    value, 
    onChangeText, 
    field, 
    editable = true,
    keyboardType = 'default' 
  }) => {
    // Using ref to prevent keyboard dismissal
    const inputRef = React.useRef<TextInput>(null);
    
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            !isEditing && styles.inputDisabled
          ]}
          value={value}
          onChangeText={(text) => onChangeText(field, text)}
          editable={isEditing && editable}
          placeholderTextColor={PROFILE_COLORS.textMuted}
          keyboardType={keyboardType}
          blurOnSubmit={false}
        />
      </View>
    );
  };

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={PROFILE_COLORS.darkPurpleGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={PROFILE_COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account Details</Text>
          <View style={styles.backButton} />
        </LinearGradient>
        
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color={PROFILE_COLORS.primary} />
          <Text style={styles.loadingText}>Loading your account details...</Text>
        </View>
      </View>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={PROFILE_COLORS.darkPurpleGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={PROFILE_COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account Details</Text>
          <View style={styles.backButton} />
        </LinearGradient>
        
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={60} color={PROFILE_COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.replace('AccountDetails', { uid })}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <LinearGradient
        colors={PROFILE_COLORS.darkPurpleGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={PROFILE_COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Details</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={toggleEditMode}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color={PROFILE_COLORS.primaryLight} />
          ) : (
            <Icon 
              name={isEditing ? "save-outline" : "create-outline"} 
              size={24} 
              color={PROFILE_COLORS.primaryLight} 
            />
          )}
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <CustomInput 
            label="First Name" 
            value={formData.firstName} 
            onChangeText={handleInputChange} 
            field="firstName" 
          />
          
          <CustomInput 
            label="Last Name" 
            value={formData.lastName} 
            onChangeText={handleInputChange} 
            field="lastName" 
          />
          
          <CustomInput 
            label="Date of Birth" 
            value={formData.dateOfBirth} 
            onChangeText={handleInputChange} 
            field="dateOfBirth" 
          />
        </View>

        {/* Contact Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <CustomInput 
            label="Email" 
            value={formData.email} 
            onChangeText={handleInputChange} 
            field="email"
            keyboardType="email-address" 
          />
          
          <CustomInput 
            label="Phone Number" 
            value={formData.phone} 
            onChangeText={handleInputChange} 
            field="phone"
            keyboardType="phone-pad"
          />
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          
          <CustomInput 
            label="Address" 
            value={formData.address} 
            onChangeText={handleInputChange} 
            field="address" 
          />
          
          <CustomInput 
            label="Pincode" 
            value={formData.pincode} 
            onChangeText={handleInputChange} 
            field="pincode"
            keyboardType="number-pad" 
          />
        </View>

        {/* Save Button (only shown when editing) */}
        {isEditing && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={saveUserData}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={saving}
          >
            <Animated.View style={[
              styles.saveButton,
              { transform: [{ scale: buttonScale }] }
            ]}>
              <LinearGradient
                colors={PROFILE_COLORS.lightPurpleGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.saveButtonGradient}
              >
                {saving ? (
                  <ActivityIndicator size="small" color={PROFILE_COLORS.text} />
                ) : (
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                )}
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
        )}

        {/* Add some space at the bottom */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PROFILE_COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 50, // Additional padding for status bar
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: PROFILE_COLORS.text,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: PROFILE_COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: PROFILE_COLORS.cardBorder,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: PROFILE_COLORS.primaryLight,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: PROFILE_COLORS.textDim,
    marginBottom: 8,
  },
  input: {
    backgroundColor: PROFILE_COLORS.backgroundLight,
    borderRadius: 8,
    padding: 12,
    color: PROFILE_COLORS.text,
    borderWidth: 1,
    borderColor: 'rgba(166, 139, 215, 0.3)',
  },
  inputDisabled: {
    backgroundColor: 'rgba(20, 20, 20, 0.8)',
    color: PROFILE_COLORS.textMuted,
  },
  saveButton: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
  },
  saveButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: PROFILE_COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  // Loading styles
  loadingContainer: {
    flex: 1,
    backgroundColor: PROFILE_COLORS.background,
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: PROFILE_COLORS.text,
    textAlign: 'center',
  },
  // Error styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: PROFILE_COLORS.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: PROFILE_COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: PROFILE_COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AccountDetails;