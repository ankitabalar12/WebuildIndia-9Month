import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, TextInput, ScrollView } from 'react-native';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import { String } from '../../Helper/string';
import CustomTextInput from '../../Componets/TextinputComponets/CustomTextInput';
import PinkButton from '../../Componets/PinkButtonComponet/PinkButton';
import { addclientdata } from '../../../APICall';
const AddclientScreen = ({ navigation }) => {
    const [companyName, setCompanyName] = useState('')
    const [companyDescription, setDescription] = useState('')
    const [Address, setAddres] = useState('')
    const [categories, setCategories] = useState('')
    const [sub_categories, setSub_categories] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [area, setArea] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [login, setLogin] = useState('')
     const [ID, setID]= useState('')
     const [errors, setErrors] = useState({});
     const [showError, setShowError] = useState(false);
     const [loading, setLoading] = useState(false);
    const addclientalldata = async () => {
        const errors = {};
        
        if (!companyName) {
            errors.companyName = 'Please enter companyName';
        }
        if (!companyDescription) {
            errors.companyDescription = 'Please enter companyDescription';
        }
        if (!Address) {
            errors.Address = 'Please enter Address';
        }
        if (!categories) {
            errors.categories = 'Please enter categories';
        }
        if (!sub_categories) {
            errors.sub_categories = 'Please enter sub_categories';
        }
        if (!phonenumber) {
            errors.phonenumber = 'Please enter phonenumber';
        }
        if (!area) {
            errors.area = 'Please enter area';
        }
        if (!city) {
            errors.city = 'Please enter city';
        }
        if (!state) {
            errors.state = 'Please enter state';
        }
        if (!login) {
            errors.login = 'Please enter login';
        }
        
    
        setErrors(errors);
      
        if (Object.keys(errors).length > 0) {
            Alert.alert('Validation Error', 'Please fill in all required fields.');
            return;
        }
        setLoading(true);
        try {
            const data = {
                company_name:companyName,
                company_description:companyDescription,
                category:categories,
                subcategory:sub_categories,
                login:login,
                user_id:ID,
                phone_number:phonenumber,
                address:Address,
                area:area,
                city:city,
                state:state,
                images:''
            };
            console.log('Data:', data);
            const response = await addclientdata(global.url + 'addclients', data);
            console.log('global.url--:', global.url);
            console.log('Response--:', response);
            if (response && response.success === true) {
                console.log('Booking successful:', response);
            }
        } catch (error) {

        }
    };
    return (
        <LinearGradient
            colors={['#2c328b', '#353a90', '#3d4395', '#50569f',
                '#858abb', '#9fa3c9', '#adb0d0', '#b9bbd6',
                '#c2c4db', '#c1c4da', '#d6d8e5', '#dadbe7',]}
            style={styles.container}>
            <View style={styles.flexrow}>

                <BackArrow />
                <Text style={styles.youprofiltext}>{String.addclient}</Text>
            </View>
            <ScrollView>
                <View style={styles.margintop} />
                <Text style={styles.companytext}>{String.Compname}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="Enter your company name"
                    placeholderTextColor={'#8391A1'}
                    value={companyName}
                    onChangeText={(companyName) => setCompanyName(companyName)}
                />
                {errors.companyName && <Text style={styles.erroetext}>{errors.companyName}</Text>}
                <Text style={styles.companytext}>{String.CompanyDescri}</Text>
                <TextInput
                    style={styles.textaligstyle}
                    placeholder="Compant Description"
                    placeholderTextColor={'#8391A1'}
                    value={companyDescription}
                    multiline={true}
                    onChangeText={(companyDescription) => setDescription(companyDescription)}
                />
                {errors.companyDescription && <Text style={styles.erroetext}>{errors.companyDescription}</Text>}
                <Text style={styles.companytext}>{String.catagories}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="Select"
                    placeholderTextColor={'#8391A1'}
                    value={categories}
                    onChangeText={(categories) => setCategories(categories)}
                />
                
                {errors.categories && <Text style={styles.erroetext}>{errors.categories}</Text>}
                <Text style={styles.companytext}>{String.subcat}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="Select"
                    placeholderTextColor={'#8391A1'}
                    value={sub_categories}
                    onChangeText={(sub_categories) => setSub_categories(sub_categories)}
                />
                {errors.sub_categories && <Text style={styles.erroetext}>{errors.sub_categories}</Text>}
                <Text style={styles.companytext}>{String.login}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="E-mail ID (or) Phone number"
                    placeholderTextColor={'#8391A1'}
                    value={login}
                    onChangeText={(login) => setLogin(login)}
                />
                {errors.login && <Text style={styles.erroetext}>{errors.login}</Text>}
                <Text style={styles.companytext}>{String.phone}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="Phone number"
                    placeholderTextColor={'#8391A1'}
                    value={phonenumber}
                    onChangeText={(phonenumber) => setPhonenumber(phonenumber)}
                />
                {errors.phonenumber && <Text style={styles.erroetext}>{errors.phonenumber}</Text>}
                <Text style={styles.companytext}>{String.addres}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="Address"
                    placeholderTextColor={'#8391A1'}
                    value={Address}
                    onChangeText={(Address) => setAddres(Address)}
                />
                {errors.Address && <Text style={styles.erroetext}>{errors.Address}</Text>}
                <Text style={styles.companytext}>{String.area}</Text>
                <CustomTextInput
                    addtextviewstyle={styles.addtextviewstyle}
                    placeholder="Area"
                    placeholderTextColor={'#8391A1'}
                    value={area}
                    onChangeText={(area) => setArea(area)}
                />
                {errors.area && <Text style={styles.erroetext}>{errors.area}</Text>}
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
                <PinkButton
                    addscreenstyle={styles.addscreenstyle}
                    title={String.next}
                    onPress={() => {
                        addclientalldata()
                        // navigation.navigate("SubscriptionScreen");
                    }}

                />
                <View style={styles.marginbottom} />
            </ScrollView>
        </LinearGradient>
    )
}
export default AddclientScreen;

