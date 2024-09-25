import React,{useState} from 'react';
import { StyleSheet, TextInput,Image,View, TouchableOpacity} from 'react-native';
import { icons } from '../../Helper/icons';
import { useNavigation } from '@react-navigation/native';

const SearchComponest = ({onPress }) => {
 return(
      <View style={[styles.searchview]}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
       
           >
          <Image source={icons.sar} style={styles.sarimg}></Image>
          </TouchableOpacity>
          <TextInput
              placeholder="Search..."
              placeholderTextColor={'#808080'}
              onChangeText={onPress} 
              />
            </View>
      </View>
    )
}
  const styles = StyleSheet.create({
    searchview:{
        height:50,
        width:'90%', 
        backgroundColor:'#fff',
        marginTop:'5%', 
        borderRadius:100, 
        alignSelf:'center',
        justifyContent:'center'
    } ,
    sarimg:{
         height:25,
         width:25,
         alignSelf:'center',
       
         marginLeft:10,
         marginTop:'30%'
        
    }
   
  
   
});
export default SearchComponest;