import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View, StatusBar, Image } from 'react-native';
import ReactNativeModal from 'react-native-modal';
const Modalcomponets = ({isVisible,transparent,backdropColor,backdropOpacity, onBackdropPress,onPress, swipeDirection,title,modalestyle,textstylemodal,buttonview,title2,title2style,modalestyle1} ) => {
    return (
        <View>
            <ReactNativeModal
                isVisible={isVisible}
                onBackdropPress={onBackdropPress}
                backdropColor={backdropColor}
                backdropOpacity={backdropOpacity}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection={swipeDirection}
                onRequestClose={() => {
                setModalVisible(false);
                
                }}
            >
                <View style={[styles.mainviewstyle,modalestyle,modalestyle1]}>
                    <Text style={[textstylemodal,]}>{title}</Text>
                    <TouchableOpacity onPress={onPress}>
                    <View style={buttonview}>
                    <Text style={[title2style]}>{title2}</Text> 
                    </View>
                    </TouchableOpacity>
                  </View>
            </ReactNativeModal>
        </View>
    )
}
const styles = StyleSheet.create({
   
    mainviewstyle:{
      height:'50%',
      width:'85%',
      borderRadius:10,
      backgroundColor:'#fff',
      alignSelf:'center'
     },
     height:200,
     width:300, backgroundColor:'yellow'
   
});
export default Modalcomponets;