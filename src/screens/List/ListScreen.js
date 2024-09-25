import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import HeaderComponets from '../../Componets/HeaderComponets/HeaderComponets';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import SearchComponest from '../../Componets/SearchComponets/SearchComponest';
import { icons } from '../../Helper/icons';
import { SubCatNews } from '../../../APICall';
const ListScreen = ({ navigation, route }) => {
    const categoryData = route.params?.categoryData;
    console.log('categoryData----->>', categoryData)
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [subcategoryData, setSubcategoryData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {

        }
        SubCatNewsdata();
        fetchData();
    }, [])
    const handleSearch = async (text) => {
        try {
            const filtered = subcategoryData.filter(item =>
                item.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(filtered);
        } catch (error) {
            console.error('Error filtering data:', error);
        }
    };
    const SubCatNewsdata = async () => {
        setLoading(true)
        try {
            const data = {
                category: categoryData
            };
            console.log('data--1>', data, categoryData);
            const res = await SubCatNews(global.url + 'getsubcategory', data);
            console.log('global.url-----', global.url);
            console.log('res--<>--<>-', res);
            console.log('data----<><><>', res.data);
            setSubcategoryData(res.data);
            setFilteredData(res.data);
        } catch (error) {
            console.error('Error fetching subcategory data:', error);
        }
        setLoading(false)
    };

    return (
        <LinearGradient
            colors={['#2c328b', '#50569f',
                '#858abb', '#9fa3c9', '#9fa3c9', '#fff', '#fff',
                '#fff', '#fff', '#fff', '#fff',]}
            style={styles.container}>
            <HeaderComponets />
            <ScrollView>
                <SearchComponest onPress={handleSearch} />
                <View style={styles.margineview}></View>
                {filteredData && filteredData.length > 0 ? (
                    filteredData.map((newsItem, index) => (
                        <View key={index}>
                            <TouchableOpacity onPress={() => { navigation.navigate('LocalityScreen', { sub_catuserdata: newsItem.id, categoryData }) }}>
                                <View style={styles.boxview}>
                                    <View style={styles.flexrow}>
                                        <View style={styles.cricleview}>
                                            <Text style={styles.trxtstyle}>{newsItem.name.charAt(0).toUpperCase()}</Text>
                                        </View>
                                        <Text style={styles.trxtstyle2}>{newsItem.name}</Text>
                                        <Image source={icons.buildarrow} style={styles.buildarrow} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.resultstext}>No data subcategories available</Text>
                )}
                {loading && <ActivityIndicator size="large" color="#fff" />}

                {/* <TouchableOpacity>

                    <View style={styles.boxview}>
                        <View style={styles.flexrow}>
                            <View style={styles.cricleview}>
                                <Text style={styles.trxtstyle}>{String.sd}</Text>
                            </View>
                            <Text style={styles.trxtstyle2}>{String.Structurai}</Text>
                            <Image source={icons.buildarrow} style={styles.buildarrow}></Image>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.boxview}>
                        <View style={styles.flexrow}>
                            <View style={styles.cricleview}>
                                <Text style={styles.trxtstyle}>{String.si}</Text>
                            </View>
                            <Text style={styles.trxtstyle2}>{String.soil}</Text>
                            <Image source={icons.buildarrow} style={styles.buildarrow}></Image>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.boxview}>
                        <View style={styles.flexrow}>
                            <View style={styles.cricleview}>
                                <Text style={styles.trxtstyle}>{String.ls}</Text>
                            </View>
                            <Text style={styles.trxtstyle2}>{String.Land}</Text>
                            <Image source={icons.buildarrow} style={styles.buildarrow}></Image>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.boxview}>
                        <View style={styles.flexrow}>
                            <View style={styles.cricleview}>
                                <Text style={styles.trxtstyle}>{String.a}</Text>
                            </View>
                            <Text style={styles.trxtstyle2}>{String.Architects}</Text>
                            <Image source={icons.buildarrow} style={styles.buildarrow}></Image>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.boxview}>
                        <View style={styles.flexrow}>
                            <View style={styles.cricleview}>
                                <Text style={styles.trxtstyle}>{String.a}</Text>
                            </View>
                            <Text style={styles.trxtstyle2}>{String.Structurai}</Text>
                            <Image source={icons.buildarrow} style={styles.buildarrow}></Image>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.boxview}>
                        <View style={styles.flexrow}>
                            <View style={styles.cricleview}>
                                <Text style={styles.trxtstyle}>{String.a}</Text>
                            </View>
                            <Text style={styles.trxtstyle2}>{String.soil}</Text>
                            <Image source={icons.buildarrow} style={styles.buildarrow}></Image>
                        </View>
                    </View>
                </TouchableOpacity> */}
            </ScrollView>
        </LinearGradient>
    )
}
export default ListScreen;