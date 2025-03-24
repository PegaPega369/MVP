
import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Animated,
  Dimensions,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../components/ProfileComponents/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PortfolioDetails = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Animated Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <LinearGradient
          colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0)']}
          style={styles.headerGradient}
        />
      </Animated.View>

      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color={COLORS.text} />
      </TouchableOpacity>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Portfolio Value */}
          <View style={styles.valueContainer}>
            <Text style={styles.label}>Portfolio Value</Text>
            <Text style={styles.value}>₹124,500.00</Text>
            <View style={styles.changeContainer}>
              <Icon name="arrow-up" size={16} color="#4CAF50" />
              <Text style={styles.changeText}>+2.4%</Text>
            </View>
          </View>

          {/* Investment Distribution */}
          <View style={styles.cardContainer}>
            <LinearGradient
              colors={['rgba(138, 43, 226, 0.1)', 'rgba(138, 43, 226, 0.05)']}
              style={styles.card}
            >
              <Text style={styles.cardTitle}>Investment Distribution</Text>
              <View style={styles.distributionRow}>
                <View style={styles.distributionItem}>
                  <Text style={styles.itemValue}>75%</Text>
                  <Text style={styles.itemLabel}>Digital Gold</Text>
                </View>
                <View style={styles.distributionItem}>
                  <Text style={styles.itemValue}>25%</Text>
                  <Text style={styles.itemLabel}>Silver</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Performance Metrics */}
          <View style={styles.metricsContainer}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>₹12,450</Text>
              <Text style={styles.metricLabel}>Monthly Returns</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>18.5%</Text>
              <Text style={styles.metricLabel}>Annual Growth</Text>
            </View>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 100,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 100,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10, 10, 10, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 80,
  },
  valueContainer: {
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: COLORS.textDim,
    marginBottom: 8,
  },
  value: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 16,
    color: '#4CAF50',
    marginLeft: 4,
  },
  cardContainer: {
    marginBottom: 24,
  },
  card: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.2)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 20,
  },
  distributionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  distributionItem: {
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  itemLabel: {
    fontSize: 14,
    color: COLORS.textDim,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: (SCREEN_WIDTH - 64) / 2,
    padding: 20,
    backgroundColor: COLORS.cardDark,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.15)',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: COLORS.textDim,
  },
});

export default PortfolioDetails;
