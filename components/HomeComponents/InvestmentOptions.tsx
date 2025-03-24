import React, { useRef } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Image, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Platform,
  Animated 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from './theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

interface InvestmentOptionsProps {
  onGoldPress: () => void;
  onMutualFundPress: () => void;
  onP2PPress: () => void;
}

interface InvestmentCardProps {
  title: string;
  image: any;
  gradientColors: string[];
  borderColor: string;
  glowColor: string;
  onPress: () => void;
}

const InvestmentOptions: React.FC<InvestmentOptionsProps> = ({
  onGoldPress,
  onMutualFundPress,
  onP2PPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headings}>Investment Options</Text>

      <View style={styles.cardsContainer}>
        <InvestmentCard 
          title="Gold" 
          image={require('../assets/Gold-bar.png')}
          gradientColors={['#261A00', '#4A3500', '#6B5000']}
          borderColor="rgba(255, 215, 0, 0.4)"
          glowColor="rgba(255, 215, 0, 0.3)"
          onPress={onGoldPress} 
        />

        <InvestmentCard 
          title="Silver" 
          image={require('../assets/Silver-Bricks.png')}
          gradientColors={['#262626', '#404040', '#595959']}
          borderColor="rgba(192, 192, 192, 0.4)"
          glowColor="rgba(192, 192, 192, 0.3)"
          onPress={onP2PPress} 
        />
        
        <InvestmentCard 
          title="Mutual Funds" 
          image={require('../assets/MutualFunds.png')}
          gradientColors={['#0A1A40', '#0F2861', '#1A3980']}
          borderColor="rgba(100, 149, 237, 0.4)"
          glowColor="rgba(100, 149, 237, 0.3)"
          onPress={onMutualFundPress} 
        />
      </View>
    </View>
  );
};

const InvestmentCard: React.FC<InvestmentCardProps> = React.memo(({ 
  title, 
  image,
  gradientColors, 
  borderColor,
  glowColor,
  onPress 
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <Animated.View style={[styles.cardWrapper, { shadowColor: glowColor, transform: [{ scale: scaleAnim }] }]}> 
      <LinearGradient 
        colors={gradientColors}
        start={{x: 0, y: 0}} 
        end={{x: 1, y: 1}} 
        style={[styles.gradientContainer, { borderColor }]}
      >
        <TouchableOpacity 
          style={styles.card} 
          onPressIn={handlePressIn}
          onPressOut={handlePressOut} 
          activeOpacity={0.8}
          accessibilityLabel={`Invest in ${title}`}
        >
          <Image source={image} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  headings: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  cardWrapper: {
    width: width * 0.27,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
      },
      android: {
        elevation: 12,
      }
    })
  },
  gradientContainer: {
    borderRadius: 16,
    height: '100%',
    borderWidth: 1.5,
    backgroundColor: '#000000',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    textAlign: 'center',
  }
});

export default InvestmentOptions;