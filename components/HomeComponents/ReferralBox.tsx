// Modify your ReferralBox.tsx file:

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { COLORS, SHADOWS } from './theme';
import LinearGradient from 'react-native-linear-gradient';

interface ReferralBoxProps {
  onPress: () => void;
}

const ReferralBox: React.FC<ReferralBoxProps> = ({ onPress }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const glowAnim = useRef(new Animated.Value(0)).current; // This needs separate management

  useEffect(() => {
    // Sequence for entry animations (using native driver)
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

    // Glow effect animation (using JS driver)
    // This animation is separate from the ones using native driver
    const startGlowAnimation = () => {
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false, // Must be false to animate non-transform/opacity properties
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]).start(() => {
        // Recursively start the animation again when it completes
        startGlowAnimation();
      });
    };

    startGlowAnimation();

    // Clean up animations on unmount
    return () => {
      fadeAnim.stopAnimation();
      slideAnim.stopAnimation();
      glowAnim.stopAnimation();
    };
  }, [fadeAnim, slideAnim, glowAnim]);

  // Interpolate glow animation to shadow opacity
  const glowShadowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.sectionTitle}>Refer & Earn </Text>
      <Animated.View
        style={[
          styles.shadowContainer,
          {
            shadowOpacity: glowShadowOpacity,
          },
        ]}
      >
        <TouchableOpacity 
          style={styles.touchable} 
          activeOpacity={0.9}
          onPress={onPress}
        >
          <LinearGradient
            colors={[COLORS.primaryDark, COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>🎁</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Refer & Earn Rewards</Text>
                <Text style={styles.description}>
                  Invite friends and you both get 100 bonus points!
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Invite</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  shadowContainer: {
    borderRadius: 16,
    backgroundColor: COLORS.primaryDark,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  touchable: {
    width: '100%',
  },
  gradient: {
    borderRadius: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white, 
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  buttonContainer: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: COLORS.white, 
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ReferralBox;