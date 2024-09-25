import React, { useEffect, useState } from 'react';
import { View, Text, Image, Modal, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import HeaderComponets from '../../Componets/HeaderComponets/HeaderComponets';
import { icons } from '../../Helper/icons';

import { String } from '../../Helper/string';
import { callata, msgdata, viewdata } from '../../../APICall';
import AsyncStorage from '@react-native-community/async-storage';

const DetailsScreen = ({ navigation, route }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [id, setID] = useState('')
    const [images, setimages] = useState([])
    const [phone_number, setPhone_number] = useState('')
    const adsUaseId = route?.params?.adsUaseId;
    console.log('adsUaseId---', adsUaseId)

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            const userdata = await AsyncStorage.getItem('logindata');
            const finaluserdata = JSON.parse(userdata);
            setID(finaluserdata.id)
            viewalldata(finaluserdata.id);
            console.log('id--->', finaluserdata.id)

        };
        fetchData();
        // viewalldata();

    }, []);


    const viewalldata = async (id) => {
        setLoading(true);
        try {
            const data = {
                user_id: id,
                ads_id: adsUaseId.id
            };
            console.log('Data---1:', adsUaseId.images.split(','));
            setimages(adsUaseId.images.split(','));

            const res = await viewdata(global.url + 'viewads', data);
            console.log('global.url--:', global.url);
            console.log('Response-----1:', res);
            console.log('Response-----1:', res);
            console.log('data-->><><', res.data)
            if (res && res.success === true) {
                console.log('adddata successful:', res);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const callalldata = async () => {
        setLoading(true);
        try {
            const data = {
                user_id: id,
                ads_id: adsUaseId.id
            };
            console.log('Data:', adsUaseId.phone_number);

            const res = await callata(global.url + 'callsads', data);
            console.log('res:', res);
            console.log('res:', res.data);

            const phone_number = adsUaseId.phone_number;
            console.log('Phone Number:', phone_number);
            console.log('Phone Number:', res.data.phone_number);

            const phoneUrl = `tel:${phone_number}`;
            Linking.openURL(phoneUrl)
                .then(() => {
                    console.log('Phone call initiated');
                })
                .catch(error => {
                    console.error('Error initiating phone call:', error);
                });

            if (res && res.success === true) {
                console.log('Data fetched successfully:', res);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async () => {
        try {
            setLoading(true);
            const data = {
                user_id: id,
                ads_id: adsUaseId.id
            };
            console.log(' data------3 : ', adsUaseId.message);
            const res = await msgdata(global.url + 'messageads', data);
            console.log('Response---------3 : ', res);
            const message = adsUaseId.message;
            const phone_number = adsUaseId.phone_number;
            console.log('phone_number---', adsUaseId.phone_number)
            const messageUrl = `sms:${phone_number}?body=${encodeURIComponent(message)}`;
            Linking.openURL(messageUrl)
                .then(() => {
                    console.log('Messaging app opened');
                })
                .catch(error => {
                    console.error('Error opening messaging app:', error);
                });

            if (res && res.success === true) {
                console.log('Data fetched successfully:', res);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <LinearGradient
            colors={['#2c328b', '#50569f',
                '#858abb', '#9fa3c9', '#9fa3c9', '#fff', '#fff',
                '#fff', '#fff', '#fff', '#fff',]}
            style={styles.container}>
            <View>
                <HeaderComponets />
            </View>
            <View style={styles.martop}></View>
            <ScrollView>
                {/* <Text style={{textAlign:'center'}}>Image:  {images[0]}</Text> */}
                <View style={styles.coulmview}>
                    <View style={styles.flexrow}>
                        <View style={styles.mainimgmodal}>
                            <TouchableOpacity onPress={() => handleImageClick({ uri: `https://www.app.webuildindia.in/admin/public/${images[0]}` })}>
                                <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/${images[0]}` }} style={styles.captenimg} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.flexcolem}>
                            <View style={styles.mainimgmodal2}>
                                <TouchableOpacity onPress={() => handleImageClick({ uri: `https://www.app.webuildindia.in/admin/public/${images[1]}` })}>
                                    <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/${images[1]}` }} style={styles.engessimg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mainimgmodal2}>
                                <TouchableOpacity onPress={() => handleImageClick({ uri: `https://www.app.webuildindia.in/admin/public/${images[2]}` })}>
                                    <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/${images[2]}` }} style={styles.gunimg} />
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        <View style={styles.flexcolem}>
                            <View style={styles.mainimgmodal3}>
                                <TouchableOpacity onPress={() => handleImageClick({ uri: `https://www.app.webuildindia.in/admin/public/${images[3]}` })}>
                                    <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/${images[3]}` }} style={styles.engessimg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mainimgmodal2}>
                                <TouchableOpacity onPress={() => handleImageClick({ uri: `https://www.app.webuildindia.in/admin/public/${images[4]}` })}>
                                    <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/${images[4]}` }} style={styles.gunimg} />
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("DashboardScreen");
                }}>
                    <Text style={styles.ttext}>{adsUaseId.company_name}</Text>
                </TouchableOpacity>
                <Text style={styles.neartext}>
                {adsUaseId.company_name},{' '}
                    {adsUaseId.company_address},{' '}
                    {adsUaseId.city},{''}
                    {adsUaseId.pincode},{' '}
                    {adsUaseId.state},{' '}
                    {/* {adsUaseId.pincode} */}
                </Text>
                <Text style={styles.companytext}>{String.company}</Text>
                <Text style={styles.companytext2}>{adsUaseId.company_description}</Text>
                <Text style={styles.companytext}>{String.contactdeta}</Text>
                <View style={styles.flexrow3}>
                    <View style={styles.girlsimgimg}>
                        <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/${adsUaseId.profile_image}` }} style={styles.girlsimgimg2} />
                    </View>
                    <View>
                        <Text style={[styles.mrnametext, styles.mrnametext2]}>{adsUaseId.contact_person_name}</Text>
                        <Text style={styles.simplytext2}>{adsUaseId.email}</Text>
                        <Text style={styles.mrnametext}>{String.contacts}</Text>
                        <View style={styles.flexrow5}>
                            <Text style={[styles.simplytext2, styles.simplytext4]}>{adsUaseId.phone_number}</Text>
                            <TouchableOpacity onPress={() => {
                                sendMessage();
                                // selectcard(3);
                            }}>
                                <View style={styles.iconview}>
                                    <Image source={icons.msg} style={styles.msgimg} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    callalldata();
                                    // selectcard(3);
                                }}>
                                <View style={styles.iconview}>
                                    <Image source={icons.Call} style={styles.callimg} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.mrnametext}>{String.location}</Text>
                        <Text style={styles.azxtext2}>
                        {adsUaseId.company_name}, {' '}
                            {adsUaseId.company_address}, {' '}
                            {adsUaseId.city}, {''}
                            {adsUaseId.pincode}, {' '}
                            {adsUaseId.state}, {' '}
                            {/* {adsUaseId.pincode} */}
                        </Text>
                    </View>
                </View>
                <Modal
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    transparent={true}>
                    <View style={styles.modalContainer}>
                        <Image
                            source={selectedImage}
                            style={styles.largeImage} />
                        <View style={styles.closetextview}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.closetextstyle}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.bottommargin}></View>
            </ScrollView>
            {loading && <ActivityIndicator size="large" color="#fff" />}
        </LinearGradient>
    )
}
export default DetailsScreen;

