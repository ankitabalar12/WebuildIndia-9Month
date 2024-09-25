import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import { String } from '../../Helper/string';
import PinkButton from '../../Componets/PinkButtonComponet/PinkButton';
import CustomTextInput from '../../Componets/TextinputComponets/CustomTextInput';
const NewpassworScreen = () => {
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const getError = (newPassword, confirmPassword) => {
        const errors = {};
    
        if (!newPassword) {
          errors.newPassword = 'Please Enter New Password';
        } else if (newPassword.length < 6) {
          errors.newPassword = 'New Password must be at least 6 characters';
        }
    
        if (!confirmPassword) {
          errors.confirmPassword = 'Please Confirm Password';
        } else if (confirmPassword !== newPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }
    
        return errors;
      };
    
      const validatePassword = () => {
        const errors = getError(newPassword, confirmPassword);
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          console.log(errors);
        } else {
          setErrors({});
          console.log('Password is valid');
         
          navigation.navigate('PasswScreen');
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
                <Text style={styles.textstyel}>{String.create}</Text>
                <Text style={styles.dontworrytext}>{String.yournewpasswor}</Text>
                <CustomTextInput
                    textviewstyle={styles.textviewstyle}
                    placeholder="New Password"
                    placeholderTextColor={'#808080'}
                    value={newPassword}
                    onChangeText={(newPassword) => setNewPassword(newPassword)}
                />
                 {errors.newPassword && <Text style={styles.erroetext}>{errors.newPassword}</Text>}
                 <CustomTextInput
                    textviewstyle={styles.textviewstyle}
                    placeholder="Confirm Password"
                    placeholderTextColor={'#808080'}
                    value={confirmPassword}
                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                />
                 {errors.confirmPassword && <Text style={styles.erroetext}>{errors.confirmPassword}</Text>}
                <PinkButton
                    title={String.resendpassword}
                  resendpassword={styles.resendpassword}
                  onPress={validatePassword}
                />
            </LinearGradient>

        </View>

    );
}
export default NewpassworScreen;