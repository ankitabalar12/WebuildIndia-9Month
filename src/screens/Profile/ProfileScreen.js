import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import { String } from '../../Helper/string';
import { icons } from '../../Helper/icons';

import CustomTextInput from '../../Componets/TextinputComponets/CustomTextInput';
import PinkButton from '../../Componets/PinkButtonComponet/PinkButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { updateUserProfiledata, uploadimagedata } from '../../../APICall';
import AsyncStorage from '@react-native-community/async-storage';
const ProfileScreen = ({ navigation, route }) => {
  const [id, setID] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState()
  const [mobile, setMobail] = useState()
  const [password, setPassword] = useState()
  const [confirm, setConfiem] = useState()
  const [name, setName] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [userid, setUserid] = useState(null);
  const [imageUri, setImageUri] = useState();
  const [imageUpdated, setImageUpdated] = useState()
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    updateProfileData();
  }, []);


  const selectimage = () => {
    Alert.alert('Alert', 'Choose an option', [
      {
        text: 'Back',
        onPress: () => { },
      },
      {
        text: 'Camera',
        onPress: () => openCamera(),
      },
      {
        text: 'Library',
        onPress: () => openLibrary(),
      },
    ]);
  };


  // openLibrary

  const openLibrary = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: true,
      base64: true,
      maxHeight: 200,
      maxWidth: 200,
    };
    launchImageLibrary(options, async (res) => {
      console.log('res', res);
      if (res) {
        // console.log(';;;;;', resp.assets[0].base64);
        const includeBase64 = res.assets[0].base64;
        const data = {
          base64: 'data:image/jpeg;base64,' + includeBase64,
        };
        const userpic = await uploadimagedata(global.url + 'uploadimage', data);
        console.log('userpic------', userpic)
        if (userpic.data) {
          console.log('-->>>>>>>>>>>', userpic.data)
          setImageUri(`https://www.app.webuildindia.in/admin/public/` + userpic.data);
          setSelectedImage(userpic.data);
          console.log('------------', userpic.data)
          await AsyncStorage.setItem('profile_image', `https://www.app.webuildindia.in/admin/public/` + userpic.data);
        }

      }
    });
  };

const openCamera = async () => {
    let options = {
        mediaType: 'photo',
        includeBase64: true,
    }
    launchCamera(options, async (resp) => {
        const includeBase64 = resp.assets[0].base64;
        const data = {
            base64: 'data:image/jpeg;base64,' + includeBase64,
        }
        const userpic = await uploadimagedata(global.url + 'uploadimage', data)
        if (userpic.data) {
            console.log('userpic----------', userpic.data)
            setImageUri(`https://www.app.webuildindia.in/admin/public/` + userpic.data);
            setImageUpdated(userpic.data)
            await AsyncStorage.setItem('profile_image', `https://www.app.webuildindia.in/admin/public/` + userpic.data);
        }
    });
}



const updateData = async () => {
  try {
      setLoading(true);
      const userData = await getUserData();
      console.log('userData----', userData);

      const storedProfileImage = await AsyncStorage.getItem('profile_image');
      console.log('storedProfileImage----------------', storedProfileImage);

      let imageUri = null;
      if (storedProfileImage) {
          imageUri = storedProfileImage;
      } else {
          console.log('No profile image found.');
      }
      const data = {
        user_id: id,
        name: name,
        mobile: mobile,
        profile_image: imageUri,
      };
      console.log('data-->>>-->', imageUri);

      const res = await updateUserProfiledata(global.url + 'updateuserprofile', data);
      console.log('global.url-->', global.url);
      console.log('res-------<>--', res);

      const result = await AsyncStorage.getItem('logindata');
      console.log('result----->', result);
      const finalUserData = JSON.parse(result);
      console.log('finalUserData---1--->', finalUserData);

      const newUpdatedUserInfo = {
          ...finalUserData,
          "name": name,
          "mobile": mobile,
          "profile_image": imageUri,
      };
      console.log('New---->',finalUserData.profile_imag)
      console.log('newUpdatedUserInfo------', imageUri)
    
      AsyncStorage.setItem('logindata', JSON.stringify(newUpdatedUserInfo));
      console.log('newUpdatedUserInfo------>', finalUserData.name);
      console.log('newUpdatedUserInfo------>', finalUserData.mobile);
      console.log('newUpdatedUserInfo------>', finalUserData);
      const updateget = await AsyncStorage.getItem('logindata');
      console.log('updateget---<><>>',updateget)
      Alert.alert('Success', 'User data updated successfully', [
          {
              text: 'OK',
              onPress: () => {

              },
          },
      ]);
  } catch (error) {
      console.error('Error updating user data:', error);
      Alert.alert('Success', 'User data updated successfully');
      setLoading(false);
  }
};


const updateProfileData = async () => {
  try {
      setLoading(true);
      const userData = await getUserData();
      console.log('userData----', userData);

      const storedProfileImage = await AsyncStorage.getItem('profile_image');
      console.log('storedProfileImage----------------', storedProfileImage);

      let imageUri = null;
      if (storedProfileImage) {
          imageUri = storedProfileImage;
      } else {
          console.log('No profile image found.');
      }
      const data = {
        user_id: userData.id,
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
        profile_image: imageUri,
      };

      if (imageUri !== null) {
          const res = await updateUserProfiledata(global.url + 'updateuserprofile', data);
          console.log('res------>>', res);
      }
      setUserid(userData.id);
      setMobail(userData.mobile);
      setName(userData.name);
      setEmail(userData.email);
      setImageUri(userData.profile_image);
      console.log('name-----', userData.name);
      console.log('email-----',userData.email);


  }
  catch (error) {
      console.error('Error updating user data:', error);
      setLoading(false);
  }
};
const getUserData = async () => {
  try {
      const storedUserData = await AsyncStorage.getItem('logindata');
      const userData = JSON.parse(storedUserData);
      return userData;
  } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
  }
};

const handleLogout = () => {
  Alert.alert(
    'Logout',
    'Are you sure you want to log out?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
          text: 'Logout',
          onPress: async () => {
              await AsyncStorage.removeItem('logindata');
          navigation.navigate('LoginScreen');
        },
      },
    ],
    { cancelable: false }
  );
};

  return (
    <LinearGradient
      colors={['#2c328b', '#353a90', '#3d4395', '#50569f',
        '#858abb', '#9fa3c9', '#adb0d0', '#b9bbd6',
        '#c2c4db', '#c1c4da', '#d6d8e5', '#dadbe7',]}
      style={styles.container}>
      <ScrollView>
        <View style={styles.flexrow}>

          <BackArrow />
          <Text style={styles.youprofiltext}>{String.yourpro}</Text>
        </View>
        <View style={styles.profilview}>


          {imageUri ?
            <Image source={{ uri: imageUri }} style={styles.manimg} />
            :
            <Image source={{ uri: imageUri }} style={styles.manimg} />
          }
          <View style={styles.msgdot}>
            <TouchableOpacity onPress={selectimage}>
              <Image source={icons.profile} style={styles.proimg}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.margintop} />



        <CustomTextInput
          Profileviewstyle={styles.Profileviewstyle}
          placeholder="Mobail"
          placeholderTextColor={'#8391A1'}
          onChangeText={(value) => setMobail(value)} value={mobile}
        />
        <CustomTextInput
          Profileviewstyle={styles.Profileviewstyle}
          placeholder="Email"
          placeholderTextColor={'#8391A1'}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <CustomTextInput
          Profileviewstyle={styles.Profileviewstyle}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          placeholderTextColor={'#808080'}
          onChangeText={(value) => setPassword(value)}
        />
        <CustomTextInput
          Profileviewstyle={styles.Profileviewstyle}
          placeholder="Confirm Password"
          value={confirm}
          secureTextEntry={true}
          placeholderTextColor={'#808080'}
          onChangeText={(value) => setConfiem(value)}
        />



        <PinkButton
          title={String.save}
          profilebutton={styles.profilebutton}
          //  BusinessScreen
         onPress={updateData}
        />
        <TouchableOpacity onPress={() => handleLogout()}>
          <View style={styles.rowviewtextaccout}>
            {/* <Text style={styles.textloginteo}>{String.already}</Text> */}
            <Text style={[styles.textloginteo, styles.textloginteo0o]}>{String.logoutaccout}</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  )
}
export default ProfileScreen;


// {imageUri ?

//   <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/images/${imageUri}` }} style={styles.manimg} />
//   :
//   <Image source={{ uri: `https://www.app.webuildindia.in/admin/public/images/${imageUri}` }} style={styles.manimg} />
// }