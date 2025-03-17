import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { PROFILE_COLORS, PROFILE_STYLES } from '../../components/ProfileComponents/theme';

const { width } = Dimensions.get('window');

const AccountDetails: React.FC = () => {
  const route = useRoute();
  const { uid } = route.params || { uid: 'defaultUser' };
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // Animation for the save button
  const [buttonScale] = useState(new Animated.Value(1));

  // Form state
  const [formData, setFormData] = useState({
    firstName: 'Dhanala',
    lastName: '',
    email: 'dhanala@example.com',
    phone: '+91 8919157347',
    dateOfBirth: '15/05/2003',
    address: '123 Main Street, Hyderabad',
    pincode: '500001',
  });

  // Editable state tracking
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    // If we're saving changes, we would implement API call here
    if (isEditing) {
      // Save changes logic
      console.log('Saving user data:', formData);
    }
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.96,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Custom Input component
  const CustomInput = ({ label, value, onChangeText, field, editable = true }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          !isEditing && styles.inputDisabled
        ]}
        value={value}
        onChangeText={(text) => onChangeText(field, text)}
        editable={isEditing && editable}
        placeholderTextColor={PROFILE_COLORS.textMuted}
      />
    </View>
  );

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
        >
          <Icon 
            name={isEditing ? "save-outline" : "create-outline"} 
            size={24} 
            color={PROFILE_COLORS.primaryLight} 
          />
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
          />
          
          <CustomInput 
            label="Phone Number" 
            value={formData.phone} 
            onChangeText={handleInputChange} 
            field="phone" 
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
          />
        </View>

        {/* Save Button (only shown when editing) */}
        {isEditing && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={toggleEditMode}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
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
                <Text style={styles.saveButtonText}>Save Changes</Text>
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
});

export default AccountDetails;