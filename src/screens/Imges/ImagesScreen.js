import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Alert, ActivityIndicator,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import { String } from '../../Helper/string';
import { styles } from './styles';
import { icons } from '../../Helper/icons';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import PinkButton from '../../Componets/PinkButtonComponet/PinkButton';
import Swiper from 'react-native-swiper';

import AsyncStorage from '@react-native-community/async-storage';
import { addadsdata, purchaseplandata, selectedUploadimg } from '../../../APICall';



const ImagesScreen = ({ navigation, route }) => {
  const [selectedImages, setselectedImages] = useState([]);
  const [id, setID] = useState('')
  const [loading, setLoading] = useState(false);
  const [addads, setaddads] = useState();

  console.log('selectedImages---', selectedImages)
  const {
    company_name,
    company_description,
    company_address,
    category,
    sub_category,
    phone_number,
    email, pincode,
    city,
    state,
    profile_image,
    alternativeNumber,
    company_id,
    contact_person_name,
    plan_name,
  
  } = route?.params;

  console.log('storedata-- :', company_name,
    company_description, company_address, profile_image,
    category, sub_category, phone_number, email, pincode, city, state,
    company_id,
    plan_name,
    contact_person_name,
    alternativeNumber,
   )
  // const adsData = route?.params
  // console.log('adsData---', adsData)
  useEffect(() => {
    const fetchData = async () => {
      const userdata = await AsyncStorage.getItem('logindata');
      const finaluserdata = JSON.parse(userdata);
      setID(finaluserdata.id)
      // setCompany_id(finaluserdata.id); 

    };
    fetchData();
  }, []);
  const selectImage = () => {
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

  const openLibrary = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      base64: true,
      // maxHeight: 400,
      // maxWidth: 400,
      selectionLimit: 5 - selectedImages.length,
    };

    try {
      const res = await launchImageLibrary(options);
      if (!res.didCancel && res.assets) {
        // Initialize an array to store the selected images
        let images = [];
        for (let i = 0; i < res.assets.length; i++) {
          const asset = res.assets[i];
          if (asset.fileSize > 3 * 1024 * 1024) {
            Alert.alert('Error', 'Image size should be within 3MB.');
            continue; // Skip to the next iteration
          }
          const data = {
            base64: 'data:image/jpeg;base64,' + asset.base64,
          };
          const userpic = await selectedUploadimg(global.url + 'uploadimage', data);
          if (userpic.data) {
            images.push(userpic.data);
          }
        }
        console.log('selectedImages---', images);
        // Update selectedImages state with the new images
        setselectedImages(prevImages => [...prevImages, ...images]);
      }
    } catch (error) {
      console.error('Error selecting images from library:', error);
      Alert.alert('Error', 'An unexpected error occurred while selecting images.');
    }
  };

  const openCamera = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      base64: true,
      // maxHeight: 500,
      // maxWidth: 500,
      // resizeMode: 'contain',
      selectionLimit: 5 - selectedImages.length,
    };

    try {
      const res = await launchCamera(options);
      if (!res.didCancel && res.assets) {
        let images = [];
        for (let i = 0; i < res.assets.length; i++) {
          const asset = res.assets[i];
          if (asset.fileSize > 3 * 1024 * 1024) {
            Alert.alert('Error', 'Image size should be within 3MB.');
            continue; // Skip to the next iteration
          }
          const data = {
            base64: 'data:image/jpeg;base64,' + asset.base64,
          };
          const userpic = await selectedUploadimg(global.url + 'uploadimage', data);
          if (userpic.data) {
            images.push(userpic.data);
          }
        }
        console.log('selectedImages---', images);
        setselectedImages(prevImages => [...prevImages, ...images]);
      }
    } catch (error) {
      console.error('Error capturing image from camera:', error);
      Alert.alert('Error', 'An unexpected error occurred while capturing image from camera.');
    }
  };
  const Allpurchaseplan = async () => {
    setLoading(true);
    const data = {
      user_id: id,
      plan_name: plan_name,
      company_id: company_id,
    };
    // console.log('data >>', data.plan_name);
    const res = await purchaseplandata(global.url + 'purchaseplan', data);
    // setData2(res.data)

    // console.log('global.url :', global.url);
    // console.log('res >>: ', res.data);
    setLoading(false);
    // console.log('<<res.data>>', res.data);
  };


 
  const imgUpoldeandalldata = async () => {
    setLoading(true);
    await Allpurchaseplan(id, plan_name, company_id);
    try {
      const data = {
        company_name: company_name,
        company_description: company_description,
        company_address: company_address,
        sub_category: sub_category,
        category: category,
        user_id: id,
        phone_number: phone_number,
        pincode: pincode,
        city: city,
        state: state,
        profile_image: profile_image,
        images: selectedImages.toString(),
        email: email,
        company_id: company_id,
        contact_person_name: contact_person_name,
        plan_name: plan_name,
        alternative_phone_number:alternativeNumber
      };
      // console.log('data ->><<-', data)
      const res = await addadsdata(global.url + 'addads', data);
      // console.log('res : ', res);
      // console.log('data.res : ', res.data);

      if (res && res.success === true) {

       

        // Alert.alert('Success', 'Data uploaded successfully.', [
        //   {
        //     text: 'OK',
        //     onPress: () => {
        //       navigation.navigate('HomeScreen', { alldatapass: res.data });

        //     },

        //   },
        // ]);
        Alert.alert('Success', 'Data uploaded successfully.', [
          {
            text: 'OK',
            onPress: () => {
            if (global.usertype == 1) {
                navigation.navigate('ClientsProfiles', { alldatapass: res.data });
              } else {
                navigation.navigate('DashboardScreen', { alldatapass: res.data });
              }
            },
          },
        ]);




      } else {
        Alert.alert('Error', 'Failed to upload data. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[
        '#2c328b',
        '#353a90',
        '#3d4395',
        '#50569f',
        '#858abb',
        '#9fa3c9',
        '#adb0d0',
        '#b9bbd6',
        '#c2c4db',
        '#c1c4da',
        '#d6d8e5',
        '#dadbe7',
      ]}
      style={styles.container}
    >
      <BackArrow />
      <ScrollView>
        <Text style={styles.centeredText}>{String.addimg}</Text>
        <Text style={styles.UploimgText}>{String.Uploimgs}</Text>
        <View style={styles.imgviewstyle}>
          {selectedImages.length > 0 ? (
            <Swiper style={styles.wrapper} showsButtons={true}>
              {selectedImages.slice(0, 5).map((imageUri, index) => (
                <Image key={index} source={{ uri: `https://www.app.webuildindia.in/admin/public/${imageUri}` }} style={styles.gallarystyleimg} />
              ))}
            </Swiper>
          ) : (
            <>
              <TouchableOpacity onPress={selectImage}>
                <Image source={icons.gallary} style={styles.gallarystyleimg1} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.selectefileText}>{String.setectedfile}</Text>
              </TouchableOpacity>
            </>
          )}

          {/* {selectedImages.length > 0 ? (
            <Swiper style={styles.wrapper} showsButtons={true}>
              {selectedImages.map((imageUri, index) => (
                <Image key={index} source={{ uri: `https://www.app.webuildindia.in/admin/public/${imageUri}` }} style={styles.gallarystyleimg} />
              ))}
            </Swiper>
          ) : (
            <>
              <TouchableOpacity onPress={selectImage}>
                <Image source={icons.gallary} style={styles.gallarystyleimg1} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.selectefileText}>{String.setectedfile}</Text>
              </TouchableOpacity>
            </>
          )} */}
        </View>
        <Text style={styles.orText}>{String.or}</Text>
        <TouchableOpacity onPress={selectImage}>
          <View style={styles.cameraview}>
            <View style={styles.row}>
              <Image source={icons.camera} style={styles.cameraimg} />
              <Text style={[styles.selectefileText, styles.selectefileText2]}>{String.OpenCa}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <PinkButton
          imgbuttonstyle={styles.imgbuttonstyle}
          title={String.save}
          onPress={imgUpoldeandalldata}
        // onPress={Allpurchaseplan}

        />
        {loading && <ActivityIndicator size="large" color="#fff" />}
      </ScrollView>
    </LinearGradient>
  );
};

export default ImagesScreen;
