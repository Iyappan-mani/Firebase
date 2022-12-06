//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

// create a component
const App = () => {
  PushNotification.configure({
    onNotification: (notification) => {
      if (notification.id == 12) {
        Alert.alert('arrived!', JSON.stringify(notification.message));
      }
    },
  });
useEffect(()=>{
  messaging().onMessage(async (remoteMessage) => {
    console.log(remoteMessage);
  await AsyncStorage.setItem("Alrtmessagews",JSON.stringify(remoteMessage.notification))
    PushNotification.localNotification({
      id :12,
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
      bigPictureUrl: remoteMessage.notification.android.imageUrl,
      smallIcon: remoteMessage.notification.android.imageUrl,
      
    });
  });
  requestUserPermission()
  Notificationlisner()
})


const requestUserPermission=async()=>{
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFcmtoken()
  }
}
 const GetFcmtoken =async()=>{
  const token=await AsyncStorage.getItem("Fcmtoken")
   console.log(token);
  //  if(token){
     let fcmtoken =messaging().getToken()
     if(fcmtoken){
     await AsyncStorage.setItem("Fcmtoken", JSON.stringify(fcmtoken))
      console.log(fcmtoken);
    //  }
   }
 }
 const Notificationlisner=async()=>{
  messaging().onNotificationOpenedApp(remoteMessage => {
    // navigator.navigate()
    Alert.alert('arrived!', JSON.stringify(remoteMessage.notification));
  });
 
  messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      Alert.alert('arrived!', JSON.stringify(remoteMessage.notification));
    }
  });

      const val=  await AsyncStorage.getItem("Alrtmessagews")
     
        if(val !== "null" && val !== null){
          Alert.alert('arrived!',val)
          let varval = null
          await AsyncStorage.setItem("Alrtmessagews",JSON.stringify(varval))

        }
 }

  return (
    <View style={styles.container}>

      <Text style={{color:'black'}}>Firebase Notification</Text>
      
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 
  },
});

//make this component available to the app
export default App;
