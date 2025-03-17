import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const MutualFund: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const {uid} = route.params || { uid: 'default-uid' };
  const [selectedFund, setSelectedFund] = useState('');

  const funds = [
    {
      name: 'Keep It Steady',
      fundName: 'Lendbox Fixed',
      icon: require('../components/assets/Fincraft.png'),
    },
    {
      name: 'Balance It Out',
      fundName: 'Navi Aggressive Hybrid Fund - Regular Plan Growth',
      icon: require('../components/assets/Fincraft.png'),
    },
    {
      name: 'Take A Leap',
      fundName: 'Navi Large & Midcap Fund - Regular Plan Growth',
      icon: require('../components/assets/Fincraft.png'),
      popular: true,
    },
  ];

  return (
    <View style={styles.background}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Mutual Funds</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.investment}>Investment</Text>
            <Text style={styles.preferance}>Preference</Text>
          </View>
          
          {funds.map((fund, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => setSelectedFund(fund.name)}
              activeOpacity={0.8}
              style={styles.fundTouchable}>
              <LinearGradient
                colors={selectedFund === fund.name 
                  ? ['rgba(138, 43, 226, 0.2)', 'rgba(106, 13, 173, 0.3)']
                  : ['rgba(35, 28, 56, 0.9)', 'rgba(29, 17, 50, 0.95)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={[
                  styles.fundContainer,
                  selectedFund === fund.name && styles.selectedFundContainer
                ]}>
                
                {fund.popular && (
                  <View style={styles.popularBadge}>
                    <LinearGradient
                      colors={['#9C27B0', '#673AB7']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.popularGradient}>
                      <Text style={styles.popularChoice}>Popular Choice</Text>
                      <Icon name="star" size={12} color="#FFF" type="font-awesome" style={styles.starIcon} />
                    </LinearGradient>
                  </View>
                )}
                
                <View style={styles.fundInfo}>
                  <View style={styles.iconWrapper}>
                    <Image source={fund.icon} style={styles.fundIcon} />
                  </View>
                  <View style={styles.fundTextContainer}>
                    <Text style={styles.fundName}>{fund.name}</Text>
                    <Text style={styles.fundDetails}>{fund.fundName}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.arrowButton}
                    onPress={() => navigation.navigate('ID', {uid})}>
                    <LinearGradient
                      colors={['rgba(138, 43, 226, 0.8)', 'rgba(106, 13, 173, 0.9)']}
                      style={styles.arrowGradient}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}>
                      <Icon name="arrow-forward" size={24} color="#FFFFFF" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity
                  style={[
                    styles.selectButton,
                    selectedFund === fund.name && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedFund(fund.name)}>
                  <LinearGradient
                    colors={selectedFund === fund.name 
                      ? ['#9C27B0', '#6A0DAD'] 
                      : ['#2A1A4A', '#231537']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.buttonGradient}>
                    <Text style={styles.selectButtonText}>
                      {selectedFund === fund.name ? 'Selected' : 'Select Fund'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000000', // Pure black background
  },
  gradientBackground: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  headerGradient: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#8A2BE2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 20,
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  titleContainer: {
    marginVertical: 25,
  },
  investment: {
    color: '#C9A1FF',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 5,
    textShadowColor: 'rgba(138, 43, 226, 0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  preferance: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '300',
  },
  fundTouchable: {
    marginBottom: 20,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#8A2BE2',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 15,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  fundContainer: {
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
    overflow: 'hidden',
  },
  selectedFundContainer: {
    borderColor: 'rgba(138, 43, 226, 0.8)',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    borderRadius: 15,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#9C27B0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  popularGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
  },
  popularChoice: {
    color: '#E9D5FF', // Changed to light purple instead of white
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 5,
  },
  starIcon: {
    marginLeft: 2,
  },
  fundInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  fundIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  fundTextContainer: {
    flex: 1,
  },
  fundName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fundDetails: {
    color: '#CCCCCC', // Changed from gray to light purple
    fontSize: 14,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#8A2BE2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  arrowGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  selectButton: {
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  selectedButton: {
    ...Platform.select({
      ios: {
        shadowColor: '#8A2BE2',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MutualFund;