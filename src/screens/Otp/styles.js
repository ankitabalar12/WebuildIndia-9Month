import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  registertogetxte: {
    alignSelf: 'flex-start',
    fontSize: 30,
    fontWeight: "bold",
    color: '#fff',
    marginLeft: '9%',
    marginTop: '10%',
    marginBottom: '15%'
  },
  textviewstyle: {
    marginTop: 1
  },
  ragisterbutton: {
    marginTop: '40%'
  },
 
  otptext:{
      height:50,
      width:50,
      backgroundColor:'#fff',
       margin:'1%',
       borderRadius:5, 
       fontSize:25, 
       alignSelf:'center',
       textAlignVertical:'center', 
       justifyContent:'center', 
       padding:5
       
       
  },
  didtext:{
    fontSize:16,
    fontWeight:'bold',
    color:'#fff',
    textAlign:'center',
     marginTop:20
  },
  flexrowone:{
    flexDirection:'row',
    justifyContent:'center'
  },
  optragisterbutton:{

    marginBottom:'-10%'
  },
  otpInput: {
    width: 45,
    height: 50,
    borderRadius:5, 
    textAlign: 'center',
    marginHorizontal: 20,
    backgroundColor:'#fff',
    borderBottomColor:'#fff'
  },
  otpContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
     alignSelf:'center'
  },

})