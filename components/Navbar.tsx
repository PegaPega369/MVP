import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

const Navbar = ({ uid }: { uid: string }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();

  const getColor = (tabName: string) => {
    return route.name === tabName ? '#8A2BE2' : '#FFFFFF';
  };

  return (
    <View style={styles.container}>
      {/* Curved Background with Gradient */}
      <Svg width={width} height="80" viewBox={`0 0 ${width} 80`} style={styles.svg}>
        <Defs>
          {/* <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0"> */}
          <LinearGradient id="gradient" x1="0.5" y1="0" x2="0.5" y2="1">
            <Stop offset="0" stopColor="#000000" stopOpacity="1" />
            <Stop offset="0.05" stopColor="#1F1F1F" stopOpacity="1" />
            <Stop offset="1" stopColor="#000000" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Path
          fill="url(#gradient)"
          d={`
            M0,20 Q${width / 2 - 80},0 ${width / 2},0
            Q${width / 2 + 80},0 ${width},20
            V100 H0 Z
          `}
        />
      </Svg>

      {/* Navbar Items */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home', { uid })} style={styles.item}>
          <Icon name="home" type="feather" size={20} color={getColor('Home')} />
          <Text style={[styles.text, { color: getColor('Home') }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Shop', { uid })} style={styles.item}>
          <Icon name="shopping-bag" type="feather" size={20} color={getColor('Shop')} />
          <Text style={[styles.text, { color: getColor('Shop') }]}>Shop</Text>
        </TouchableOpacity>

        {/* Floating Scan & Pay Button
        <TouchableOpacity
          onPress={() => navigation.navigate('ScanPay', { uid })}
          style={styles.scanPayButton}
        >
          <Icon name="qrcode" type="font-awesome" size={32} color="white" />
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => navigation.navigate('Card', { uid })} style={styles.item}>
          <Icon name="credit-card" type="feather" size={20} color={getColor('Card')} />
          <Text style={[styles.text, { color: getColor('Card') }]}>Card</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile', { uid })} style={styles.item}>
          <Icon name="user" type="feather" size={20} color={getColor('Profile')} />
          <Text style={[styles.text, { color: getColor('Profile') }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  svg: {
    position: 'absolute',
    bottom: 0,
  },
  navbar: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  item: {
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    marginTop: 2,
    color: 'white',
  },
  scanPayButton: {
    position: 'absolute',
    top: -25,
    backgroundColor: '#8A2BE2', // Purple button
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8A2BE2',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});