import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, TextInput, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import { styles } from './styles';
import { String } from '../../Helper/string';
import { icons } from '../../Helper/icons';
import Modalcomponets from '../../Componets/ModalComponet/Modalcomponets';
import { AgencyCommiDataall, addadsdata, agencycommisiondata, getcompanyadsdata, myAdsDataall, mycompanyalldata, pendindata } from '../../../APICall';
import AsyncStorage from '@react-native-community/async-storage';
const ClientsProfiles = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState()
    const [isThirdViewVisible, setThirdViewVisible] = useState(true);
    const [company_id, setcompany_id] = useState(true);
    // const [isThirdViewVisible3, setThirdViewVisible3] = useState(true);
    // const [isButtonVisible, setButtonVisible] = useState(true);
    const [company_name, setCompanyName] = useState('')
    const [company_description, setDescription] = useState('')
    const [company_address, setCompanyAddres] = useState('')
    const [category, setCategories] = useState(null)
    const [sub_category, setSub_categories] = useState(null)
    const [phone_number, setPhonenumber] = useState('')
    const [email, setE_Mailid] = useState('')
    const [pincode, setPinCode] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [data, setData] = useState('')
    const [not, setnot] = useState('');
    const [data2, setData2] = useState('')
    const [loading, setLoading] = useState(false);
    const [componydata, setComponydata] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);
    const [createCompany, setCreateCompany] = useState();
    const [agencycommision, setagencycommision] = useState();
    const [is_agency_code, setAgency_code] = useState()
    const [id, setId] = useState('')
    const [data3, setData3] = useState('')
    const [selectedcompany, setselectedcompany] = useState('')


    // const Clientdatapass = route?.params
    // console.log('Clientdatapass---->', Clientdatapass)
    // const companydata = route?.params
    // console.log('companydata----', companydata)


    useEffect(() => {
        const mycompanyaCurrentDate = async () => {
            const userdata = await AsyncStorage.getItem('logindata');
            const finaluserdata = JSON.parse(userdata);
            setId(finaluserdata.id)
            mycompanydatall(finaluserdata.id);
            agencyCommiData(finaluserdata.id);
            setAgency_code(finaluserdata.agency_code);
        //  setcompany_id(finaluserdata.id)
             console.log('agency_code--',finaluserdata.agency_code)
        };
        navigation.addListener('focus', () => {
            mycompanyaCurrentDate();

        })
    }, [not])


    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }
    const handleThirdViewClick = (item) => {
        setSelectedItem(item);
        setThirdViewVisible(!isThirdViewVisible);
    };
    // const mycompanydatall = async (id) => {
    //     setLoading(true);
    //     try {
    //         const data = {
    //             user_id: id,
    //         };
    //         console.log('data ::', data)
    //         const res = await mycompanyalldata(global.url + 'mycompany', data);
    //         console.log('id--', res.data[0].id)

    //         setComponydata(res.data);


    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const mycompanydatall = async (id) => {
        setLoading(true);
        try {
            const data = {
                user_id: id,
            };
            console.log('data ::', data);
            const res = await mycompanyalldata(global.url + 'mycompany', data);
    
            // Check if res.data is an array and has at least one item
            if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
                console.log('id--', res.data[0].id);
                setComponydata(res.data);
            } else {
                console.error('Data is not in the expected format or is empty:', res);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    

    const getcompanyadsalldata = async (id) => {
        setLoading(true);
        try {
            const data = {
                company_id: id,
            };
            console.log('data----*', data)
            const res = await getcompanyadsdata(global.url + 'getcompanyads', data);
            console.log('res ::', res);
            if (res.data && res.data.length >= 1) {
                setCreateCompany(res.data)
            }
            console.log('data.id--', res.data);

        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const agencyCommiData = async (id) => {
        setLoading(true);
        const data = {
            user_id: id
        }
        console.log('data----@@@ >>', data)
        const res = await AgencyCommiDataall(global.url + 'agency_commision', data);
        setData2(res.data)
        console.log('res.data >> ', res.data)

        console.log('global.url--- :->', global.url)
        console.log('res-----<', res)

    }
    const pendingadsdata = async (cid) => {
        try {
            setLoading(true);
            const data = {
                user_id: id,
                company_id: cid

            };
            console.log('data--1', data);
            const res = await pendindata(global.url + 'pendingads', data);
            if (res.success === false) {
                Alert.alert('No More Ads Pending', 'You have no more ads pending.');
                global.adstype = 0;
                navigation.navigate('SubscriptionScreen', { addads: cid });
                return;
            } else {
                setData3(res.data);
                console.log('data >> ', data)

                setselectedcompany(cid);
                setModalVisible(true)
            }

        } catch (error) {
            console.error('Error fetching pending ads data:', error);
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
            <View style={styles.flexrow}>
                <BackArrow />
                <Text style={styles.youprofiltext}>{String.clirntpro}</Text>
            </View>
            <ScrollView>


                <View style={styles.addcompanyrow}>
                    <Text style={styles.companiestexyt}>{String.companies}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateCompDetails')}>
                        <View style={styles.addcompny}>

                            <View style={styles.row4}>
                                <Text style={styles.ceattext}>{String.addcom}</Text>
                                <Image source={icons.add} style={styles.plusimg2}></Image>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                {componydata && Array.isArray(componydata) ? (<View>
                    {componydata.map((item, index) => (<View key={index}>
                        <TouchableOpacity onPress={() => {
                            handleThirdViewClick(item);
                            getcompanyadsalldata(item.id);
                        }}>
                            <ImageBackground
                                source={icons.halfimgnam}
                                style={styles.liveviewstyle2} borderRadius={10}>
                                <View style={styles.overlay2} />
                                <View style={styles.rowASB}>
                                    <Text style={[styles.ASB]}>{item.company_name}</Text>
                                    <View style={styles.createaddcombox}>
                                        <TouchableOpacity onPress={() => {
                                            pendingadsdata(item.id);
                                            // navigation.navigate('SubscriptionScreen', { addads: item.id });
                                            // console.log('addads----3', item.id)
                                        }}>
                                            <View style={styles.row4}>
                                                <Text style={styles.ceattext}>{String.createadd}</Text>
                                                <Image source={icons.add} style={styles.plusimg2}></Image>
                                            </View>
                                        </TouchableOpacity>
                                    </View>


                                </View>
                            </ImageBackground>
                        </TouchableOpacity>


                        {isThirdViewVisible && selectedItem === item && (
                            <View>
                                {createCompany && Array.isArray(createCompany) ? (
                                    <View>
                                        {createCompany.map((item2, index) => (
                                            <View key={index}>
                                                <ImageBackground
                                                    source={icons.abc}
                                                    style={styles.liveviewstyle}
                                                    borderRadius={10}>
                                                    <View style={styles.overlaywqe} />
                                                    <Text style={[styles.ASB, styles.ASB2]}>{item2.company_name}</Text>
                                                    <Text style={styles.ltdtext}>{/* Company description or other data */}</Text>
                                                    <View style={styles.margintop} />
                                                    <View style={styles.flexMainRow}>
                                                        <View style={styles.flexRow}>
                                                            <Text style={styles.textssnc}>Cat: </Text>
                                                            <Text style={styles.textssnc1}>{item2.category_name}</Text>
                                                        </View>
                                                        <View style={[styles.flexRow, styles.flexRow2]}>
                                                            <View style={styles.viewdfdy}>
                                                                <Text style={styles.textssnc}>State: </Text>
                                                            </View>
                                                            <Text style={[styles.textssnc1, styles.textssnc3]}>{item2.state}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.flexMainRow}>
                                                        <View style={styles.flexRow}>
                                                            <Text style={styles.textssnc}>Sub-Cat: </Text>
                                                            <Text style={styles.textssnc1}>{item2.subcategory_name}</Text>
                                                        </View>
                                                        <View style={[styles.flexRow, styles.flexRow2, styles.flexRowthree]}>
                                                            <View style={styles.viewdfd}>
                                                                <Text style={styles.textssnc}>Country: </Text>
                                                            </View>
                                                            <Text style={[styles.textssnc1,]}>{item2.city}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={[styles.flexRow, styles.flexRow3]}>
                                                        <Text style={styles.textssnc}>Phone No: </Text>
                                                        <Text style={styles.textssnc1}>{item2.phone_number}</Text>
                                                    </View>
                                                    <View style={[styles.flexRow, styles.flexRow3]}>
                                                        <Text style={styles.textssnc}>Create By: </Text>
                                                        <Text style={styles.textssnc1}>Agency</Text>
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                        ))}
                                    </View>
                                ) : <View><Text style={styles.adstext}>No ads added</Text></View>}
                            </View>
                        )}


                    </View>))}
                </View>) : null}


                <Modalcomponets
                    isVisible={modalVisible}
                    onBackdropPress={toggleModal}
                    swipeDirection={['down']}
                    backdropColor={'#000'}
                    backdropOpacity={0.2}
                    modalestyle={styles.modalestyle}
                    title={'You can create ' + data3 + ' more ads \n on your subscription'}
                    textstylemodal={styles.textstylemodal}
                    buttonview={styles.buttonview}
                    title2style={styles.title2style}
                    title2={String.next}
                    onPress={() => {
                        setModalVisible(false);
                        navigation.navigate('CreateyouradsBuilder', { addads: selectedcompany });
                    }} />
                {loading && <ActivityIndicator size="large" color="#fff" />}
                <Text style={styles.companiestexyt3}>{String.agency}     {is_agency_code}</Text>
                <View style={styles.flexrowviwe1}>
                    <Text style={styles.flexviewtext}>{String.Compname}</Text>
                    <Text style={styles.flexviewtext}>{String.planname}</Text>
                    <Text style={styles.flexviewtext}>{String.price}</Text>
                </View>
                {data2 && Array.isArray(data2) && data2.length > 0 ? (
                    <View>
                        {data2.map((item2, index) => (
                            <View style={styles.mainviewstyle}>
                                <View style={styles.flexrowviwe2} key={index}>
                                    <View style={styles.view1}>
                                        <Text style={[styles.flexviewtext1, styles.flexviewtexttwofdg]}>{item2.company_name}</Text>
                                    </View>
                                    <View style={styles.view2}>
                                        <Text style={styles.flexviewtext1}>{item2.plan_name} 
                                        {/* {item2.plan_price !== "Free" && `[${item2.plan_price.replace(/[^0-9]/g, '')}]`} */}
                                        </Text>


                                    </View>
                                    <View style={styles.view3}>
                                        <Text style={styles.flexviewtext1}>{item2.plan_price}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : <View><Text style={styles.adstext}>No ads added</Text></View>}




                {/* <View style={styles.mainviewstyle}>
                    <View style={styles.flexrowviwe2}>
                        <Text style={styles.flexviewtext1}>SHAIN</Text>
                        <Text style={[styles.flexviewtext1, styles.flexviewtextfour]}>platinum</Text>
                        <Text style={styles.flexviewtext1}>500</Text>
                    </View>
                </View>
                <View style={styles.mainviewstyle}>
                    <View style={styles.flexrowviwe2}>
                        <Text style={styles.flexviewtext1}>AMRITHA</Text>
                        <Text style={[styles.flexviewtext1, 
                            styles.flexviewtextfive]}>Premium</Text>
                        <Text style={styles.flexviewtext1}>500</Text>
                    </View>
                </View>
                <View style={styles.mainviewstyle}>
                    <View style={styles.flexrowviwe2}>
                        <Text style={styles.flexviewtext1}>QUANZI</Text>
                        <Text style={[styles.flexviewtext1, styles.flexviewtextfour]}>Advanced</Text>
                        <Text style={styles.flexviewtext1}>500</Text>
                    </View>
                </View>
                <View style={styles.mainviewstyle}>
                    <View style={styles.flexrowviwe2}>
                        <Text style={styles.flexviewtext1}>WINGS</Text>
                        <Text style={[styles.flexviewtext1, styles.flexviewtexts]}>Basic</Text>
                        <Text style={styles.flexviewtext1}>500</Text>
                    </View>
                </View>
                <View style={styles.mainviewstyle}>
                    <View style={styles.flexrowviwe2}>
                        <Text style={styles.flexviewtext1}>WINZOO</Text>
                        <Text style={[styles.flexviewtext1, styles.flexviewtextfive]}>Premium</Text>
                        <Text style={styles.flexviewtext1}>500</Text>
                    </View>
                </View>
                <View style={styles.mainviewstyle}>
                    <View style={styles.flexrowviwe2}>
                        <Text style={styles.flexviewtext1}>RAPE</Text>
                        <Text style={[styles.flexviewtext1, styles.flexviewtextfour]}>Advanced</Text>
                        <Text style={styles.flexviewtext1}>500</Text>
                    </View>
                </View> */}
                {/* <PinkButton
                    clientstyle={styles.clientstyle}
                title={String.creaddd} /> */}
                <View style={styles.marginbottom} />
                {/* <Modalcomponets
                    isVisible={modalVisible}
                    onBackdropPress={toggleModal}
                    swipeDirection={['down']}
                    modalestyle={styles.modalestyle}
                    title={String.youcan}
                    textstylemodal={styles.textstylemodal}
                    buttonview={styles.buttonview}
                    title2style={styles.title2style}
                    title2={String.next}
                    onPress={() => {
                        setModalVisible(false);
                        navigation.navigate("AddclientScreen");
                    }}
                /> */}


            </ScrollView>

        </LinearGradient>
    )
}
export default ClientsProfiles;