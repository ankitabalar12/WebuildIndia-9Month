import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, ScrollView, BackHandler, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { icons } from '../../Helper/icons';
import LinearGradient from 'react-native-linear-gradient';
import { String } from '../../Helper/string';
import HeaderComponets from '../../Componets/HeaderComponets/HeaderComponets';
import SearchComponest from '../../Componets/SearchComponets/SearchComponest';
import { useIsFocused } from '@react-navigation/native';
import { NewsCategorydata, NewsGetsliderdata, TrendingNews, getuserprofiledata } from '../../../APICall';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
const HomeScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [name, setName] = useState(false);
    const [id, setID] = useState('');
    const [profileImage, setProfileImage] = useState();
    const [is_Agency, setIs_Agency] = useState();
    const [is_addAgency, setAddAgency] = useState()
    const [date, setDate] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const userdata = await AsyncStorage.getItem('logindata');
            const finaluserdata = JSON.parse(userdata);
            setName(finaluserdata.name);
            setID(finaluserdata.id);
            setIs_Agency(finaluserdata.is_agency);
            setProfileImage(finaluserdata.profile_image);
            setDate(finaluserdata.created_at);
            // console.log('created_at--->', finaluserdata.created_at);
            // console.log('is_agency--->', finaluserdata.is_agency);
            getuser(finaluserdata.id);
        };

        const handleBackButton = () => {
            if (isFocused) {
                BackHandler.exitApp();
                return true;
            }
            return false;
        };

        fetchData();
        Getcategorydata();
        TrendingNewsdata();
        Getsliderdata();
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }, [isFocused]);


    // useEffect(() => {


    // }, []);
    const navigateToProfile = () => {
        navigation.navigate('ProfileScreen');
    };
    const TrendingNewsdata = async () => {
        const res = await TrendingNews(global.url + 'getnews', data);
       
        setData(res.data)
    }
    const Getsliderdata = async () => {
        const res = await NewsGetsliderdata(global.url + 'getslider', data);
        
        setData1(res.data)
    }
    const Getcategorydata = async () => {
        const res = await NewsCategorydata(global.url + 'getcategory', data);
        setData2(res.data)
      

    }
    const getuser = async (id) => {
        setLoading(true);
        try {
            const data = {
                user_id: id,
            };
            const res = await getuserprofiledata(global.url + 'getuserprofile', data);
            setAddAgency(res.data[0].is_agency)
            global.usertype = res.data[0].is_agency;


        } catch (error) {
          
        } finally {
            setLoading(false);
        }
    };



    

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ListScreen', { categoryData: item.id })} style={styles.catbox}>
            <View style={styles.rowviewstyle}>
                <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/images/${item.icon}` }} style={styles.egnimg}></Image>
                <Text style={styles.imgtext}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );




    return (
        <LinearGradient
            colors={['#2c328b', '#353a90', '#3d4395', '#50569f',
                '#858abb', '#9fa3c9', '#fff', '#fff',
                '#fff', '#fff', '#fff', '#fff',]}
            style={styles.containerre}>
            <ScrollView>
                {/* <HeaderComponets
                // onpressmodal={toggleModal}
                /> */}
                <View style={styles.container}>
                    <View style={styles.prov}>
                        <TouchableOpacity onPress={() => { navigation.navigate('HomeScreen') }}>
                            <Image source={icons.menus} style={styles.img}></Image>
                        </TouchableOpacity>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={styles.textstyle}>Hello {name}</Text>
                            <Text style={styles.textstyle1}>{moment(date).format('DD/MM/YYYY hh:mm A')}</Text>
                        </View>
                        <TouchableOpacity onPress={navigateToProfile} style={styles.profil}>
                            <View>
                                {profileImage ?
                                    <Image source={{ uri: profileImage }} style={styles.manimg} />
                                    :
                                    <Image source={{ uri: profileImage }} style={styles.manimg} />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                    {data1.map((item2, index) => (
                        <View key={index} style={styles.imageContainer}>
                            <Image
                                source={{
                                    uri: `https://www.app.webuildindia.in/admin/public/images/${item2.document}`
                                }}
                                style={styles.imageStyle}
                            />
                        </View>
                    ))}
                </ScrollView>
                <SearchComponest />

                <View style={styles.rowflexds}>
                    {is_addAgency !== 1 ? (
                        <TouchableOpacity onPress={() => navigation.navigate('DashboardScreen')}>
                            <View style={styles.imgesview2}>
                                <Text style={styles.buttontext}>{String.ConstructionBusiness}</Text>
                            </View>
                        </TouchableOpacity>
                    ) : null}
                    {is_addAgency === 1 ? (
                        <TouchableOpacity onPress={() => navigation.navigate('ClientsProfiles')}>
                            <View style={styles.imgesview}>
                                <Text style={styles.buttontext}>{String.agree}</Text>
                            </View>
                        </TouchableOpacity>
                    ) : null}
                </View>



                <View>
                    {data2 ?
                        <FlatList
                            data={data2}
                            // keyExtractor={(item) => item.id}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            numColumns={2}
                        /> : null}
                </View>
                <View>


                    {/* <View style={styles.rowflexds}>
                <View style={styles.angency}>

                <View style={styles.flexrow}>
                        <TouchableOpacity onPress={() => navigation.navigate('DashboardScreen')}>
                            <View style={styles.imgesview}>
                                <Text style={styles.buttontext}>{String.buss}</Text>
                            </View>
                        </TouchableOpacity >
                    </View>

                 </View> 
                 <View style={styles.angency}>
                 <Text>dfugfgudfgui</Text>
                 </View>     
                </View>

 */}


                    <Image source={icons.trading} style={styles.tgimg} ></Image>
                </View>
                <Text style={styles.trxttranding}>{String.treading}</Text>
                <View style={styles.viewstylein}>
                    {data ? (
                        <View>
                            {data.map((item, index) => (<View>
                                <View style={styles.flexviewstyle}>
                                    <Image source={{
                                        uri: `https://www.app.webuildindia.in/admin/public/images/${item.image}`
                                    }} style={styles.loremimg}></Image>
                                    <View>
                                        <Text style={styles.imgtextlor}>{item.description}</Text>

                                        <Text style={styles.imgtextuplod}>{moment(item.created_date).format('DD/MM/YYYY hh:mm A')}</Text>
                                    </View>
                                </View>
                                <View style={styles.borderview}></View>
                            </View>))}
                        </View>) : null}
                </View>
                <View style={styles.margimbottom}></View>
            </ScrollView>
        </LinearGradient>
    );
}
export default HomeScreen;