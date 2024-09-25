import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  welcomtext: {
    alignSelf: 'flex-start',
    fontSize: 30,
    fontWeight: "bold",
    color: '#fff',
    marginLeft: '9%',
    marginTop: '40%',
    marginBottom: '5%'
  },
  stylemar:{
    marginTop:'15%'
  },
  viewstyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textinputview: {
    height: 56,
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 20,
    padding: 10,
     justifyContent: 'center'
  },
  textinputview2:{
    height: 56,
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 20,

     justifyContent: 'center'
  },
  flexrow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginLeft:'2.5%'
  },
  showpaasowdimg: {
    height: 30,
    width: 30,
     marginRight:'5%', marginTop:'20%'
  },
  hidepaasowdimg: {
    height: 20,
    width: 20,
    tintColor: "#6b707c",
    marginRight:'5%', marginTop:'35%'
  },
  forgotpass: {
    marginTop: 20,
    alignSelf: 'flex-end',
    marginRight: '7%',
  },
  passwordtext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  rowviewtextaccout:{
    flexDirection:'row',
    alignSelf:'center', marginTop:'5%'

  },
  textloginteo:{
    fontSize:13,
    fontWeight:'900', color:'#2c328b',
    textAlign:'center', 
  },
  textloginteo0o:{
    fontSize:15, 
    
  },
  erroetext: {
    fontSize: 14,
    color: 'red',
    marginTop: 4,
    alignSelf: 'flex-start',
    marginLeft: '9%'
  }
})