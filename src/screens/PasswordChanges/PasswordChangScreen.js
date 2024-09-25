import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { icons } from '../../Helper/icons';
import LinearGradient from 'react-native-linear-gradient';
import { String } from '../../Helper/string';
import PinkButton from '../../Componets/PinkButtonComponet/PinkButton';
const PasswordChangScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#2c328b', '#353a90', '#3d4395', '#50569f',
                    '#858abb', '#9fa3c9', '#adb0d0', '#b9bbd6',
                    '#c2c4db', '#c1c4da', '#d6d8e5', '#dadbe7',]}
                style={styles.container}>
                <Image source={icons.fully} style={styles.img}></Image>
                <Text style={styles.regitext}>{String.change}</Text>
                <Text style={[styles.regitext, styles.regitext1]}>{String.successfully}</Text>

                <PinkButton
                    title={String.backto}
                    onPress={() => navigation.navigate('LoginScreen')}
                />
            </LinearGradient>

        </View>

    );
}
export default PasswordChangScreen;