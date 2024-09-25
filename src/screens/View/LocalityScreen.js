import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponets from '../../Componets/HeaderComponets/HeaderComponets';
import { icons } from '../../Helper/icons';

import { String } from '../../Helper/string';
import AsyncStorage from '@react-native-community/async-storage';
import { NewsGetsliderdata, Newsimgedata, getadsNewdata } from '../../../APICall';
const LocalityScreen = ({ navigation, route }) => {

  const [images, setimages] = useState([])
  const [loading, setLoading] = useState(false);
  const { sub_catuserdata } = route.params;
  const { categoryData } = route.params;
  const adsUaseId = route.params;
  const [data, setdata] = useState('')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [data1, setData1] = useState([])


  const handleSearch = async (text) => {
    try {
      const filtered = subcategoryData.filter(item =>
        item.city.toLowerCase().includes(text.toLowerCase()) ||
        item.company_name.toLowerCase().includes(text.toLowerCase()) ||
        item.company_address.toLowerCase().includes(text.toLowerCase()) ||
        item.category_name.toLowerCase().includes(text.toLowerCase()) ||
        item.subcategory_name.toLowerCase().includes(text.toLowerCase()) ||
        item.state.toLowerCase().includes(text.toLowerCase()) ||
        item.company_description.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } catch (error) {
      console.error('Error filtering data:', error);
    }
  };
  useEffect(() => {
    const getCurrentDate = async () => {
      const userdata = await AsyncStorage.getItem('logindata');
      const finaluserdata = JSON.parse(userdata);
      Getsliderdata(finaluserdata.id)
      const interval = setInterval(() => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    };
    getCurrentDate();
    Addsdata();

  }, []);


  const Getsliderdata = async (id) => {
    setLoading(true);
    try {
      const data = {
        user_id: id,
        category: categoryData,
        subcategory: sub_catuserdata
      };
      const res = await Newsimgedata(global.url + 'getadsimages', data);
      setData1(res.data)
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const Addsdata = async () => {
    setLoading(true);
    try {
      const data = {
        category: categoryData,
        subcategory: sub_catuserdata
      };

      const res = await getadsNewdata(global.url + 'getads', data);
      if (res.data && res.data.length > 0) {
        setdata(res.data);
        setSubcategoryData(res.data)
        setFilteredData(res.data);
      } else {
        console.error('Error: No data received from the server');
      }
    } catch (error) {
      console.error('Error fetching subcategory data:', error);
    } finally {
      setLoading(false);
    }
  };

  {
    data1.map((item2, index2) => (
      <View key={index2}>
        {index2 > 0 && index2 % 1 !== 0 && (
          <Image
            source={{ uri: `https://www.app.webuildindia.in/admin/public/images/${item2.document}` }}
            style={[styles.imgarchwork]}
          />
        )}
      </View>
    ))
  }


  return (
    <LinearGradient
      colors={['#2c328b', '#50569f',
        '#858abb', '#9fa3c9', '#9fa3c9', '#fff', '#fff',
        '#fff', '#fff', '#fff', '#fff',]}
      style={styles.container}>
      <ScrollView>
        <HeaderComponets />
        <View style={styles.localityview}>
          <View style={styles.flexrow}>
            <TouchableOpacity style={styles.locatoch}>
              <Image source={icons.locality} style={styles.localityimg} />
            </TouchableOpacity>
            <TextInput
              placeholder="Search in your Locality"
              placeholderTextColor={'#808080'}
              onChangeText={handleSearch}

            />
          </View>
        </View>
        {filteredData && filteredData.length > 0 ? (
          <View style={styles.localityview2}>
            {filteredData.map((item, index) => (
              <View key={index}>
                <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', { adsUaseId: item })}>
                  <View style={styles.flexrow2}>
                    <Image
                      source={{ uri: `https://www.app.webuildindia.in/admin/public/${item.images ? item.images.split(',')[0] : null}` }}
                      style={styles.imglocality}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.ssnctext}>{item.category_name}</Text>
                      <Text style={styles.ssnctext}>{item.subcategory_name}</Text>
                      <Text numberOfLines={3} ellipsizeMode="tail" style={styles.ssnctext1}>
                        {item.company_name}, {item.company_address}, {item.city},{item.state}, {item.pincode}
                        {/* {item.company_description} */}
                      </Text>
                    </View>
                    <TouchableOpacity style={[styles.viewdetext, { color: 'yellow', }]} onPress={() => navigation.navigate('DetailsScreen', { adsUaseId: item })}>
                      <Text style={styles.textstysad}>{String.viewde}</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                <View style={styles.boderline}></View>
                {index > 0 && (index + 1) % 2 === 0 && data1.length > (index - 1) / 2 && (

                  <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: -130 }}>
                    <Image
                      source={{ uri: `https://www.app.webuildindia.in/admin/public/images/${data1[(index - 1) / 2].document}` }}
                      style={styles.imgarchwork}
                    />
                    <Image
                      source={{ uri: `https://www.app.webuildindia.in/admin/public/images/${item.document}` }}
                      style={[styles.imgarchwork]}
                    />
                  </View>

                )}
              </View>

            ))}
          </View>
        ) : (
          <Text style={styles.resultstext}>No results found</Text>
        )}

        {loading && <ActivityIndicator size="large" color="#fff" />}
        <View styles={styles.marginbottom} />
      </ScrollView>

    </LinearGradient>
  )
}
export default LocalityScreen;




