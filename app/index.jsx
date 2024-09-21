import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { router, SplashScreen } from 'expo-router'
import { useFonts } from 'expo-font';
import MainButtons from '../Components/MainButtons'
SplashScreen.preventAutoHideAsync();
const App = () => {
  const [fontsLoaded , error] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.otf'),
    'Inter-ExtraBold': require('../assets/fonts/Inter-ExtraBold.otf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.otf'),
  });

  useEffect(()=>{
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  },[fontsLoaded, error]);


  if(!fontsLoaded && !error) return null;

  return (
    <SafeAreaView style={styles.safearea}>
        <View style={styles.imageContainer}>
          <ImageBackground style={styles.image} source={require('../assets/hero-img.png')}/>
        </View>

        <View style={styles.textContainer}>
        <Text style={styles.text1}>Apply To Bus Driver</Text>
        <Text style={styles.text2}>Enter your details to proceed further</Text>
        </View>

        <View style={styles.buttonsContainer}>
        <MainButtons text={'Apply To Drive'} onpress={()=>{router.push('/form')}}/>
        <MainButtons text={'Login'} onpress={()=>{router.push('/login')}}/>
        
        </View>


    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  safearea:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer:{
    width: '100%',
    height: '40%',
  },
  image:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer:{
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1:{
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 10,
  },
  text2:{
    fontSize: 16,
    color: 'gray',
    fontFamily: 'Inter-Regular',
  },
  buttonsContainer:{
    width: '100%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
})