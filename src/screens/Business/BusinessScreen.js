import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, TextInput, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import CustomTextInput from '../../Componets/TextinputComponets/CustomTextInput';
import { styles } from './styles';
import { String } from '../../Helper/string';
import PinkButton from '../../Componets/PinkButtonComponet/PinkButton';
import AsyncStorage from '@react-native-community/async-storage';
const BusinessScreen = ({ navigation }) => {
    const [companyName, setCompanyName] = useState('')
    const [companyPerson, setPerson] = useState('')
    const [login, setLogin] = useState('')
    const [errors, setErrors] = useState({});
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const userdata = await AsyncStorage.getItem('logindata');
    //         const finaluserdata = JSON.parse(userdata);
    //         setLogin(finaluserdata.email)
    //         console.log('email--kkkkkkkkkkkkkkkkkk..........-------->', finaluserdata.email)

    //     };
    //     fetchData();
    //     // viewalldata();

    // }, []);

    useEffect(() => {
        const mycompanyaCurrentDate = async () => {
            const userdata = await AsyncStorage.getItem('logindata');
            const finaluserdata = JSON.parse(userdata);
            setLogin(finaluserdata.email)
          
             console.log('agency_code--dfdfdsfds',finaluserdata.email)
        };
        mycompanyaCurrentDate();
    }, [])

    const validateInputs = () => {
        const errors = {};
        if (!companyName.trim()) {
            errors.companyName = 'Please enter a valid company name';
        }
        if (!companyPerson.trim()) {
            errors.companyPerson = 'Please enter a valid company person';
        }
        if (!login.trim()) {
            errors.login = 'Please enter a valid login';
        }
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            navigation.navigate('ClientProfileScreen');
        } else {
        }
        console.log('companyName----', companyName)
        console.log('companyPerson----', companyPerson)
        console.log('login----', login)
    };
    return (
        <LinearGradient
            colors={['#2c328b', '#353a90', '#3d4395', '#50569f',
                '#858abb', '#9fa3c9', '#adb0d0', '#b9bbd6',
                '#c2c4db', '#c1c4da', '#d6d8e5', '#dadbe7',]}
            style={styles.container}>
            <BackArrow />
            <Text style={styles.centeredText}>{String.cyb}</Text>
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
                    value={login}
                    onChangeText={(login) => setLogin(login)}
                />
                {errors.login && <Text style={styles.erroetext}>{errors.login}</Text>}
                <PinkButton
                    busniestyle={styles.busniestyle}
                    title={String.Conform}
                    onPress={validateInputs}

                />

            </ScrollView>
        </LinearGradient>
    )
}
export default BusinessScreen;