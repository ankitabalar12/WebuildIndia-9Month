import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { String } from '../../Helper/string';
import LinearGradient from 'react-native-linear-gradient';
import { Newsonboardscreen } from '../../../APICall';
const OnBorardScreen = ({ route, }) => {
    const [data, setData] = useState([])
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const onboarddata = route?.params?.onboarddata || [];
    console.log('onboarddata---', onboarddata)
    useEffect(() => {
        if (Array.isArray(onboarddata)) {
            setData(onboarddata);
        } else {
            setData([]);
        }
    }, [onboarddata]);
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#2d338c', '#31378e', '#373c91', '#3f4596', '#50569f', '#5b61a4', '#6f74b0', '#757ab3', '#7d82b7']}
                style={styles.linear}
            />
            <View style={styles.marginview}></View>
            <View style={styles.visiovew}>
                {loading && <ActivityIndicator size="large" color="#50569f" />}
                {data.map((item2, index) => (
                    <View key={index} style={styles.flexdriracion}>
                        <View style={styles.onbordview}>
                            <Text style={styles.visiotext}>{item2.text1} : </Text>
                            {/* <Text style={styles.tovisiontext}>
                                {item2.text2.split("\n\n").map((line, index) => (
                                    <Text key={index}>
                                        {line}
                                        {"\n\n"}
                                      
                                    </Text>
                                ))}
                            </Text> */}
                            {item2.text2.split("\n\n").map((line, index, array) => (
    <React.Fragment key={index}>
        <Text style={styles.tovisiontext}>
            {line}
        </Text>
        {index !== array.length - 1 && "\n\n"}
    </React.Fragment>
))}


                        </View>
                    </View>
                ))}
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <LinearGradient
                        colors={['#7d82b7', '#7d82b7']}
                        style={styles.nextbuttonstyle}
                    >
                        <Text style={styles.textstyles}>Next</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>


            <LinearGradient
                colors={['#d7d8e5', '#d8d9e6', '#dedfe9', '#ebecf0', '#f5f5f5', '#fff']}
                style={[styles.linear, styles.linear1]}
            />

        </View >

    );
}
export default OnBorardScreen;