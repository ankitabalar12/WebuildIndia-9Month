import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { checkplans, renewadsdata } from '../../../APICall';

const WebviewScreen = ({ route, navigation }) => {
  const { paymentUrl } = route.params;
  const [loading, setLoading] = useState(false);
  const addads = route?.params?.addads
  const planId = route?.params?.planId
  const expriedId = route?.params?.expriedId
  const [shouldRedirect, setShouldRedirect] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const userdata = await AsyncStorage.getItem('logindata');
      const finaluserdata = JSON.parse(userdata);
      getcheckplansdata(finaluserdata.id)
      allrenewalldata(finaluserdata.id)

    };
    fetchData();

  }, []);

  const handleWebViewNavigationStateChange = newNavState => {
    console.log('global.adstype', global.adstype);
    // alert(global.adstype);
    const { url } = newNavState;
    console.log('Received: ', url);
    if (url === 'https://www.app.webuildindia.in/razorpay/verify.php') {
      if (global.adstype === 1) {
        navigation.navigate('DashboardScreen', { addads, planId, expriedId });
      } else if (global.adstype === 0) {
        navigation.navigate('CreateyouradsBuilder', { addads, planId });
        console.log('addads---', addads)
      }

    }
    AsyncStorage.getItem('adtype', (err, adtype1) => {

      if (err) {
        console.error('Error fetching adtype:', err);
        return;
      }

    });
  };

  const handleMessage = event => {
    const message = event.nativeEvent.data;
    console.log('Received: ', message);
  };

  const getcheckplansdata = async (id) => {
    setLoading(true);
    try {
      const data = {
        user_id: id,
      };
      const res = await checkplans(global.url + 'checkplanstatus', data);
      console.log('res---', res)
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };


  const allrenewalldata = async (id) => {
    setLoading(true);
    const data = {
      user_id: id,
      id: expriedId,
      plan_id: planId
    }
     const res = await renewadsdata(global.url + 'renewads', data);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {!shouldRedirect ? (
        <WebView
          source={{ uri: paymentUrl }}
          onMessage={handleMessage}
          onNavigationStateChange={handleWebViewNavigationStateChange}
        />
      ) : null}
      {shouldRedirect ? navigation.navigate('CreateyouradsBuilder', { addads, planId }) : null}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebviewScreen;
