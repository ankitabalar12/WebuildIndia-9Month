import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert, Linking, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { icons } from '../../Helper/icons';
import CustomTextInput from '../../Componets/TextinputComponets/CustomTextInput';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import { String } from '../../Helper/string';
import PinkButton from '../../Componets/PinkButtonComponet/PinkButton';
import { getconfigall, registration } from '../../../APICall';
import ReactNativeModal from 'react-native-modal';
import RenderHTML from 'react-native-render-html';
const RegisterScreen = () => {
    const { width } = useWindowDimensions();
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [modalVisible, setModalVisible] = useState()
    const [modalVisible2, setModalVisible2] = useState()
    const [modalVisible3, setModalVisible3] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [mobile, setMobile] = useState()
    const [password, setPassword] = useState()
    const [confirm, setConfiem] = useState()
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [confirmshowPassword, setConfirmShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);
    useEffect(() => {
        getconfigData();
    }, []);
    const toggleCheckbox = () => {
        setChecked(!checked);
    };
    const toggleCheckbox2 = () => {
        setChecked2(!checked2);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmShowPassword(!confirmshowPassword)
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }
    const toggleModal2 = () => {
        setModalVisible2(!modalVisible2)
    }
    const toggleModal3 = () => {
        setModalVisible3(!modalVisible3)
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // const validateMobileNumber = (mobileNumber) => {
    //     // const mobileRegex = /^[6-9]\d{9}$/;
    //     return mobileRegex.test(mobileNumber);
    // };

    // const handleLinkPress = (pdfFile) => {
    //     const pdfview = 'https://www.app.webuildindia.in/admin/public/api/' + pdfFile;

    //     console.log('pdfview =>> ', pdfview);
    //     Linking.openURL(pdfview)
    //         .then(() => console.log('Opening PDF:', pdfFile))
    //         .catch((error) => console.error('Failed to open PDF:', error));
    // };
    // const handleLinkPress = (pdfFile) => {
    //     // Construct the full URL for the PDF file
    //     const pdfview = `https://www.app.webuildindia.in/admin/public/api/` + pdfFile;

    //     console.log('pdfview =>> ', pdfview);

    //     // Attempt to open the URL
    //     Linking.openURL(pdfview)
    //         .then(() => {
    //             console.log('Opening PDF:', pdfFile);
    //         })
    //         .catch((error) => {
    //             console.error('Failed to open PDF:', error);
    //         });
    // };
    const handleRegistration = async () => {
        setLoading(true);
        
        const errors = {};
        if (!name) {
            errors.name = 'Please enter name';
        }
        if (!checked) {
            errors.checked = 'Please select checkbox';
        }
        if (!checked2) {
            errors.checked2 = 'Please select checkbox';
        }
        if (!email) {
            errors.email = 'Please enter email';
        } else if (!validateEmail(email)) {
            errors.email = 'Please enter a valid email';
        }

        if (!mobile) {
            errors.mobile = 'Please enter phone number';
        }

        if (!password) {
            errors.password = 'Please enter password';
        }
        if (!confirm) {
            errors.confirm = 'Please enter confirmpassword';
        }
        setErrors(errors);
        if (Object.keys(errors).length > 0) {
            Alert.alert('Validation Error', 'Please fill in all required fields.');
            return;
        }

       

        const data = {
            email: email,
            mobile: mobile,
            password: password,
            name: name
        };
        try {
            const res = await registration(global.url + 'register', data);
            console.log('res---->', res)
            console.log('global.url -----', global.url)
            console.log('data--------', data)
            console.log('-------->>>>>>', data.name)
            console.log('-------->>>>>>', data.id)
            if (res && res.success === true) {
                console.log('Registration successful:', res);
                navigation.navigate('OtpScreen', { user_id: res.data[0].id });
                console.log('id-----', res.data[0].id)
            } else {
                if (res.data.mobile && res.data.mobile[0]) {
                    Alert.alert('Registration Error', res.data.mobile[0]);
                } else if (res.data.email && res.data.email[0]) {
                    Alert.alert('Registration Error', res.data.email[0]);
                } else {
                    Alert.alert('Registration Error', res ? res.message : 'An unexpected error occurred.');
                }
            }
        } catch (error) {
            console.error('Registration process error:', error);
            Alert.alert('Error', 'An unexpected error occurred during registration.');
        } finally {
            setLoading(false);
        }
    };

    const getconfigData = async () => {
        try {
            setLoading(true);
            const res = await getconfigall(global.url + 'getconfig', data);
            console.log('res-----', res);
            setData(res.data[1]);
            setData2(res.data[0]);
            setData3(res.data[2]);
            console.log(res.data[1].name)
            console.log(res.data[1].value)
        } catch (error) {
            console.error('Error fetching onboardscreen data:', error);
        } finally {
            setLoading(false);
        }
    };


    const htmlContent = `
    <p>Terms & condition text </p>
    `;
    const htmlContentdis = `
    <p>Terms & condition text </p>
    `;
    const htmlContentpripolicy = `
    <p>Privacy policy data okdfdf</p><p>dfd</p><p><strong>fdfdf</strong></p><p>dfdf</p><p>dfd</p><p>fdf</p><p> </p>
    `;
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#2c328b', '#353a90', '#3d4395', '#50569f',
                    '#858abb', '#9fa3c9', '#adb0d0', '#b9bbd6',
                    '#c2c4db', '#c1c4da', '#d6d8e5', '#dadbe7',]}
                style={styles.container}
            >
                <ScrollView>
                    <BackArrow />
                    <Text style={styles.registertogetxte}>{String.registertoget}</Text>
                    <Text style={styles.registertogetxte}>{String.name}</Text>
                    <CustomTextInput
                        value={name}
                        placeholder="Name"
                        placeholderTextColor={'#808080'}
                        onChangeText={(name) => setName(name)}
                    />
                    {/* {errors.name && <Text style={styles.erroetext}>{errors.name}</Text>} */}
                    <CustomTextInput
                        value={email}
                        placeholder="Email"
                        placeholderTextColor={'#808080'}
                        onChangeText={(email) => setEmail(email)}
                    />
                    {/* {errors.email && <Text style={styles.erroetext}>{errors.email}</Text>} */}
                    <CustomTextInput
                        textviewstyle={styles.textviewstyle}
                        placeholder="Mobile"
                        value={mobile}
                        maxLength={10}
                        keyboardType="numeric"
                        placeholderTextColor={'#808080'}
                        onChangeText={(mobile) => setMobile(mobile)}
                    />
                    {/* {errors.mobile && <Text style={styles.erroetext}>{errors.mobile}</Text>} */}
                    <View style={styles.textinputview2}>
                        <View style={styles.flexrow}>
                            <TextInput
                                placeholder="Enter your password"
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
                    <View style={[styles.textinputview2, styles.textinputview0]}>
                        <View style={styles.flexrow}>
                            <TextInput
                                placeholder="Confirm Password"
                                value={confirm}
                                placeholderTextColor={'#808080'}
                                onChangeText={(confirm) => setConfiem(confirm)}
                                secureTextEntry={!confirmshowPassword}
                            />
                            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                                {confirmshowPassword ?
                                    <Image source={icons.showpass} style={styles.showpaasowdimg}></Image>
                                    :
                                    <Image source={icons.closeeye} style={styles.hidepaasowdimg}></Image>}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.checkboxflex}>
                        <TouchableOpacity onPress={toggleCheckbox}
                            style={[styles.checkboxstyle,
                            {

                                backgroundColor: checked ? "#823995" : '#fff'
                            }]}>
                            {checked && (
                                <Image
                                    style={styles.chechicon}
                                    resizeMode="stretch"
                                    source={icons.checkmark}
                                />
                            )}
                        </TouchableOpacity>
                        <View style={styles.texttoutrme}>
                            <Text style={styles.textstyletrms}>I accept the general </Text>
                            <TouchableOpacity onPress={() => { setModalVisible2(true) }}>
                                <Text style={[styles.textstyletrms, { textDecorationLine: 'underline' }]}>Disclaimer page ,</Text>
                            </TouchableOpacity>


                        </View>

                    </View>
                    <View style={[styles.texttoutrme, { marginLeft: "15%", marginTop: 3 }]}>
                        <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                            <Text style={[styles.textstyletrms, { textDecorationLine: 'underline' }]}>Terms</Text>
                        </TouchableOpacity>
                        <Text style={styles.textstyletrms}>&</Text>
                        <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                            <Text style={[styles.textstyletrms, { textDecorationLine: 'underline', }]}>conditions.</Text>
                        </TouchableOpacity>
                    </View>
                    {errors.checked && <Text style={styles.erroetext}>{errors.checked}</Text>}
                    <View style={[styles.checkboxflex, styles.checkboxflex2]}>
                        <TouchableOpacity onPress={toggleCheckbox2}
                            style={[styles.checkboxstyle,
                            { backgroundColor: checked2 ? "#823995" : '#fff' }]}>
                            {checked2 && (
                                <Image
                                    style={styles.chechicon}
                                    resizeMode="stretch"
                                    source={icons.checkmark}
                                />
                            )}
                        </TouchableOpacity>
                        <View style={[styles.texttoutrme]}>
                            <Text style={styles.textstyletrms}>I accept the </Text>
                            <TouchableOpacity onPress={() => setModalVisible3(true)}>
                                <Text style={[styles.textstyletrms, { textDecorationLine: 'underline', }]}>Privacy, </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setModalVisible3(true) }}>
                                <Text style={[styles.textstyletrms, { textDecorationLine: 'underline', }]}>Policy </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {errors.checked2 && <Text style={styles.erroetext}>{errors.checked2}</Text>}
                    {/* {errors.confirm && <Text style={styles.erroetext}>{errors.confirm}</Text>} */}
                    <PinkButton
                        title={String.regis}
                        ragisterbutton={styles.ragisterbutton}
                        onPress={() => {handleRegistration()}}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <View style={styles.rowviewtextaccout}>
                            <Text style={styles.textloginteo}>{String.already}</Text>
                            <Text style={[styles.textloginteo, styles.textloginteo0o]}>{String.loginrsc}</Text>
                        </View>
                    </TouchableOpacity>


                    {loading && <ActivityIndicator size="large" color="#fff" />}


                    <View style={styles.mtrgintop} />
                </ScrollView>
            </LinearGradient>
            <ReactNativeModal
                isVisible={modalVisible}
                onBackdropPress={toggleModal}
                transparent={true}
                backdropColor={'rgba(0, 0, 0, 0.5)'}
                style={{ margin: 0, bottom: 0 }}
                backdropOpacity={0.5}
            >
                <View style={styles.mainvew}>
                    <Text style={styles.nametextstyle}>{data.name}</Text>
                    <RenderHTML contentWidth={width} source={{ html: htmlContent }} baseStyle={styles.textStyleInRes} />
                </View>
            </ReactNativeModal>
            <ReactNativeModal
                isVisible={modalVisible2}
                onBackdropPress={toggleModal2}
                transparent={true}
                backdropColor={'rgba(0, 0, 0, 0.5)'}
                style={{ margin: 0, bottom: 0 }}
                backdropOpacity={0.5}
            >
                <View style={styles.mainvew}>
                    <Text style={styles.nametextstyle}>{data3.name}</Text>
                    <Text style={styles.textStyleInRes}>{data3.value}</Text>
                    {/* <RenderHTML contentWidth={width} source={{ html: htmlContentdis }}  baseStyle={styles.textStyleInRes}/>   */}
                </View>
            </ReactNativeModal>
            <ReactNativeModal
                isVisible={modalVisible3}
                onBackdropPress={toggleModal3}
                transparent={true}
                backdropColor={'rgba(0, 0, 0, 0.5)'}
                style={{ margin: 0, bottom: 0 }}
                backdropOpacity={0.5}
            >
                <View style={styles.mainvew2}>
                    <View style={styles.flexrowinapi}>
                        <Text style={styles.nametextstyle}>{data2.name}</Text>
                        <TouchableOpacity onPress={() => setModalVisible3(false)} style={styles.closearrow}>
                            <Image source={icons.close} style={styles.rightarrowimg}></Image>
                        </TouchableOpacity>

                    </View>
                    <RenderHTML contentWidth={width} source={{ html: htmlContentpripolicy }} baseStyle={styles.textStyleInRes2} />
                </View>
            </ReactNativeModal>
        </View>

    );
}
export default RegisterScreen;