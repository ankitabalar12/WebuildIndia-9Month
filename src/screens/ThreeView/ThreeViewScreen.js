import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import { styles } from './styles';
import { String } from '../../Helper/string';
import { icons } from '../../Helper/icons';
import { callcount, msgcount, viewcount } from '../../../APICall';
import AsyncStorage from '@react-native-community/async-storage';
const ThreeViewScreen = ({ route, navigation }) => {
    const { cardNumber } = route.params;
    const [is_select, setSelect] = useState(null)
    const [isUpArrow, setIsUpArrow] = useState(true);
    const [not, setnot] = useState('');
    const [loading, setLoading] = useState(false);
    const [allviwedata, setAllviewData] = useState([])
    const [allmsgdata, setAllMsgData] = useState([])
    const [allcalldata, setAllCallData] = useState([])
    const selectcard = async (id) => {
        setSelect(id)
    }

    const toggleArrow = () => {
        setIsUpArrow(!isUpArrow);
    };


    useEffect(() => {
        const mycompanyaCurrentDate = async () => {
            try {
                const userdata = await AsyncStorage.getItem('logindata');
                const finaluserdata = JSON.parse(userdata);
                viewdata(finaluserdata.id);
                msgdata(finaluserdata.id);
                calldata(finaluserdata.id)
                setSelect(cardNumber);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const onFocus = () => {
            mycompanyaCurrentDate();
        };
        navigation.addListener('focus', onFocus);
        return () => {
            navigation.removeListener('focus', onFocus);
        };
    }, [not, viewdata, msgcount, setSelect, navigation]);



    const viewdata = async (id) => {
        setLoading(true)
        const data = {
            user_id: id,
        };
        try {
            const res = await viewcount(global.url + 'getadsviewcount', data);

            setAllMsgData(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }


    const msgdata = async (id) => {
        setLoading(true)
        const data = {
            user_id: id,
        };
        try {
            const res = await msgcount(global.url + 'getadsmessagecount', data);

            setAllviewData(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    const calldata = async (id) => {
        setLoading(true)
        const data = {
            user_id: id,
        };
        try {
            const res = await callcount(global.url + 'getadscallcount', data);
            console.log('res-----<><><><>', res);
            setAllCallData(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <LinearGradient
            colors={['#2c328b', '#353a90', '#3d4395', '#50569f',
                '#858abb', '#9fa3c9', '#adb0d0', '#b9bbd6',
                '#c2c4db', '#c1c4da', '#d6d8e5', '#dadbe7',]}
            style={styles.container}>
            <BackArrow />
            <ScrollView>
                <View style={styles.flexrow}>
                    <TouchableOpacity onPress={() => selectcard(1)}>
                        <View style={is_select === 1 ? styles.view2 : styles.view1}>
                            <Text style={styles.threetext}>{String.view}</Text>
                        </View>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => selectcard(2)}>
                        <View style={is_select === 2 ? styles.view2 : styles.view1}>
                            <Text style={styles.threetext}>{String.messagess}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectcard(3)}>
                        <View style={is_select === 3 ? styles.view2 : styles.view1}>
                            <Text style={styles.threetext}>{String.calls}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {is_select == '1' ? <View>
                    <View style={styles.viwebox1}>
                        <View style={styles.flwxrow2}>
                            <Text style={[styles.monthtext, styles.monthtext2,]}>{String.this}</Text>
                            <View style={styles.lastestview}>
                                <View style={styles.flex2}>
                                    <Text style={[styles.monthtext, styles.monthtext3]}>{String.lastes}</Text>
                                    <TouchableOpacity onPress={toggleArrow}>
                                        <Image
                                            source={isUpArrow ? icons.downarrow : icons.uparrow}
                                            style={styles.uparrowstyle}
                                        />

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.martop} />
                        {isUpArrow && (<View>
                            <ScrollView>

                                {allviwedata && allviwedata.length > 0 ? (
                                    <View>
                                        {allviwedata.map((item, index) => (
                                            <View key={index}>
                                                <View style={styles.flexrow3}>
                                                    <Text style={styles.textviewdate}>Date: {item.date}</Text>
                                                    <View style={styles.viewviewtext}>
                                                        <Text style={[styles.textviewdate, styles.textviewdate2]}>View: {item.count}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.borderview} />
                                            </View>
                                        ))}
                                    </View>
                                ) : (
                                    <Text style={styles.textfounfd}>No data found</Text>
                                )}



                            </ScrollView>
                        </View>)}

                    </View>
                </View> : null}
                {is_select == '2' ? <View>
                    <View style={styles.viwebox1}>
                        <View style={styles.flwxrow2}>
                            <Text style={[styles.monthtext, styles.monthtext2]}>{String.this}</Text>
                            <View style={styles.lastestview}>
                                <View style={styles.flex2}>
                                    <Text style={[styles.monthtext, styles.monthtext3]}>{String.lastes}</Text>
                                    <TouchableOpacity onPress={toggleArrow}>
                                        <Image
                                            source={isUpArrow ? icons.downarrow : icons.uparrow}
                                            style={styles.uparrowstyle}
                                        />

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.martop} />
                        {isUpArrow && (<View>
                            <ScrollView>
                                {allmsgdata && allmsgdata.length > 0 ? (
                                    <View>
                                        {allmsgdata.map((item2, index) => (
                                            <View key={index}>
                                                <View style={styles.flexrow3}>
                                                    <Text style={styles.textviewdate}>Date: {item2.date}</Text>
                                                    <View style={styles.viewviewtext}>
                                                        <Text style={[styles.textviewdate, styles.textviewdate2]}>View: {item2.count}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.borderview} />
                                            </View>
                                        ))}
                                    </View>
                                ) : (
                                    <Text style={styles.textfounfd}>No data found</Text>
                                )}


                            </ScrollView>
                        </View>)}

                    </View>
                </View> : null}

                {is_select == '3' ? <View>
                    <View style={styles.viwebox1}>
                        <View style={styles.flwxrow2}>
                            <Text style={[styles.monthtext, styles.monthtext2]}>{String.this}</Text>
                            <View style={styles.lastestview}>
                                <View style={styles.flex2}>
                                    <Text style={[styles.monthtext, styles.monthtext3]}>{String.lastes}</Text>
                                    <TouchableOpacity onPress={toggleArrow}>
                                        <Image
                                            source={isUpArrow ? icons.downarrow : icons.uparrow}
                                            style={styles.uparrowstyle}
                                        />

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.martop} />
                        {isUpArrow && (<View>
                            <ScrollView>
                                {allcalldata && allcalldata.length > 0 ? (
                                    <View>
                                        {allcalldata.map((item3, index) => (
                                            <View key={index}>
                                                <View style={styles.flexrow3}>
                                                    <Text style={styles.textviewdate}>Date: {item3.date}</Text>
                                                    <View style={styles.viewviewtext}>
                                                        <Text style={[styles.textviewdate, styles.textviewdate2]}>View: {item3.count}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.borderview} />
                                            </View>
                                        ))}
                                    </View>
                                ) : (
                                    <Text style={styles.textfounfd}>No data found</Text>
                                )}





                                {/* <View style={styles.flexrow3}>
                                <Text style={styles.textviewdate}>Date: 09/11/2023</Text>
                                <View style={styles.viewviewtext}>
                                <Text style={[styles.textviewdate, styles.textviewdate2]}>View: 150</Text>
                                </View>
                            </View>
                            <View style={styles.borderview} />
                            <View style={styles.flexrow3}>
                                <Text style={styles.textviewdate}>Date: 08/11/2023</Text>
                                <View style={styles.viewviewtext}>
                                <Text style={[styles.textviewdate, styles.textviewdate2]}>View: 160</Text>
                                </View>
                            </View>
                            <View style={styles.borderview} />
                            <View style={styles.flexrow3}>
                                <Text style={styles.textviewdate}>Date: 07/11/2023</Text>
                                <View style={styles.viewviewtext}>
                                <Text style={[styles.textviewdate, styles.textviewdate2]}>View: 140</Text>
                                </View>
                            </View>
                            <View style={styles.borderview} />
                            <View style={styles.flexrow3}>
                                <Text style={styles.textviewdate}>Date: 06/11/2023</Text>
                                <View style={styles.viewviewtext}>
                                <Text style={[styles.textviewdate, styles.textviewdate2]}>View: 160</Text>
                                </View>
                            </View>
                            <View style={styles.borderview} />
                            <View style={styles.flexrow3}>
                                <Text style={styles.textviewdate}>Date: 05/11/2023</Text>
                                <View style={styles.viewviewtext}>
                                <Text style={[styles.textviewdate, styles.textviewdate2]}>View: 120</Text>
                                </View>
                            </View>
                            <View style={styles.borderview} />
                            <View style={styles.flexrow3}>
                                <Text style={styles.textviewdate}>Date: 04/11/2023</Text>
                                <View style={styles.viewviewtext}>
                                <Text style={[styles.textviewdate, styles.textviewdate2]}>View: 180</Text>
                                </View>
                            </View>
                            <View style={styles.borderview} />
                            <View style={styles.flexrow3}>
                                <Text style={styles.textviewdate}>Date: 03/11/2023</Text>
                                <View style={styles.viewviewtext}>
                                <Text style={[styles.textviewdate, styles.textviewdate2]}>View: 190</Text>
                                </View>
                            </View>
                            <View style={styles.borderview} />
                            <View style={styles.flexrow3}>
                                <Text style={styles.textviewdate}>Date: 02/11/2023</Text>
                                <View style={styles.viewviewtext}>
                                <Text style={[styles.textviewdate, styles.textviewdate2]}>View: 90</Text>
                                </View>
                            </View> */}
                                {/* <View style={styles.borderview} />
                            <View style={styles.flexrow3}>
                                <Text style={styles.textviewdate}>Date: 02/11/2023</Text>
                                <Text style={[styles.textviewdate, styles.textviewdate2]}>View: 90</Text>
                            </View>
                            <View style={styles.borderview} /> */}
                            </ScrollView>
                        </View>)}

                    </View>
                </View> : null}
            </ScrollView>
        </LinearGradient>
    )
}
export default ThreeViewScreen;
