import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, TextInput, ActivityIndicator , ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import { String } from '../../Helper/string';
import CustomTextInput from '../../Componets/TextinputComponets/CustomTextInput';

import PinkButton from '../../Componets/PinkButtonComponet/PinkButton';
import { icons } from '../../Helper/icons';
import { NewsCategorydata, SubCatNews, addadsdata } from '../../../APICall';
import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

const data = [
    { label: 'Category A', value: 'value1' },
    { label: 'Category B', value: 'value2' },
    { label: 'Category C', value: 'value3' },
    { label: 'Category D', value: 'value4' },
    { label: 'Category E', value: 'value5' },
    { label: 'Category F', value: 'value6' },

];
const CreateaddScreen = ({ navigation }) => {
    const [company_name, setCompanyName] = useState('')
    const [company_description, setDescription] = useState('')
    const [company_address, setCompanyAddres] = useState('')
    const [category, setCategories] = useState(null)
    const [sub_category, setSub_categories] = useState(null)
    const [phone_number, setPhonenumber] = useState('')
    const [email, setE_Mailid] = useState('')
    const [pincode, setPinCode] = useState('')
    const [dropDownData2, setdropDownData2] = useState([]);
    const [dropDownData3, setdropDownData3] = useState([]);
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [isUpArrow, setIsUpArrow] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [imageUri, setImageUri] = useState();
    const [alternativeNumber, setAlternativeNumber] = useState(false);
    const [id, setID] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [categoriesData, setCategoriesData] = useState('')
    const [subCategoriesData, setSubCategoriesData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const userdata = await AsyncStorage.getItem('logindata');
            const finaluserdata = JSON.parse(userdata);
            setID(finaluserdata.id)
            console.log('id--->', finaluserdata.id)

        };
        fetchData();
        Getcategorydata()
    }, []);
    const handleChangeProfile = () => {
        Alert.alert(
          'Confirmation',
          'Are you sure you want to change your profile picture?',
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: () => selectImage(),
            },
          ]
        );
      };
    
      const selectImage = () => {
        Alert.alert('Alert', 'Choose an option', [
          {
            text: 'Back',
            onPress: () => {},
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
    
      const openLibrary = () => {
        const options = {
          storageOptions: {
            path: 'Image',
          },
        };
        console.log('Opening Library');
        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            setSelectedImage(response.assets[0].uri);
            console.log(response.assets[0].uri);
          }
        });
      };
    
      const openCamera = () => {
        launchCamera(
          {
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
            saveToPhotos: true,
          },
          (response) => {
            if (!response.didCancel) {
              setSelectedImage(response.uri);
              console.log('Photo captured:', response.uri);
            }
          }
        );
      };


    const toggleArrow = () => {
        setIsUpArrow(!isUpArrow);
    };
    const handleEmploymentTypePress = () => {
        Alert.alert(
            'Alert Title',
            isUpArrow ? 'Open Upper Arrow Pressed' : 'Close Lower Arrow Pressed',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
        );
    };
    const addedalldata = async () => {
        const errors = {};
        if (!company_name) {
            errors.company_name = 'Please enter company_name';
        }
        if (!company_description) {
            errors.company_description = 'Please enter company_description';
        }
        if (!categoriesData) {
            errors.categoriesData = 'Please enter categories';
        }
        if (!subCategoriesData) {
            errors.subCategoriesData = 'Please enter sub_categories';
        }
        if (!phone_number) {
            errors.phone_number = 'Please enter phone_number';
        }
        if (!email) {
            errors.email = 'Please enter email';
        }
        if (!pincode) {
            errors.pincode = 'Please enter pinCode';
        }
        if (!state) {
            errors.state = 'Please enter state';
        }
        if (!city) {
            errors.city = 'Please enter city';
        }
        if (!company_address) {
            errors.company_address = 'Please enter company_address';
        }
        if (!alternativeNumber) {
            errors.alternativeNumber = 'Please enter your upload Alternative Number ';
        }
        setErrors(errors);
    
        if (Object.keys(errors).length > 0) {
            return;
        }
    
        setLoading(true);
    
        navigation.navigate('ClientsProfiles', {
            Clientdatapass: {
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
                images: imageUri,
                email: email,
                alternativeNumber: alternativeNumber
            }
        });
        
    };
    const Getcategorydata = async () => {
        try {
            const res = await NewsCategorydata(global.url + 'getcategory', data);
            console.log('res:', res);
            var count = Object.keys(res.data).length;
            for (var i = 0; i < count; i++) {
                dropDownData2.push({ label: res.data[i].name, value: res.data[i].id }); // Create your array of data
            }
            console.log('dropDownData2>>', dropDownData2);
            setCategoriesData(dropDownData2);
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };
    const onCategoryChange = async (value) => {
        console.log('Selected category:', value);
        setCategories(value);
         try {
            const data = {
                category: value
            }; 
            const res = await SubCatNews(global.url + 'getsubcategory', data);
            console.log('res-:', res)
            console.log('data :=', data)
            var count = Object.keys(res.data).length;
            for (var i = 0; i < count; i++) {
                dropDownData3.push({ label: res.data[i].name, value: res.data[i].id }); // Create your array of data
            }
            console.log('dropDownData3>>', dropDownData3);
            setSubCategoriesData(dropDownData3);
        } catch (error) {
            console.error('Error fetching subcategory data:', error);
        }

};
const onSubcategoryChange = (subcategoryId) => {
    console.log('Selected category:', subcategoryId);
    setSub_categories(subcategoryId);
};
    return (
        <LinearGradient
            colors={['#2c328b', '#353a90', '#3d4395', '#50569f',
                '#858abb', '#9fa3c9', '#adb0d0', '#b9bbd6',
                '#c2c4db', '#c1c4da', '#d6d8e5', '#dadbe7',]}
            style={styles.container}>
            <BackArrow />
            <Text style={styles.centeredText}>{String.createyour}</Text>
            <ScrollView>
                <View style={styles.margintop} />
                <Text style={styles.companytext}>{String.Compname}</Text>
                <Text style={styles.companytext}>{String.Compname}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="Enter your company name"
                    placeholderTextColor={'#8391A1'}
                    value={company_name}
                    onChangeText={(company_name) => setCompanyName(company_name)}
                />
                {errors.company_name && <Text style={styles.erroetext}>{errors.company_name}</Text>}
                <Text style={styles.companytext}>{String.CompanyDescri}</Text>
                <TextInput
                    style={styles.textaligstyle}
                    placeholder="Compant Description"
                    placeholderTextColor={'#8391A1'}
                    value={company_description}
                    multiline={true}
                    onChangeText={(company_description) => setDescription(company_description)}
                />
                {errors.company_description && <Text style={styles.erroetext}>{errors.company_description}</Text>}
                <Text style={styles.companytext}>{String.addre}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="Company Address"
                    placeholderTextColor={'#8391A1'}
                    value={company_address}
                    onChangeText={(company_address) => setCompanyAddres(company_address)}
                />
                {errors.company_address && <Text style={styles.erroetext}>{errors.company_address}</Text>}
                <Text style={styles.companytext}>{String.catagories}</Text>
                <TouchableOpacity onPress={() => {
                    toggleArrow();
                    handleEmploymentTypePress();
                }}>
                    <View style={styles.addtextviewstyle1}>

                    {categoriesData ?
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                selectedTextStyle={styles.selectedText}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={categoriesData}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select item"
                                searchPlaceholder="Search..."
                                value={category}
                                onChange={item => {
                                    onCategoryChange(item.value);
                                }} />
                            : null
                        }
                        </View>

                
                </TouchableOpacity>
                {/* {errors.categories && <Text style={styles.erroetext}>{errors.categories}</Text>} */}
                <Text style={styles.companytext}>{String.subcat}</Text>
                <TouchableOpacity onPress={() => {
                    toggleArrow();
                    handleEmploymentTypePress();
                }}>
                    <View style={styles.addtextviewstyle1}>
                    {subCategoriesData ?
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                selectedTextStyle={styles.selectedText}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={subCategoriesData}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select item"
                                searchPlaceholder="Search..."
                                value={sub_category}
                                onChange={item => {
                                    onSubcategoryChange(item.value);
                                }} />
                            : null
                        }
                    </View>
                </TouchableOpacity>
                {/* {errors.sub_categories && <Text style={styles.erroetext}>{errors.sub_categories}</Text>} */}
                <Text style={styles.companytext}>{String.phone}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="Phone number"
                    placeholderTextColor={'#8391A1'}
                    value={phone_number}
                    onChangeText={(phone_number) => setPhonenumber(phone_number)}
                />
                {errors.phone_number && <Text style={styles.erroetext}>{errors.phone_number}</Text>}
                <Text style={styles.companytext}>{String.AlternativeNumber}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="Alternative Number"
                    placeholderTextColor={'#8391A1'}
                    value={alternativeNumber}
                    onChangeText={(alternativeNumber) => setAlternativeNumber(alternativeNumber)}
                />
                {errors.alternativeNumber && <Text style={styles.erroetext}>{errors.alternativeNumber}</Text>}
                <Text style={styles.companytext}>{String.email}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="E-Mail Id"
                    placeholderTextColor={'#8391A1'}
                    value={email}
                    onChangeText={(email) => setE_Mailid(email)}
                />
                {errors.email && <Text style={styles.erroetext}>{errors.email}</Text>}
                <Text style={styles.companytext}>{String.pin}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="PIn Code"
                    placeholderTextColor={'#8391A1'}
                    value={pincode}
                    onChangeText={(pincode) => setPinCode(pincode)}
                />
                {errors.pinCode && <Text style={styles.erroetext}>{errors.pinCode}</Text>}
                <Text style={styles.companytext}>{String.city}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="City"
                    placeholderTextColor={'#8391A1'}
                    value={city}
                    onChangeText={(city) => setCity(city)}
                />
                {errors.city && <Text style={styles.erroetext}>{errors.city}</Text>}
                <Text style={styles.companytext}>{String.State}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="State"
                    placeholderTextColor={'#8391A1'}
                    value={state}
                    onChangeText={(state) => setState(state)}
                />
                {errors.state && <Text style={styles.erroetext}>{errors.state}</Text>}
                {/* <Text style={styles.companytext}>{String.updateprofle}</Text>
                <View style={styles.addtextviewstyle1}>
                    <TouchableOpacity onPress={handleChangeProfile}>
                        <View style={styles.rowview}>
                            <Text style={styles.placeholder}>{String.updateprofle} (PNG, JPG)</Text>

                            {selectedImage && (<Image source={{ uri: selectedImage }} style={styles.img2}></Image>)}
                            <Image source={icons.uploading} style={styles.img}></Image>
                        </View>
                    </TouchableOpacity>
                </View> */}
                {/* {errors.uploading && <Text style={styles.erroetext}>{errors.uploading}</Text>} */}
                <PinkButton
                    addscreenstyle={styles.addscreenstyle}
                    title={String.next}
                    onPress={() => {
                        addedalldata()
                    }} />
                {loading && <ActivityIndicator size="large" color="#fff" />}
                <View style={styles.marginbottom} />
            </ScrollView>
        </LinearGradient>
    )
}
export default CreateaddScreen;