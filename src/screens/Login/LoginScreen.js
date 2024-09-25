import React, { useState, useEffect,useRef } from 'react';
import { Text, TextInput, BackHandler, ToastAndroid,TouchableOpacity, Alert,  View, Image, ActivityIndicator, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import { String } from '../../Helper/string';
import { icons } from '../../Helper/icons';
import PinkButton from '../../Componets/PinkButtonComponet/PinkButton';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../../APICall';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [backPressed, setBackPressed] = useState(0);
  const webviewRef = useRef(null);
    const [showError, setShowError] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 const handleForgotPassword = () => {
    navigation.navigate('Forgotpassword');
  };
 
  useEffect(() => {
    let update = true;

    const backAction = () => {
      if (update) {
        if (backPressed > 0) {
          BackHandler.exitApp();
        } else {
          if (webviewRef.current) {
            webviewRef.current.goBack();
            console.log('-------------',webviewRef.current)
          }
          setBackPressed(backPressed + 1);
          ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
          setTimeout(() => setBackPressed(0), 1000);
        }
        return true;
      }r
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
      update = false;
    };
  }, [backPressed]);
  const validateMobileNumber = (mobileNumber) => {
    // Mobile number must be 10 digits long and start with a digit from 6 to 9
    const re = /^[6-9]\d{9}$/;
    return re.test(mobileNumber);
  };


  const logindata = async () => {
    const errors = {};
    if (!mobile) {
      errors.mobile = 'Please enter phone number';
    } else if (!validateMobileNumber(mobile)) {
      errors.mobile = 'Please enter a valid mobile number';
    }
    if (!password) {
        errors.password = 'Please enter password';
    }
    setErrors(errors);

    console.log('global.url------', global.url);
    setSubmitted(true);

    if (mobile !== '' && password !== '') {
        setLoading(true);
        if (!global.token) {
          console.error('Token is not available.');
          return;
      }
        const data = {
            mobile: mobile,
            password: password,
            device_id:global.tokenId.token
        };
        console.log('data <><><>', data)
        try {
            const res = await login(global.url + 'login', data);
            console.log('data-----', data);
            console.log('res---------', res);
            if (res && res.success === true) {
              // if (res.is_agency === 1) {
              //     console.log('res.success----', res.success)
              //       // navigation.navigate('ClientsProfiles'); 
              //   } else {
                    navigation.navigate('HomeScreen'); 
              //   }
            } else {
                Alert.alert('Invalid Login', 'Please check your mobile number and password.');
            }
        } catch (error) {
            console.error('Login process error:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    } else {
        Alert.alert('Validation Error', 'Please fill in all required fields.');
    }
};


const handleButtonClick = () => {
  logindata();
};
  return (

    <LinearGradient
      colors={['#2c328b', '#353a90', '#3d4395', '#50569f',
        '#858abb', '#9fa3c9', '#adb0d0', '#b9bbd6',
        '#c2c4db', '#c1c4da', '#d6d8e5', '#dadbe7',]}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.viewstyle}>
          <Text style={styles.welcomtext}>{String.welcom}</Text>

          <View style={styles.textinputview}>
            <TextInput
              placeholder="Enter your email /mobile"
              placeholderTextColor={'#808080'}
              //  maxLength={10} 
              value={mobile}
              // keyboardType="numeric"
              onChangeText={(mobile) => setMobile(mobile)}
            />
          </View>
          {/* {errors.mobile && <Text style={styles.erroetext}>{errors.mobile}</Text>} */}
          <View style={styles.textinputview2}>
            <View style={styles.flexrow}>
              <TextInput
                placeholder="Enter your Password"
                placeholderTextColor={'#808080'}
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                {showPassword ?
                  <Image source={icons.showpass} style={styles.showpaasowdimg}></Image>
                  :
                  <Image source={icons.closeeye} style={styles.hidepaasowdimg}></Image>}
              </TouchableOpacity>
            </View>
          </View>
          {/* {errors.password && <Text style={styles.erroetext}>{errors.password}</Text>} */}
          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotpass}>
            <Text style={styles.passwordtext}>{String.forgotpass}</Text>
          </TouchableOpacity>
        </View>
        <PinkButton
          title={String.login}
          onPress={() => handleButtonClick()}
          stylemar={styles.stylemar}
        />
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <View style={styles.rowviewtextaccout}>
            <Text style={styles.textloginteo}>{String.already}</Text>
            <Text style={[styles.textloginteo, styles.textloginteo0o]}>{String.loginnow}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      {loading && <ActivityIndicator size="large" color="#fff" />}
    </LinearGradient>
  )
};
export default LoginScreen;