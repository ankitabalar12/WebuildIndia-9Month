import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import BackArrow from '../../Componets/BcakArrowComponets/BackArrow';
import { String } from '../../Helper/string';
import { icons } from '../../Helper/icons';
import Modalcomponets from '../../Componets/ModalComponet/Modalcomponets';
import { expiredata, myAdsDataall, pendindata } from '../../../APICall';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment/moment';

const DashboardScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState()
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false);
  const [data2, setData2] = useState('')
  const [data3, setData3] = useState('')
  const [id, setId] = useState('')
  const [not, setnot] = useState('');
  const [two, setwo] = useState()
  const title = data3 ? `You can create ${data3} more ads \n on your subscription` : 'No more ads pending';
  useEffect(() => {
    const myadsCurrentDate = async () => {
      const userdata = await AsyncStorage.getItem('logindata');
      const finaluserdata = JSON.parse(userdata);
      myadsData(finaluserdata.id)
      expiredataall(finaluserdata.id)
      setId(finaluserdata.id)
    };
    navigation.addListener('focus', () => {
      myadsCurrentDate();

  })

  }, [not]);
  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }
  const selectcard = (cardNumber) => {

    navigation.navigate('ThreeViewScreen', {
      cardNumber,

    });
  };

  const renewads = async (id) => {
    global.adstype = 1;
    navigation.navigate('SubscriptionScreen', { expriedId: id })
  };

  const creataddads = async () => {
    global.adstype = 0;
    navigation.navigate('SubscriptionScreen');
  };



  // myads
  const myadsData = async (id) => {
    setLoading(true);
    const data = {
      user_id: id
    }
    // console.log('data----', data)
    const res = await myAdsDataall(global.url + 'myads', data);
    setData(res.data)
    // console.log('global.url--- :->', global.url)
    // console.log('res-----<', res)
    setLoading(false);
  }



  const expiredataall = async (id) => {
    setLoading(true);
    const data = {
      user_id: id
    }
    // console.log('data >>', data)
    const res = await expiredata(global.url + 'expiredads', data);
    setData2(res.data)
    // console.log('global.url :', global.url)
    // console.log('res >>: ', res)
    setLoading(false);
    // console.log('<<res.data>>', res.data)
  }




  const pendingadsdata = async () => {
    try {
      setLoading(true);
      const data = {
        user_id: id
      };
      // console.log('data--1', data);
      const res = await pendindata(global.url + 'pendingads', data);

      setData3(res.data);
      // console.log('global.url--- :->', global.url);
      // console.log('res--1', res);
      // console.log('res.data.data:', res.data.data);
      // console.log('data ====>', res.data)
      // console.log('Message ====>', res.message)
      // console.log('Success ====>', res.success)

      // Display the data in an alert
      if (res.success === false) {
        Alert.alert('Error', res.data.error);
        // navigation.navigate('SubscriptionScreen');
        creataddads()

        return;
      } else {
        setData3(res.data);
        setModalVisible(true)
      }
    } catch (error) {
      console.error('Error fetching pending ads data:', error);
    } finally {
      setLoading(false);
    }
  };



  // const pendingadsdata = async () => {
  //   try {
  //     setLoading(true);
  //     const data = {
  //       user_id: id
  //     };
  //     console.log('data--1', data);
  //     const res = await pendindata(global.url + 'pendingads', data);

  //     setData3(res.data);
  //     console.log('global.url--- :->', global.url);
  //     console.log('res--1', res);
  //     console.log('res.data.data:', res.data.data);
  //     console.log('data ====>', res.data);
  //     console.log('Message ====>', res.message);
  //     console.log('Success ====>', res.success);
  //     setModalVisible(true);
  //     if (res.data.data === 4) {
  //       Alert.alert(
  //         "Alert",
  //         "You have reached the ad limit.",
  //         [
  //           {
  //             text: "OK",
  //             onPress: () => console.log("OK Pressed"),
  //           },
  //         ],
  //         { cancelable: false }
  //       );
  //     } else if (res.data.data >= 1 && res.data.data <= 3) {
  //       setModalVisible(true);
  //     } else {
  //       setModalVisible(false);
  //     }

  //   } catch (error) {
  //     console.error('Error fetching pending ads data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // const renewadsdataall = async (id) => {
  //   setLoading(true);
  //   const data = {
  //     user_id: id,
  //     id:id,
  //     plan_id:id
  //   }
  //   console.log('data >>', data)
  //   const res = await renewadsdata(global.url + 'renewads', data);
  //   setData2(res.data)
  //   console.log('global.url :', global.url)
  //   console.log('res >>: ', res)
  //   setLoading(false);
  //   console.log('<<res.data>>', res.data)
  // }
 

  return (
    <LinearGradient
      colors={['#2c328b', '#353a90', '#3d4395', '#50569f',
        '#858abb', '#9fa3c9', '#adb0d0', '#b9bbd6',
        '#c2c4db', '#c1c4da', '#d6d8e5', '#dadbe7']}
      style={styles.container}>
      <View style={styles.flexrow}>

        <BackArrow />
        <Text style={styles.centeredText}>{String.deshbo}</Text>
      </View>
      <View style={styles.martop} />
      <ScrollView>
        <View style={styles.flexrow1}>
          <Text style={styles.livestext}>{String.live}</Text>
          <View style={styles.paymentview}>
            <TouchableOpacity>
              <Text style={styles.paytext}>{String.payment}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {data && Array.isArray(data) && data.length > 0 ? (
          <View>
            {data.map((item, index) => (
              <View key={index}>
                <ImageBackground
                  source={icons.abc}
                  style={styles.liveviewstyle}
                  borderRadius={10}
                >
                  <View style={styles.overlay} />
                  <View style={styles.textrow}>
                    <View>
                      <Text style={styles.textssnc}>{item.company_name}</Text>
                      <View style={styles.margintop} />
                      <View style={styles.rewtext1}>
                        <Text style={styles.textssnc}>Cat :{item.category_name} </Text>
                        <Text style={styles.textssnc1}>{ }</Text>
                      </View>
                      <View style={styles.rewtext1}>
                        <Text style={styles.textssnc}>Sub-Cat : {item.subcategory_name}</Text>
                        <Text style={styles.textssnc1}> { }</Text>
                      </View>
                      <View style={styles.rewtext1}>
                        <Text style={styles.textssnc}>Created By :</Text>
                        <Text style={styles.textssnc}>Owner</Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.view2}>
                        <Text style={[styles.textssnc, styles.textssnc2]}>Start:  {moment(item.created_date).format('DD/MM/YYYY')}
                         {/* {moment(item.created_date).format('DD/MM/YYYY hh:mm A')} */}
                         </Text>
                        <Text style={[styles.textssnc, styles.textssnc2]}>End: {moment(item.end_date).format('DD/MM/YYYY')}</Text>
                      </View>
                      <View style={styles.view3}>
                        <View style={styles.flexrow2}>
                          <View>
                            <TouchableOpacity onPress={() => selectcard(1)}>
                              <View style={[styles.blueview, styles.blueview2]}>
                                <Text style={styles.Numbertext}>{item.view}</Text>
                              </View>
                            </TouchableOpacity>
                            <Text style={[styles.Numbertext, styles.Numbertext1]}>View</Text>
                          </View>

                          <View>
                            <TouchableOpacity onPress={() => selectcard(2)}>
                              <View style={[styles.blueview, styles.blueview2]}>
                                <Text style={styles.Numbertext}>{item.message}</Text>
                              </View>
                            </TouchableOpacity>
                            <Text style={[styles.Numbertext, styles.Numbertext1]}>Message</Text>
                          </View>
                          <View>
                            <TouchableOpacity onPress={() => selectcard(3)}>
                              <View style={[styles.blueview, styles.blueview2]}>
                                <Text style={styles.Numbertext}>{item.calls}</Text>
                              </View>
                            </TouchableOpacity>
                            <Text style={[styles.Numbertext, styles.Numbertext1]}>Calls</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </ImageBackground>

              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.textfounfd}>No ads added</Text>
        )}

        {loading && <ActivityIndicator size="large" color="#fff" />}
        <View style={styles.createaddvew}>
          <TouchableOpacity onPress={() => {
            //  setModalVisible(true); 
            pendingadsdata();
          }}>
            <View style={styles.row4}>
              <Text style={styles.ceattext}>{String.creaddd}</Text>

              <Image source={icons.add} style={styles.plusimg}></Image>

            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.expritext}>{String.expri}</Text>
        {data2 && Array.isArray(data2) && data2.length > 0 ? (
          <View>
            {data2.map((item2, index) => (
              <View key={index}>
                <ImageBackground
                  source={icons.abc}
                  style={styles.liveviewstyle}
                  borderRadius={10}
                >
                  <View style={styles.overlay} />
                  <View style={styles.flexrow5}>
                    <View style={styles.view7}>
                      <Text style={styles.textssnc}>{item2.company_name}</Text>
                    </View>
                    <View style={styles.view7}>
                      {/* <Text style={styles.enddate}>End: {item2.end_date}</Text> */}
                      <Text style={styles.enddatetxtx}>End:  {moment(item2.end_date).format('MM/DD/YYYY')}</Text>
                    </View>
                  </View>
                  <View style={styles.flexrow6}>
                    <View style={styles.view5}>
                      <View style={styles.rewtext1}>
                        <Text style={styles.textssnc}>Cat : </Text>
                        <Text style={styles.textssnc}>{item2.category_name}</Text>
                      </View>
                      <View style={styles.rewtext1}>
                        <Text style={styles.textssnc}>Sub-Cat : </Text>
                        <Text style={styles.textssnc}>{item2.subcategory_name}</Text>
                      </View>
                      <View style={styles.rewtext1}>
                        <Text style={styles.textssnc}>Created By :</Text>
                        <Text style={styles.textssnc}>Owner</Text>
                      </View>
                    </View>
                    <View style={styles.view6}>
                      <View>
                        <View style={styles.flexrow2}>
                          <View>
                            <TouchableOpacity>
                              <View style={[styles.blueview, styles.blueview2, styles.blueview3]}>
                                <Text style={styles.Numbertext}>{item2.view}</Text>
                              </View>
                            </TouchableOpacity>
                            <Text style={[styles.Numbertext, styles.Numbertext1]}>View</Text>
                          </View>
                          <View>
                            <TouchableOpacity>
                              <View style={[styles.blueview, styles.blueview2, styles.blueview3]}>
                                <Text style={styles.Numbertext}>{item2.message}</Text>
                              </View>
                            </TouchableOpacity>
                            <Text style={[styles.Numbertext, styles.Numbertext1]}>Message</Text>
                          </View>
                          <View>
                            <TouchableOpacity>
                              <View style={[styles.blueview, styles.blueview2, styles.blueview3]}>
                                <Text style={styles.Numbertext}>{item2.calls}</Text>
                              </View>
                            </TouchableOpacity>
                            <Text style={[styles.Numbertext, styles.Numbertext1]}>Calls</Text>
                          </View>
                        </View>
                        <TouchableOpacity onPress={() => renewads(item2.id)} >
                          <View style={styles.reventview}>
                            <Text style={styles.reviewtext}>{String.review}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                </ImageBackground>

              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.textfounfd}>No data added</Text>

        )}

        {/* <ImageBackground
          source={icons.abc}
          style={styles.liveviewstyle} borderRadius={10}
        >
          <View style={styles.overlay} />
          <View style={styles.flexrow5}>
            <View style={styles.view7}>
              <Text style={styles.textssnc}>{String.ssncarch}</Text>
            </View>
            <View style={styles.view7}>
              <Text style={styles.enddate}>End: 05/06/2024</Text>
            </View>
          </View>
          <View style={styles.flexrow6}>
            <View style={styles.view5}>
              <View style={styles.rewtext1}>
                <Text style={styles.textssnc}>Cat : </Text>
                <Text style={styles.textssnc1}>Consultants</Text>
              </View>
              <View style={styles.rewtext1}>
                <Text style={styles.textssnc}>Sub-Cat : </Text>
                <Text style={styles.textssnc1}> Architects</Text>
              </View>
              <View style={styles.rewtext1}>
                <Text style={styles.textssnc}>Created By :</Text>
                <Text style={styles.textssnc1}>Owner</Text>
              </View>
            </View>
            <View style={styles.view6}>
              <View>
                <View style={styles.flexrow2}>
                  <View>
                    <TouchableOpacity>
                      <View style={[styles.blueview, styles.blueview2, styles.blueview3]}>
                        <Text style={styles.Numbertext}>100</Text>
                      </View>
                    </TouchableOpacity>
                    <Text style={[styles.Numbertext, styles.Numbertext1]}>View</Text>
                  </View>
                  <View>
                    <TouchableOpacity>
                      <View style={[styles.blueview, styles.blueview2, styles.blueview3]}>
                        <Text style={styles.Numbertext}>70</Text>
                      </View>
                    </TouchableOpacity>
                    <Text style={[styles.Numbertext, styles.Numbertext1]}>Message</Text>
                  </View>
                  <View>
                    <TouchableOpacity>
                      <View style={[styles.blueview, styles.blueview2, styles.blueview3]}>
                        <Text style={styles.Numbertext}>60</Text>
                      </View>
                    </TouchableOpacity>
                    <Text style={[styles.Numbertext, styles.Numbertext1]}>Calls</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <View style={styles.reventview}>
                    <Text style={styles.reviewtext}>{String.review}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </ImageBackground> */}


        <Modalcomponets
          isVisible={modalVisible}
          onBackdropPress={toggleModal}
          swipeDirection={['down']}
          modalestyle={styles.modalestyle}
          // title={data3 >= 3 ? 'You can create ' + data3 + ' more ads \n on your subscription' : data3 === 0 ? 'zero' : 'No more ads. Already three ads added'}

          title={'You can create ' + data3 + ' more ads \n on your subscription'}
          textstylemodal={styles.textstylemodal}
          buttonview={styles.buttonview}
          title2style={styles.title2style}
          title2={String.next}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate("CreateyouradsBuilder");
          }}
        >
          {/* Additional content in your modal if needed */}
        </Modalcomponets>



        <View style={styles.marinbottom}></View>
      </ScrollView>
    </LinearGradient>
  )
}
export default DashboardScreen;
