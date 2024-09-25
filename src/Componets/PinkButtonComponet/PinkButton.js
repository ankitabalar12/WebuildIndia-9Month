import React from 'react';
import { StyleSheet, Text,TouchableOpacity,View} from 'react-native';

const PinkButton = ({title,
     onPress,
     ragisterbutton,
     optragisterbutton,
     forgetragisterbutton,
     resendpassword,
     addscreenstyle,
     imgbuttonstyle,
     profilebutton,busniestyle,
     clientstyle,
     stylemar
    }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
            <View style={[styles.buttonstyle,
                profilebutton,ragisterbutton,
                stylemar,
                busniestyle,optragisterbutton,forgetragisterbutton,resendpassword,
                addscreenstyle, imgbuttonstyle,clientstyle]}>
            <Text style={styles.textstyle}>{title}</Text>
            </View>
            </TouchableOpacity>
          
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        justifyContent: 'center',
        
    },
    buttonstyle: {
        height: 56,
        width: '85%',
         backgroundColor: '#823995',
         borderRadius: 8,
         justifyContent:'center',
         alignSelf:'center', 
         marginTop:'30%'
        
    },
    textstyle:{
        fontSize:15,
        fontWeight:'bold',
         color:'#fff',
         textAlign:'center'
    }
})
export default PinkButton;