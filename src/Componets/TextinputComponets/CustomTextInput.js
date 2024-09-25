
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

const CustomTextInput = ({ placeholder, maxLength,onChangeText,value, secureTextEntry,placeholderTextColor,textviewstyle ,
    Profileviewstyle,textinputviewto,addtextviewstyle,drescriviewstyle,busniessviewstyle,keyboardType}) => {
 return (
        <View style={styles.inputContainer}>
            <View style={[styles.textinputview,textviewstyle,busniessviewstyle,Profileviewstyle,textinputviewto,addtextviewstyle, drescriviewstyle]}>
             
                    <TextInput
                        placeholder={placeholder}
                        value={value}
                        placeholderTextColor={placeholderTextColor}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                        secureTextEntry={secureTextEntry}
                        maxLength={maxLength}
                    />
                   
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 10,
    },
    textinputview: {
        height: 56,
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 8,
        // marginTop: 20,
        padding: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    },
   
});

export default CustomTextInput;
