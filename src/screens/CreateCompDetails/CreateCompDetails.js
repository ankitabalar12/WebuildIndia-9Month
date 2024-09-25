import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, TextInput, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import CustomTextInput from '../../Componets/TextinputComponets/CustomTextInput';
import { styles } from './styles';
import { String } from '../../Helper/string';
import PinkButton from '../../Componets/PinkButtonComponet/PinkButton';
import { createcompanydata, getcompanyadsdata } from '../../../APICall';
import AsyncStorage from '@react-native-community/async-storage';
const CreateCompDetails = ({ navigation }) => {
    const [companyName, setCompanyName] = useState('')
    const [companyPerson, setPerson] = useState('')
    const [login, setLogin] = useState('')
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [id, setID] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const userdata = await AsyncStorage.getItem('logindata');
            const finaluserdata = JSON.parse(userdata);
            setID(finaluserdata.id)
            // setLoading(finaluserdata.email)
            // getcompanyadsalldata(finaluserdata.id)
            console.log('id--->', finaluserdata.id)
            console.log('finaluserdata.email=============--->', finaluserdata.email)


        };
        fetchData();

    }, []);


    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      
      const validateMobileNumber = (mobileNumber) => {
        const mobileRegex = /^[6-9]\d{9}$/;
        return mobileRegex.test(mobileNumber);
      };
      const companydatall = async () => {
        const errors = {};
        try {
            const errors = {};
            if (!companyName.trim()) {
                errors.companyName = 'Please enter a valid company name';
            }
            if (!companyPerson.trim()) {
                errors.companyPerson = 'Please enter a valid company person';
            }
            if (!login.trim()) {
                errors.login = 'Please enter email or mobile number';
              } else if (!validateEmail(login) && !validateMobileNumber(login)) {
                errors.login = 'Please enter a valid email or mobile number';
              }
    
              if (Object.keys(errors).length > 0) {
                setErrors(errors);
                return;
            }
    
            setLoading(true);
            const data = {
                user_id: id,
                company_name: companyName,
                company_person: companyPerson,
                login_email_password: loading
            };
    
            console.log('data-----', data);
            const res = await createcompanydata(global.url + 'createcompany', data);
            console.log('res-----<><><><>', res);
            navigation.navigate('ClientsProfiles', { companydata: id, });
            console.log('companydata---',res.data.id )
        } catch (error) {
            console.error('Error creating company:', error);
        } finally {
            setLoading(false);
        }
    };
    

    




    return (
        <LinearGradient
            colors={['#2c328b', '#353a90', '#3d4395', '#50569f',
                '#858abb', '#9fa3c9', '#adb0d0', '#b9bbd6',
                '#c2c4db', '#c1c4da', '#d6d8e5', '#dadbe7',]}
            style={styles.container}>
            <BackArrow />
            <Text style={styles.centeredText}>{String.CreatecompanyDetails}</Text>
            <ScrollView>
                <View style={styles.margintop} />
                <Text style={styles.companytext}>{String.Compname}</Text>
                <CustomTextInput
                    busniessviewstyle={styles.busniessviewstyle}
                    placeholder="Enter your company name"
                    placeholderTextColor={'#8391A1'}
                    value={companyName}
                    onChangeText={(companyName) => setCompanyName(companyName)}
                />
                {errors.companyName && (
                    <Text style={styles.erroetext}>{errors.companyName}</Text>
                )}
                <Text style={styles.companytext}>{String.pareson}</Text>
                <CustomTextInput
                    busniessviewstyle={styles.busniessviewstyle}
                    placeholder="Enter your company name"
                    placeholderTextColor={'#8391A1'}
                    value={companyPerson}
                    onChangeText={(companyPerson) => setPerson(companyPerson)}
                />
                {errors.companyPerson && (
                    <Text style={styles.erroetext}>{errors.companyPerson}</Text>
                )}
                <Text style={styles.companytext}>{String.login}</Text>
                <CustomTextInput
                    busniessviewstyle={styles.busniessviewstyle}
                    placeholder="E-mail ID (or) Phone number"
                    placeholderTextColor={'#8391A1'}
                    value={loading}
                    onChangeText={(loading) => setLogin(loading)}
                />
                {errors.login && <Text style={styles.erroetext}>{errors.login}</Text>}
                <PinkButton
                    busniestyle={styles.busniestyle}
                    title={String.Conform}
                    onPress={companydatall}
                // onPress={() => {navigation.navigate('CreateCompDetails')}}

                />

            </ScrollView>
        </LinearGradient>
    )
}
export default CreateCompDetails;