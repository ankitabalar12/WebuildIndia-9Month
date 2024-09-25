import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, TextInput, ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import { String } from '../../Helper/string';
import CustomTextInput from '../../Componets/TextinputComponets/CustomTextInput';

import PinkButton from '../../Componets/PinkButtonComponet/PinkButton';
import { icons } from '../../Helper/icons';
import { NewsCategorydata, SubCatNews, addselected, uploadimagedata, } from '../../../APICall';
import { Dropdown } from 'react-native-element-dropdown';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';



const CreateyouradsBuilder = ({ navigation, route }) => {
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
    const [contact_person_name, setPersonName] = useState('')
    const [state, setState] = useState('')
    const [isUpArrow, setIsUpArrow] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [imageUri, setImageUri] = useState();
    const [alternativeNumber, setAlternativeNumber] = useState(false);
    const [id, setID] = useState('')
    const [allselectedImage, setSelectedImage] = useState(null);
    const [categoriesData, setCategoriesData] = useState('')
    const [subCategoriesData, setSubCategoriesData] = useState([]);
    const [profile_image, setProfile_image] = useState([]);
    const [imageUpdated, setImageUpdated] = useState([])
    const addads = route?.params?.addads
    // console.log('addads---1', addads)
    const alldatapass = route?.params
      console.log('alldatapass---', alldatapass)
    const planId = route?.params?.planId
    // console.log('planId---', planId)
    useEffect(() => {
        const fetchData = async () => {
            const userdata = await AsyncStorage.getItem('logindata');
            const finaluserdata = JSON.parse(userdata);
            setID(finaluserdata.id)
            console.log('created_at--->', finaluserdata.created_at)

        };
        fetchData();
        Getcategorydata();
        addselectedimg();
    }, []);
    const data = [
        { label: 'Item 1', value: 1 },
        { label: 'Item 2', value: 2 },
        { label: 'Item 3', value: 3 },
        { label: 'Item 4', value: 4 },
        { label: 'Item 5', value: 5 },
        { label: 'Item 6', value: 6 },
        { label: 'Item 7', value: 7 },
        { label: 'Item 8', value: 8 },
    ];
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

    const openLibrary = async () => {
        let options = {
            mediaType: 'photo',
            includeBase64: true,
            base64: true,
            maxHeight: 500,
            maxWidth: 500,
        };
        launchImageLibrary(options, async (res) => {
            if (res) {
                const includeBase64 = res.assets[0].base64;
                const data = {
                    base64: 'data:image/jpeg;base64,' + includeBase64,
                };
                try {
                    const userpic = await uploadimagedata(global.url + 'uploadimage', data);
                    if (userpic.data) {
                        setProfile_image(`https://www.app.webuildindia.in/admin/public/` + userpic.data);
                        setSelectedImage(userpic.data);
                        await AsyncStorage.setItem('profile_image', `https://www.app.webuildindia.in/admin/public/` + userpic.data);
                    }
                } catch (error) {
                    console.error('Failed to upload image:', error);

                }
            }
        });
    };
    const openCamera = async () => {
        let options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 500,
            maxWidth: 500,
        };
        launchCamera(options, async (resp) => {
            const includeBase64 = resp.assets[0].base64;
            const data = {
                base64: 'data:image/jpeg;base64,' + includeBase64,
            };
            try {
                const userpic = await uploadimagedata(global.url + 'uploadimage', data);
                if (userpic.data) {
                    setProfile_image(`https://www.app.webuildindia.in/admin/public/` + userpic.data);
                    setSelectedImage(userpic.data);
                    await AsyncStorage.setItem('profile_image', `https://www.app.webuildindia.in/admin/public/` + userpic.data);
                }
            } catch (error) {
                console.error('Failed to upload image:', error);

            }
        });
    };
    const toggleArrow = () => {
        setIsUpArrow(!isUpArrow);
    };
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    const validateMobileNumber = (mobileNumber) => {
        const re = /^[6-9]\d{9}$/;
        return re.test(mobileNumber);
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
        if (!email) {
            errors.email = 'Please enter email';
        } else if (!validateEmail(email)) {
            errors.email = 'Please enter a valid email';
        }
        if (!phone_number) {
            errors.phone_number = 'Please enter phone number';
        } else if (!validateMobileNumber(phone_number)) {
            errors.phone_number = 'Please enter a valid mobile number';
        }

        if (!pincode) {
            errors.pincode = 'Please enter pinCode';
        }
        if (!contact_person_name) {
            errors.contact_person_name = 'Please enter personName';
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
        if (!alternativeNumber) {
            errors.alternativeNumber = 'Please enter your upload Alternative Number ';
        }
        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }
        setLoading(true);
        // console.log('images-----', allselectedImage)
        navigation.navigate('ImagesScreen', {
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
            profile_image: allselectedImage,
            email: email,
            alternativeNumber: alternativeNumber,
            company_id: addads,
            contact_person_name: contact_person_name,
            plan_name: planId,
            alternative_phone_number:alternativeNumber
        });
    };
    // console.log('company_id-----', addads)
    //console.log('dataicompany:::',addads.company_id )
    // const Getcategorydata = async () => {
    //     try {
    //         const res = await NewsCategorydata(global.url + 'getcategory', data);
    //         console.log('res:', res);
    //         var count = Object.keys(res.data).length;
    //         for (var i = 0; i < count; i++) {
    //             dropDownData2.push({ label: res.data[i].name, value: res.data[i].id });
    //         }
    //         console.log('dropDownData2>>', dropDownData2);
    //         setCategoriesData(dropDownData2);
    //     } catch (error) {
    //         console.error('Error fetching category data:', error);
    //     }
    // };

    const Getcategorydata = async () => {
        try {
            const res = await NewsCategorydata(global.url + 'getcategory', data);
            console.log('res:', res);
            if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                let categories = res.data.map(cat => ({ label: cat.name, value: cat.id }));
                console.log('categories:', categories);
                setCategoriesData(categories);
            } else {
                // Handle case where no categories are available
                setCategoriesData([]);
            }
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };
    // const onCategoryChange = async (value) => {
    //     console.log('Selected category:', value);
    //     setCategories(value);
    //     try {
    //         const data = {
    //             category: value
    //         };
    //         const res = await SubCatNews(global.url + 'getsubcategory', data);
    //         console.log('res-:', res)
    //         console.log('data :=', data)
    //         var count = Object.keys(res.data).length;
    //         for (var i = 0; i < count; i++) {
    //             dropDownData3.push({ label: res.data[i].name, value: res.data[i].id }); // Create your array of data
    //         }
    //         console.log('dropDownData3>>', dropDownData3);
    //         setSubCategoriesData(dropDownData3);
    //     } catch (error) {
    //         console.error('Error fetching subcategory data:', error);
    //     }

    // };


    // const onCategoryChange = async (value) => {
    //     console.log('Selected category:', value);
    //     setCategories(value);
    //     try {
    //         const data = {
    //             category: value
    //         };
    //         const res = await SubCatNews(global.url + 'getsubcategory', data);
    //         console.log('res-:', res)
    //         console.log('data :=', data)
    //         var count = Object.keys(res.data).length;
    //         let subCategories = [];
    //         for (var i = 0; i < count; i++) {
    //             subCategories.push({ label: res.data[i].name, value: res.data[i].id }); // Create your array of data
    //         }
    //         console.log('subCategories:', subCategories);
    //         setSubCategoriesData(subCategories);
    //     } catch (error) {
    //         console.error('Error fetching subcategory data:', error);
    //     }
    // };

    const onCategoryChange = async (value) => {
        console.log('Selected category:', value);
        setCategories(value);
        try {
            const data = {
                category: value
            };
            const res = await SubCatNews(global.url + 'getsubcategory', data);
            // console.log('res-:', res)
            // console.log('data :=', data)
            if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                let subCategories = res.data.map(subcat => ({ label: subcat.name, value: subcat.id }));
                // console.log('subCategories:', subCategories);
                setSubCategoriesData(subCategories);
            } else {
                // Handle case where no subcategories are available
                setSubCategoriesData([]);
            }
        } catch (error) {
            console.error('Error fetching subcategory data:', error);
        }
    };
    const onSubcategoryChange = (subcategoryId) => {
        console.log('Selected category:', subcategoryId);
        setSub_categories(subcategoryId);
    };

    const addselectedimg = async () => {
        setLoading(true);
        const data = {
            profile_image: allselectedImage
        }
        console.log('data----1', data.profile_image)
        try {
            const res = await addselected(global.url + 'addads', data);

            // console.log('global.url--- :->', global.url)
            // console.log('res-----<', res)
        } catch (error) {
            console.error('Failed to add selected image:', error);

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
            <Text style={styles.centeredText}>{String.createyour}</Text>
            <ScrollView>
                <View style={styles.margintop} />
                <Text style={styles.companytext}>{String.personName}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="Enter your personName"
                    placeholderTextColor={'#8391A1'}
                    value={contact_person_name}
                    onChangeText={(contact_person_name) => setPersonName(contact_person_name)}
                />
                {errors.contact_person_name && <Text style={styles.erroetext}>{errors.contact_person_name}</Text>}
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

                {errors.categoriesData && <Text style={styles.erroetext}>{errors.categoriesData}</Text>}
                <Text style={styles.companytext}>{String.subcat}</Text>
                <TouchableOpacity onPress={() => {
                    toggleArrow();

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
                {errors.subCategoriesData && <Text style={styles.erroetext}>{errors.subCategoriesData}</Text>}
                <Text style={styles.companytext}>{String.phone}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="Phone number"
                    placeholderTextColor={'#8391A1'}
                    value={phone_number}
                    maxLength={10}
                    keyboardType="numeric"
                    onChangeText={(phone_number) => setPhonenumber(phone_number)}
                />
                {errors.phone_number && <Text style={styles.erroetext}>{errors.phone_number}</Text>}
                <Text style={styles.companytext}>{String.AlternativeNumber}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="Alternative Number"
                    placeholderTextColor={'#8391A1'}
                    keyboardType="numeric"
                    maxLength={10}
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
                {errors.pincode && <Text style={styles.erroetext}>{errors.pincode}</Text>}
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

                <Text style={styles.companytext}>{String.updateprofle}</Text>
                <TouchableOpacity onPress={selectimage}>
                    <View style={styles.addtextviewstyle1}>

                        <View style={styles.rowview}>
                            <Text style={styles.placeholder} onPress={() => {
                                // addedalldata();
                            }}>{String.updateprofle} (PNG, JPG)</Text>

                            {/* {selectedImage && (<Image source={{ uri: selectedImage }} style={styles.img2}></Image>)} */}
                            <Image source={icons.uploading}

                                style={styles.img}></Image>
                        </View>
                    </View>
                </TouchableOpacity>
                {errors.uploading && <Text style={styles.erroetext}>{errors.uploading}</Text>}
                <PinkButton
                    addscreenstyle={styles.addscreenstyle}
                    title={String.next}
                    onPress={() => {
                        addedalldata();
                    }}
                />
                {loading && <ActivityIndicator size="large" color="#fff" />}
                <View style={styles.marginbottom} />
            </ScrollView>
        </LinearGradient>
    )
}
export default CreateyouradsBuilder;