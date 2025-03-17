import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Switch,
  Animated,
  Platform,
  SafeAreaView,
  ViewStyle,
  TextStyle,
  ImageStyle
} from 'react-native';
import Navbar from '../components/Navbar';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { PROFILE_COLORS,SHADOWS,COLORS} from '../components/ProfileComponents/theme';
import ProfileHeader from '../components/ProfileComponents/ProfileHeader';
import ProfileOption from '../components/ProfileComponents/ProfileOption';
import ProfileSection from '../components/ProfileComponents/ProfileSection'

interface RouteParams {
  uid: string;
}

const ProfilePage: React.FC = () => {
  const route = useRoute();
  const params = route.params as RouteParams | undefined;
  const uid = params?.uid || 'defaultUser';
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [isPaused, setIsPaused] = useState(false);
  const [isDeactivated, setIsDeactivated] = useState(false);

  // Animation values for button presses
  const [buttonScale] = useState(new Animated.Value(1));
  const [optionScale] = useState(new Animated.Value(1));

  const togglePauseAccount = () => setIsPaused(previousState => !previousState);
  const toggleDeactivateAccount = () => setIsDeactivated(previousState => !previousState);

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

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <ProfileHeader 
          firstName="Dhanala"
          phoneNumber="+91 8919157347"
          age={21}
          joinedDate="Nov 2023"
        />

        {/* Profile Settings Section */}
        <ProfileSection title="Profile Settings">
          <ProfileOption
            icon="person-circle"
            label="Account Details"
            onPress={() => navigation.navigate('AccountDetails', { uid })}
            scale={optionScale}
            isFirst
          />
          <ProfileOption
            icon="shield-checkmark"
            label="Identity Verification"
            onPress={() => navigation.navigate('IdentityVerification', { uid })}
            rightElement={<Text style={styles.linkText}>Verify Now</Text>}
            scale={optionScale}
            isLast
          />
        </ProfileSection>

        {/* Payment Settings Section */}
        <ProfileSection title="Payment Settings">
          <ProfileOption
            icon="card"
            label="Payment Methods"
            onPress={() => navigation.navigate('PaymentMethods', { uid })}
            scale={optionScale}
            isFirst
          />
          <ProfileOption
            icon="repeat"
            label="Setup Autopay"
            onPress={() => navigation.navigate('SetupAutopay', { uid })}
            scale={optionScale}
          />
          <ProfileOption
            icon="pricetag"
            label="Save on Every Spend"
            onPress={() => navigation.navigate('SaveOnEverySpend', { uid })}
            scale={optionScale}
            isLast
          />
        </ProfileSection>

        {/* Security Settings Section */}
        <ProfileSection title="Security Settings">
          <ProfileOption
            icon="lock-closed"
            label="Permissions"
            onPress={() => navigation.navigate('Permissions', { uid })}
            scale={optionScale}
            isFirst
          />
          <ProfileOption
            icon="finger-print"
            label="Biometric Lock"
            onPress={() => navigation.navigate('BiometricLock', { uid })}
            scale={optionScale}
            isLast
          />
        </ProfileSection>

        {/* Support Section */}
        <ProfileSection title="Support">
          <ProfileOption
            icon="help-circle"
            label="Help and Support"
            onPress={() => navigation.navigate('HelpAndSupport', { uid })}
            scale={optionScale}
            isFirst
            isLast
          />
        </ProfileSection>

        {/* Account Status Controls */}
        <View style={styles.accountControls}>
          <View style={styles.switchOption}>
            <View style={styles.optionLeft}>
              <View style={styles.iconContainer}>
                <Icon name="pause-circle" size={20} color={isPaused ? PROFILE_COLORS.warning : PROFILE_COLORS.primaryLight} />
              </View>
              <Text style={styles.optionText}>Pause Account</Text>
            </View>
            <Switch
              trackColor={{ false: PROFILE_COLORS.switchTrackInactive, true: PROFILE_COLORS.switchTrackActive }}
              thumbColor={isPaused ? PROFILE_COLORS.warning : PROFILE_COLORS.switchThumbInactive}
              ios_backgroundColor={PROFILE_COLORS.cardLight}
              onValueChange={togglePauseAccount}
              value={isPaused}
            />
          </View>

          <View style={styles.switchOption}>
            <View style={styles.optionLeft}>
              <View style={styles.iconContainer}>
                <Icon name="close-circle" size={20} color={isDeactivated ? PROFILE_COLORS.error : PROFILE_COLORS.primaryLight} />
              </View>
              <Text style={styles.optionText}>Deactivate Account</Text>
            </View>
            <Switch
              trackColor={{ false: PROFILE_COLORS.switchTrackInactive, true: PROFILE_COLORS.dangerBackground }}
              thumbColor={isDeactivated ? PROFILE_COLORS.error : PROFILE_COLORS.switchThumbInactive}
              ios_backgroundColor={PROFILE_COLORS.cardLight}
              onValueChange={toggleDeactivateAccount}
              value={isDeactivated}
            />
          </View>
        </View>

        {/* Sign Out button with animation */}
        <TouchableOpacity 
          onPress={() => {
            /* Handle sign out logic here */
          }}
          activeOpacity={0.9}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View style={[
            styles.signOutButton,
            { transform: [{ scale: buttonScale }] }
          ]}>
            <LinearGradient
              colors={['#231537', '#4B0082']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.signOutGradient}
            >
              <Text style={styles.signOutText}>Sign Out</Text>
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>

        <Text style={styles.appVersion}>App Version 1.0.0</Text>
      </ScrollView>
      <Navbar uid={uid} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  linkText: {
    fontSize: 14,
    color: COLORS.primaryLight,
    fontWeight: '500',
  },
  accountControls: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: COLORS.cardDark,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  signOutButton: {
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 12,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  signOutGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  appVersion: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default ProfilePage;