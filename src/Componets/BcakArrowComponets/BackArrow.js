import React from 'react';
import { StyleSheet, TouchableOpacity,Image,View} from 'react-native';
import { icons } from '../../Helper/icons';
import { useNavigation } from '@react-navigation/native';
const BackArrow = () => {
    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
      };
    return(
        <TouchableOpacity  style={styles.viewstyle} onPress={goBack}>
           <View>
            <Image source={icons.leftarrow} style={styles.img}></Image>
           </View>
           </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
   
    viewstyle:{
      height:54,
      width:54,
      borderRadius:40,
      backgroundColor:'#fff',
      marginTop:'10%',
      marginLeft:'9%',
      justifyContent:'center',
     
    },
    img:{
         height:35,
         width:35,
         alignSelf:'center',
         marginBottom:10
    }
   
});
export default BackArrow;