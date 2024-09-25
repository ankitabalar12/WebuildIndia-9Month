import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import { setTopLevelNavigation } from './NavigationHelper';
import LoginScreen from '../../screens/Login/LoginScreen';
import RegisterScreen from '../../screens/Register/RegisterScreen';
import OtpScreen from '../../screens/Otp/OtpScreen';
import GetStartedScreen from '../../screens/GetStarted/GetStartedScreen';
import Forgotpassword from '../../screens/Forgotpassword/Forgotpassword';
import NewpassworScreen from '../../screens/NewPassword/NewpassworScreen';
import HomeScreen from '../../screens/Home/HomeScreen';
import PasswordChangScreen from '../../screens/PasswordChanges/PasswordChangScreen';
import ListScreen from '../../screens/List/ListScreen';
import LocalityScreen from '../../screens/View/LocalityScreen';
import DetailsScreen from '../../screens/Details/DetailsScreen';
import DashboardScreen from '../../screens/Dashboard/DashboardScreen';
import SubscriptionScreen from '../../screens/Subscription/SubscriptionScreen';
import CreateaddScreen from '../../screens/CreateAdd/CreateaddScreen';
// import ImagesaddScreen from '../../screens/ImagesAdd/ImagesaddScreen';
import ThreeViewScreen from '../../screens/ThreeView/ThreeViewScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import BusinessScreen from '../../screens/Business/BusinessScreen';
import AddclientScreen from '../../screens/AddClient/AddclientScreen';
import ImagesScreen from '../../screens/Imges/ImagesScreen';
import ClientsProfiles from '../../screens/ClientProfiles/ClientProfileScreen';
// import ClientProfileScreen from '../../screens/ClientProfileScreen/ClientScreen';
import CreateCompDetails from '../../screens/CreateCompDetails/CreateCompDetails';
// import ClientPro from '../../screens/Client/ClientPro';
import CreateyouradsBuilder from '../../screens/CreateyouradsBuss/CreateyouradsBuilder';


import WebviewScreen from '../../screens/WebView/WebviewScreen';
import Splash from '../../screens/Splash/Splash';
import OnBorardScreen from '../../screens/OnBoard/OnBorardScreen';
import PushNotification from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';
import { AppRegistry } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyBToU4YQnocrwDxUvAahafDPAorOStuNgA",
  authDomain: "webuildindaia.firebaseapp.com",
  projectId: "webuildindaia",
  storageBucket: "com.Webuildindaia",
  messagingSenderId: "352450014473",
  appId: "1:352450014473:android:e4e090a902d204f743b7d8",
  measurementId: "G-7LS1L9VF19"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCS9pSJhnMdUZIPtFFnlFhUUGam8A0GvTM",
//   authDomain: "webuildindaia.firebaseapp.com",
//   projectId: "webuildindaia",
//   storageBucket: "webuildindaia.appspot.com",
//   messagingSenderId: "352450014473",
//   appId: "1:352450014473:web:3c908fb3a18878b343b7d8",
//   measurementId: "G-7LS1L9VF19"
// };
 if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

PushNotification.configure({
  smallIcon: "ic_stat_assessment",
})
PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:=======================', token);
    global.tokenId = token;

    global.token = global.tokenId.token;

    // alert(global.token);
    // console.log('TOKEN:========================', );
  },
});
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => PushNotification);

const stack = createStackNavigator()
global.url = 'https://www.app.webuildindia.in/admin/public/api/'
// use to img
// https://www.app.webuildindia.in/admin/public/







export default function MainNavigation() {
  return (
   
      <NavigationContainer>
        <stack.Navigator initialRouteName='Splash'>
          <stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="OnBorardScreen" component={OnBorardScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="GetStartedScreen" component={GetStartedScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="Forgotpassword" component={Forgotpassword} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="NewpassworScreen" component={NewpassworScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="PasswScreen" component={PasswordChangScreen} options={{ headerShown: false }}></stack.Screen> 
          <stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="ListScreen" component={ListScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="LocalityScreen" component={LocalityScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="DashboardScreen" component={DashboardScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="CreateaddScreen" component={CreateaddScreen} options={{ headerShown: false }}></stack.Screen>
          {/* <stack.Screen name="ImagesaddScreen" component={ImagesaddScreen} options={{ headerShown: false }}></stack.Screen> */}
          <stack.Screen name="ThreeViewScreen" component={ThreeViewScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="BusinessScreen" component={BusinessScreen} options={{ headerShown: false }}></stack.Screen>
          {/* <stack.Screen name="ClientProfileScreen" component={ClientProfileScreen} options={{ headerShown: false }}></stack.Screen> */}
          <stack.Screen name="AddclientScreen" component={AddclientScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="ImagesScreen" component={ImagesScreen} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="ClientsProfiles" component={ClientsProfiles} options={{ headerShown: false }}></stack.Screen>
          <stack.Screen name="CreateCompDetails" component={CreateCompDetails} options={{ headerShown: false }}></stack.Screen>
          {/* <stack.Screen name="ClientPro" component={ClientPro} options={{ headerShown: false }}></stack.Screen> */}
          <stack.Screen name="CreateyouradsBuilder" component={CreateyouradsBuilder} options={{ headerShown: false }}></stack.Screen>
         <stack.Screen name="WebviewScreen" component={WebviewScreen} options={{ headerShown: false }}></stack.Screen>
         
        </stack.Navigator>
      </NavigationContainer>
  );
};
