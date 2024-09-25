import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import { String } from '../../Helper/string';
import PinkButton from '../../Componets/PinkButtonComponet/PinkButton';
import CustomTextInput from '../../Componets/TextinputComponets/CustomTextInput';
const Forgotpassword = () => {
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const validateEmail = () => {
        if (!email) {
          setErrors({ email: 'Please enter your email' });
        } else if (!email.includes('@') || !email.includes('.com')) {
          setErrors({ email: 'Please enter a valid email address' });
        } else {
          setErrors({});

          console.log('Email is valid');
          navigation.navigate('NewpassworScreen');
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
                <Text style={styles.textstyel}>{String.gorgotpass}</Text>
                <Text style={styles.dontworrytext}>{String.dontworry}</Text>
                <CustomTextInput
                    textviewstyle={styles.textviewstyle}
                    placeholder="Email Address"
                    placeholderTextColor={'#808080'}
                    onChangeText={(email) => setEmail(email)}
                />
                 {errors.email && (
                        <Text style={styles.erroetext}>{errors.email}</Text>
                    )}
                <PinkButton
                    title={String.sendcode}
                    forgetragisterbutton={styles.forgetragisterbutton}
                    onPress={validateEmail}
                />
            </LinearGradient>

        </View>

    );
}
export default Forgotpassword;