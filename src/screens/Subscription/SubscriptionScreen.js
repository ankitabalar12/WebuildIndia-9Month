import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, Linking, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import { styles } from './styles';
import { String } from '../../Helper/string';
import { icons } from '../../Helper/icons';
import { freependindata, getplandata, purchaseplan } from '../../../APICall';
import AsyncStorage from '@react-native-community/async-storage';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
// import RazorpayCheckout from 'react-native-razorpay';

const SubscriptionScreen = ({ navigation, route }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([])
  const [id, setID] = useState([])
  const [showWebView, setShowWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [convertedTime, setConvertedTime] = useState({ years: 0, months: 0 });
  const [Free, setFree] = useState(0)
  const addads = route?.params?.addads
  console.log('addads--->>>', addads)
  const planId = route?.params?.planId
  console.log('planId---', planId)
  const expriedId = route?.params?.expriedId
  console.log('expriedId---', expriedId)
  useEffect(() => {
    const fetchData = async () => {
      const userdata = await AsyncStorage.getItem('logindata');
      const finaluserdata = JSON.parse(userdata);
      setID(finaluserdata.id)
      console.log('id--->', finaluserdata.id)

    };
    fetchData();
    Detaplandataall();
    // purchaseplandata();
  }, []);
  // const handleTouchableOpacityPress = (item) => {
  //   console.log('item --', item.price);
  //   if (item.price === 'Free') {
  //     let planId = item.id;
  //     console.log('planId---', planId)
  //     navigation.navigate('CreateyouradsBuilder', { addads, planId });
  //     freependingadsdata()
  //     console.log('---',planId )
  //     console.log('---',addads )
  //   } else {
  //     const cleanedPrice = item.price.replace(/\D/g, '');
  //     setShowWebView(true);
  //     setPaymentUrl(`https://www.demo603.amrithaa.com/webuildindia/razorpay/pay.php?last_id=${item.id}&price=${cleanedPrice}&user_id=${id}`);
  //     navigation.navigate('WebviewScreen', { addads, planId,expriedId, paymentUrl: `https://www.demo603.amrithaa.com/webuildindia/razorpay/pay.php?last_id=${item.id}&price=${cleanedPrice}&user_id=${id}&company_id=${addads}` });
  //   }
  // };
  const handleTouchableOpacityPress = (item) => {
    let planId;
    console.log('item --', item.price);
    if (item.price === 'Free') {
      Alert.alert('Free Plan', 'This plan does not require updating the expiration date.');
      planId = item.id;
      console.log('planId---', planId);
      navigation.navigate('CreateyouradsBuilder', { addads,  planId: item.id  });
      freependingadsdata();
      console.log('---', planId);
      console.log('---', addads);
    } else {
      const cleanedPrice = item.price.replace(/\D/g, '');
      setShowWebView(true);
      setPaymentUrl(` https://www.app.webuildindia.in/razorpay/pay.php?last_id=${item.id}&price=${cleanedPrice}&user_id=${id}`);
     
      navigation.navigate('WebviewScreen', { addads,  planId: item.id , expriedId, paymentUrl: ` https://www.app.webuildindia.in/razorpay/pay.php?last_id=${item.id}&price=${cleanedPrice}&user_id=${id}` });
      console.log(' addads,  planId: item.id , expriedId' , addads, expriedId,)
      console.log('addads')
    }
  };
  

  const Detaplandataall = async () => {
    setLoading(true);
    const res = await getplandata(global.url + 'getplan', data);
    console.log('res-----<><><><>', res)
    setData(res.data)
    console.log('res.data----', res.data[0].icon)
    setLoading(false);
  }
  



  const freependingadsdata = async () => {
    try {
        setLoading(true);
        const data = {
            user_id: id,
            company_id: addads,
           
        };
        console.log('data >>1<<', data);
        const res = await freependindata(global.url + 'freependingads', data);

      
        if (res.success === false) {
            Alert.alert('No More Ads Pending', 'You have no more ads pending.');
            navigation.navigate('SubscriptionScreen', { addads, planId});
            return;
        } else {
            // setData3(res.data);
            setModalVisible(true)
        }
    } catch (error) {
        console.error('Error fetching pending ads data:', error);
    } finally {
        setLoading(false);
    }
};

// const convertMonthsToYearsMonthsAndDays = (totalMonths, totalDays) => {
//   const years = Math.floor(totalMonths / 12);
//   const remainingMonths = totalMonths % 12;

//   let result = '';

//   if (years > 0) {
//     result += `${years} year${years > 1 ? 's' : ''}`;
//     if (remainingMonths > 0 || totalDays > 0) {
//       result += ' ';
//     }
//   }

//   if (remainingMonths > 0) {
//     result += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
//     if (totalDays > 0) {
//       result += ' ';
//     }
//   }

//   if (totalDays > 0) {
//     result += `${totalDays} day${totalDays > 1 ? 's' : ''}`;
//   }

//   return result;
// };
const convertDaysToMonths =(days) => {
  const months = (days / 30).toFixed(1); 
  if (months >= 12) {
    const years = Math.floor(months / 12);
    return years === 1 ? '1 year' : years + ' years';
  } else {
    return months === '1.0' ? '1 month' : months.replace('.0', '') + ' months'; 
  }
}

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.flexrow1}>
        <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/images/${item.icon}` }} style={styles.bacimg}></Image>
        <Text style={styles.bacitext}>{item.name}</Text>
      </View>
      <View style={styles.flexrow2}>
        <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/images/${item.tick_icon}` }} style={[styles.yellowtrurimg, styles.yellowtrurimg2]}></Image>
        <Text style={styles.bacitext1}>{convertDaysToMonths(item.duration)}</Text>

      </View>
      <View style={styles.flexrow2}>
        <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/images/${item.tick_icon}` }} style={[styles.yellowtrurimg, styles.yellowtrurimg2]}></Image>
        <Text style={styles.bacitext1}>{item.no_of_ads} Ads</Text>
      </View>
      <View style={styles.flexrow2}>
        <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/images/${item.tick_icon}` }} style={[styles.yellowtrurimg, styles.yellowtrurimg2]}></Image>
        <Text style={[styles.bacitext1, styles.bacitext2]}>{item.desc_1}</Text>
      </View>
      <View style={styles.flexrow2}>
        <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/images/${item.tick_icon}` }} style={[styles.yellowtrurimg, styles.yellowtrurimg2]}></Image>
        <Text style={styles.bacitext1}>{item.desc_2}</Text>
      </View>

      <View style={styles.flexrow2}>
        <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/images/${item.tick_icon}` }} style={[styles.yellowtrurimg, styles.yellowtrurimg2]}></Image>
        {/* <TouchableOpacity onPress={() => handlePurchase(item.id, item.name, item.price)}> */}
        <Text
          style={styles.bacitext1}>
          {item.price}
        </Text>
      </View>
    
      {/* <TouchableOpacity onPress={() => {
        console.log('item --', item.price);
        if (item.price === 'Free') {
          navigation.navigate('CreateyouradsBuilder', { addads });

        } else {
          const cleanedPrice = item.price.replace(/\D/g, '');
          setShowWebView(true);
          setPaymentUrl(`https://www.demo603.amrithaa.com/webuildindia/razorpay/pay.php?last_id=${item.id}&price=${cleanedPrice}&user_id=${id}`);
          navigation.navigate('WebviewScreen', { paymentUrl: `https://www.demo603.amrithaa.com/webuildindia/razorpay/pay.php?last_id=${item.id}&price=${cleanedPrice}&user_id=${id}&company_id=${addads}` });
        }

      }}> */}
      <TouchableOpacity onPress={() => handleTouchableOpacityPress(item)}>

        <View style={[styles.buttonview]}>
          <Text style={[styles.buttontext, styles.buttontext3]}>{String.subscri}</Text>
        </View>
      </TouchableOpacity>
    </View>



  );
  return (
    <LinearGradient
      colors={['#2c328b', '#353a90', '#3d4395', '#50569f',
        '#858abb', '#9fa3c9', '#adb0d0', '#b9bbd6',
        '#c2c4db', '#c1c4da', '#d6d8e5', '#dadbe7',]}
      style={styles.container}>
      <ScrollView>
        <BackArrow />
        <Text style={styles.subtext}>{String.sub}</Text>
        <View style={styles.martop}></View>
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()} // Assuming id is a unique identifier
          renderItem={({ item }) => (

            <View style={[styles.flexrow]}>
              <View style={styles.rowviewstyle}>
                {renderItem({ item })}
              </View>
            </View>

          )}
        />







        {/* <View style={styles.rowviewstyle}>
            <View style={styles.flexrow1}>
              <Image source={icons.adven} style={styles.bacimg}></Image>
              <Text style={styles.bacitext}>{String.advan}</Text>
            </View>
            <View style={styles.flexrow2}>
              <Image source={icons.pinktrue} style={styles.yellowtrurimg}></Image>
              <Text style={styles.bacitext1}>6 Months</Text>
            </View>
            <View style={styles.flexrow2}>
              <Image source={icons.pinktrue} style={styles.yellowtrurimg}></Image>
              <Text style={styles.bacitext1}>1 Ads</Text>
            </View>
            <View style={styles.flexrow2}>
              <Image source={icons.pinktrue} style={styles.yellowtrurimg}></Image>
              <Text style={styles.bacitext1}>Received Enquirt{'\n'}on SMS And Call</Text>
            </View>
            <View style={styles.flexrow2}>
              <Image source={icons.pinktrue} style={styles.yellowtrurimg}></Image>
              <Text style={styles.bacitext1}>View Statistics</Text>
            </View>
            <View style={styles.flexrow2}>
              <Image source={icons.pinktrue} style={styles.yellowtrurimg}></Image>
              <Text style={styles.bacitext1}>1,000</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CreateyouradsBuilder')}>
              <View style={[styles.buttonview, styles.buttonview1]}>
                <Text style={[styles.buttontext, styles.buttontext5]}>{String.purchase}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.flexrow}>
         <View style={styles.rowviewstyle}>
          </View>
          </View> */}



        {/* <View style={styles.flexrow1}>
                  <Image source={icons.preaum} style={styles.preaumimg}></Image>
                  <Text style={styles.bacitext}>{String.preminu}</Text>
                </View>
                <View style={styles.flexrow2}>
                  <Image source={icons.greenture} style={styles.yellowtrurimg}></Image>
                  <Text style={styles.bacitext1}>1 Months</Text>
                </View>
                <View style={styles.flexrow2}>
                  <Image source={icons.greenture} style={styles.yellowtrurimg}></Image>
                  <Text style={styles.bacitext1}>3 Ads</Text>
                </View>
                <View style={styles.flexrow2}>
                  <Image source={icons.greenture} style={styles.yellowtrurimg}></Image>
                  <Text style={styles.bacitext1}>Received Enquirt{'\n'}on SMS And Call</Text>
                </View>
                <View style={styles.flexrow2}>
                  <Image source={icons.greenture} style={styles.yellowtrurimg}></Image>
                  <Text style={styles.bacitext1}>View Statistics</Text>
                </View>
                <View style={styles.flexrow2}>
                  <Image source={icons.greenture} style={styles.yellowtrurimg}></Image>
                  <Text style={styles.bacitext1}>2,000</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ImagesScreen')}>
                  <View style={[styles.buttonview, styles.buttonview2]}>
                    <Text style={[styles.buttontext, styles.buttontext2]}>{String.purchase}</Text>
                  </View>
                </TouchableOpacity>
              </View>
           
          <View style={styles.rowviewstyle}>
            <View style={styles.flexrow1}>
              <Image source={icons.placti} style={styles.plactiimg}></Image>
              <Text style={styles.bacitext}>{String.platinum}</Text>
            </View>
            <View style={styles.flexrow2}>
              <Image source={icons.blueture} style={styles.yellowtrurimg}></Image>
              <Text style={styles.bacitext1}>1 Months</Text>
            </View>
            <View style={styles.flexrow2}>
              <Image source={icons.blueture} style={styles.yellowtrurimg}></Image>
              <Text style={styles.bacitext1}>3 Ads</Text>
            </View>
            <View style={styles.flexrow2}>
              <Image source={icons.blueture} style={styles.yellowtrurimg}></Image>
              <Text style={styles.bacitext1}>Received Enquirt{'\n'}on SMS And Call</Text>

            </View>
            <View style={styles.flexrow2}>
              <Image source={icons.blueture} style={styles.yellowtrurimg}></Image>
              <Text style={styles.bacitext1}>View Statistics</Text>
            </View>
            <View style={styles.flexrow2}>
              <Image source={icons.blueture} style={styles.yellowtrurimg}></Image>
              <Text style={styles.bacitext1}>3,000</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ImagesScreen')}>
              <View style={[styles.buttonview, styles.buttonview3]}>
                <Text style={styles.buttontext}>{String.purchase}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View> */}
        {loading && <ActivityIndicator size="large" color="#fff" />}
        <View style={styles.bottommar} />
      </ScrollView>
    </LinearGradient>
  )
}
export default SubscriptionScreen