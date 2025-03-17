import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PROFILE_COLORS, PROFILE_STYLES } from './theme';

interface ProfileOptionProps {
  icon: string;
  label: string;
  onPress: () => void;
  rightElement?: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  scale?: Animated.Value;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({
  icon,
  label,
  onPress,
  rightElement = <Icon name="chevron-forward" size={20} color={PROFILE_COLORS.primaryLight} />,
  isFirst = false,
  isLast = false,
  scale,
}) => {
  const handlePressIn = () => {
    if (scale) {
      Animated.spring(scale, {
        toValue: 0.97,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (scale) {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  };

  // If scale is provided, make the container animated
  const Container = scale ? Animated.View : View;
  const containerStyle = scale 
    ? [{ transform: [{ scale }] }] 
    : [];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Container style={containerStyle}>
        <View 
          style={[
            styles.optionContainer,
            isFirst && styles.firstOption,
            isLast && styles.lastOption
          ]}
        >
          <View style={styles.optionLeft}>
            <View style={styles.iconContainer}>
              <Icon name={icon} size={20} color={PROFILE_COLORS.primaryLight} />
            </View>
            <Text style={styles.optionText}>{label}</Text>
          </View>
          {rightElement}
        </View>
      </Container>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    ...PROFILE_STYLES.optionContainer,
  } as ViewStyle,
  firstOption: {
    borderTopWidth: 0,
  } as ViewStyle,
  lastOption: {
    borderBottomWidth: 0,
  } as ViewStyle,
  optionLeft: {
    ...PROFILE_STYLES.optionLeft,
  } as ViewStyle,
  iconContainer: {
    ...PROFILE_STYLES.iconContainer,
  } as ViewStyle,
  optionText: {
    ...PROFILE_STYLES.optionText,
  } as TextStyle,
});

export default ProfileOption;