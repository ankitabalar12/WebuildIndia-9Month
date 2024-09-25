import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  // captenimg: {
  //   height: 200,
  //   width: 220
  // },
  ttext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: '9%', marginTop: '5%'
  },
  neartext: {
    fontSize: 12,
    fontWeight: '400',
    marginLeft: '9%',
    marginTop: '1%', marginRight:"10%"

  },
  companytext: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: '9%',
    marginTop: '5%',
    color: '#000'
  },
  companytext2: {
    fontSize: 12,
    fontWeight: '400',
    marginLeft: '9%',
    marginRight: '11%',
    marginTop: '5%',
    color: '#000', marginRight: '9%'
  },

  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',

    alignSelf: 'center'
  },

  flexcolem: {
    flexDirection: 'column',

    marginTop: '1%'
  },
  captenimg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginRight: '2%',
  },
  mainimgmodal:{
    width: '40%',
     height: 240,
     borderRadius: 10,
     marginRight: '2%',
    // backgroundColor:'red'
  },
  engessimg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginBottom: 7

  },

  mainimgmodal2: {
    width: 90,
    height: 117,
    borderRadius: 15,
    marginBottom: 4, 
    justifyContent:'center',
    // marginTop:"1%",
      marginRight:5,
  //  backgroundColor:"pink"

  },
  mainimgmodal3:{
    width: 90,
    height: 117,
    borderRadius: 15,
    marginBottom: 4,
    // marginBottom: 15, 
    justifyContent:'center',
    // marginTop:"1%",
    //  marginRight:5,
  //  backgroundColor:"red"
  },
  gunimg: {
    width: 90,
    height: 114,
     marginTop: '3%',
    borderRadius: 10

  },
  flexrow3: {
    flexDirection: 'row',
    marginRight: '20%'
  },
  girlsimgimg: {
    height: 160,
    width: 110,
    marginLeft: '9%',
    marginTop: '5%',
     borderRadius: 10, 
    
  },
  girlsimgimg2: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  mrnametext: {
    marginLeft: '10%',
    marginTop: '1%',
    fontSize: 14,
    fontWeight: '700',
    color: '#000',

  },
  mrnametext2:{
marginTop:'4%'
  },
  simplytext2: {
    marginLeft: '10%',
    marginTop:"2%",

    marginRight: '30%',

    fontSize: 12
  },
  simplytext4: {
    marginRight: '15%',
  },
  azxtext2: {
    marginLeft: '10%',
    marginRight: '20%',
    fontSize: 12,

  },

  msgimg: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
  callimg: {
    height: 20,
    width: 20,
    alignSelf: 'center'
  },


  closeButton: {
    position: 'absolute',
    top: 0,
    right: 50,
    // zIndex: 1
  },
  closeIcon: {
    width: 15,
    height: 15,
    tintColor: '#fff',

  },
  // largeImage: {
  //   width: 428,
  //   height: '%',
  //   alignSelf: 'center',
  //   marginTop: '11%',
  //   zIndex: 0,
  // },



  flexrow5: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconview: {

    borderRadius: 15,
    marginHorizontal: '3%',
    height: 30,
    width: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderColor: '#DCDCDC',
    borderWidth: 1,
    // marginRight:"20%"
    // marginLeft:'15%'
  },
  //   iconviewtyr:{
  // marginRight:
  //   },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  // captenImg: {
  //   width: 100,
  //   height: 100,
  //   resizeMode: 'cover',
  //   margin: 8,
  // },
  captenimg2: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    margin: 8,
    backgroundColor: 'red'
  },
  engessImg: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    margin: 8,
  },
  gunImg: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    margin: 8,
  },



  modalContainer: {
    flex: 1,
    width: '100%',
    // justifyContent: 'flex-end',
  },
  translucentBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  },
  largeImage: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
    marginTop: '20%',
    // alignSelf:'center'
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'red'
  },
  martop: {
    marginTop: '10%'
  },
  additionalText: {
    marginVertical: 16,
    fontSize: 18,
    color: 'white',
    backgroundColor: 'red'
  },
  closetextstyle: {
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center', color: '#fff'
  },
  closetextview: {
    height: 20,
    width: 20,

    position: 'absolute',
    top: 120,
    right: 20
  },
  bottommargin: {
    marginBottom: '50%'
  },
  coulmview: {
    height: 240,
    width: '90%',
    // backgroundColor:'yellow',
    justifyContent: 'center',
    alignSelf: 'center',
  }
})