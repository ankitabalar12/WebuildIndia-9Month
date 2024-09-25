import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { icons } from '../../Helper/icons';
import AsyncStorage from '@react-native-community/async-storage';
import { Newsonboardscreen } from '../../../APICall';

const Splash = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [onboardData, setOnboardData] = useState(null);
  const [data, setData] = useState([])
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await AsyncStorage.getItem('logindata');
      console.log('result----', result);
      const screenData = JSON.parse(result);
      console.log('screenData----', screenData);
      if (screenData) {
        navigation.navigate('HomeScreen');
      } else {
        await fetchOnboardData();
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const fetchOnboardData = async () => {
    try {
      setLoading(true);
      const res = await Newsonboardscreen(global.url + 'onboardscreen', data);
      console.log('res-----', res);
      setOnboardData(res.data);
      navigation.navigate('OnBorardScreen', { onboarddata: res.data });
    } catch (error) {
      console.error('Error fetching onboardscreen data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2d338c', '#31378e', '#373c91', '#3f4596', '#50569f', '#5b61a4', '#6f74b0', '#757ab3', '#7d82b7']}
        style={styles.linear}
      />
      <Image source={icons.webuild} />
      <LinearGradient
        colors={['#d7d8e5', '#d8d9e6', '#dedfe9', '#ebecf0', '#f5f5f5', '#fff']}
        style={styles.linear}
      />
    </View>
  );
};

export default Splash;
