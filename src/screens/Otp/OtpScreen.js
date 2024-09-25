import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import { String } from '../../Helper/string';
import PinkButton from '../../Componets/PinkButtonComponet/PinkButton';
import OTPTextView from 'react-native-otp-textinput';

// import OTPInput from '../../Componets/OTPComponets/OTPInput';
import { otpapi } from '../../../APICall';

const OtpScreen = ({ route }) => {
    const [otp, setOtp] = useState('')
    const user_id = route.params;
    console.log('user_id--->', user_id)
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();

    // const handleOTPComplete = (otp) => {
    //     setOtp(otp);
    //     console.log('OTP entered:', otp);

    // };
    const handleOTPChange = (code) => {
        setOtp(code);
    };
    const dataOtp = async () => {
        setSubmitted(true);
        setLoading(true);
        console.log('otp', otp);
        if (otp !== '') {
            const data = {
                user_id: user_id,
                otp: otp,
            };
            console.log('data--->', data)
            try {
                const res = await otpapi(global.url + 'verifyotp', data);
                console.log('res------>', res)
                console.log('global.url------>', global.url)
                console.log('data------>', data)
                if (res && res.success === true) {
                    setLoading(false);
                    navigation.navigate('GetStartedScreen');
                }
            } catch (error) {
                console.error('Error in OTP verification:', error);
                setLoading(false);

            }
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#2c328b', '#353a90', '#3d4395', '#50569f',
                    '#858abb', '#9fa3c9', '#adb0d0', '#b9bbd6',
                    '#c2c4db', '#c1c4da', '#d6d8e5', '#dadbe7',]}
                style={styles.container}>
                <BackArrow />
                <Text style={styles.registertogetxte}>{String.registertoget}</Text>
                <OTPTextView
                 containerStyle={styles.otpContainer}
                 textInputStyle={styles.otpInput}
                    length={4}
                    handleTextChange={(code) => handleOTPChange(code)}
                     keyboardType="numeric"
                   />

                {/* <OTPTextView
                    containerStyle={styles.otpContainer}
                    textInputStyle={styles.otpInput}
                    handleTextChange={(code) => handleOTPChange(code)}
                    inputCount={4}
                    keyboardType="numeric" /> */}
                <View style={styles.flexrowone}>
                    <Text style={styles.didtext}>{String.did}</Text>
                    <TouchableOpacity>
                        <Text style={styles.didtext}>{String.resend}</Text>
                    </TouchableOpacity>
                </View>
                <PinkButton
                    title={String.regis}
                    optragisterbutton={styles.optragisterbutton}
                    onPress={() => dataOtp()}
                />
            </LinearGradient>

        </View>

    );
}
export default OtpScreen;