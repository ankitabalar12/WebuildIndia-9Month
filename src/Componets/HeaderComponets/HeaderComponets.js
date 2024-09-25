import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import { icons } from '../../Helper/icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { updateUserProfiledata } from '../../../APICall';
import moment from 'moment';

const HeaderComponets = ({ onpressmodal }) => {
  const navigation = useNavigation();
  const currentDate = new Date();
  const [name, setName] = useState(false);
  const [id, setID] = useState('');
  const [profileImage, setProfileImage] = useState();
  const [mobile, setMobile] = useState();
  const [date, setDate] = useState();
  const convertCurrentDate = () => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNumber = currentDate.getMonth() + 1;
    const monthName = monthNames[monthNumber - 1];
    return `${days[currentDate.getDay()]}, ${currentDate.getDate()} ${monthName} ${currentDate.getFullYear()}`
  }
  const formattedDate = convertCurrentDate();
  useEffect(() => {
    const getCurrentDate = async () => {
      const userdata = await AsyncStorage.getItem('logindata');
      const finaluserdata = JSON.parse(userdata);
      setName(finaluserdata.name)
      setID(finaluserdata.id)
      setProfileImage(finaluserdata.profile_image)
      setDate(finaluserdata.created_at)
      console.log('created_at--->', finaluserdata.created_at)
    };
    getCurrentDate();
  }, []);
  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen');
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
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
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: '5%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 30,
    height: 30,
    marginRight: 10,
    tintColor: '#fff',
  },
  textstyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#fff',
  },
  manimg: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignSelf: 'center',

  },
  textstyle1: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
  },
   profil: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});

export default HeaderComponets;
