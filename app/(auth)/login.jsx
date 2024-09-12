import { StyleSheet, Text, View , ImageBackground , SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import BackButton from '../../Components/BackButton';
import Input from '../../Components/Input';
import { StatusBar } from 'expo-status-bar';
import MainButtons from '../../Components/MainButtons';
import { BASE_URL } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

const login = () => {


  const [form,setForm] = useState({
    email:'',
    password:''
  });

  const login = async () => {
    await axios.post(`${BASE_URL}/driver-login`,form)
    .then((res) => {
      alert('login successfully');
      router.replace('/dashboard');
    })
  }


  return (
    <View style={styles.container}>

    <View style={styles.imageContainer}>
    <ImageBackground source={require('../../assets/hero-img.png')} style={styles.img}/>
    </View>
    
    <View style={styles.inputContainer}>
    <Input value={form.email} placeholder={"Email"} onchange={(e)=>setForm({...form, email: e})} imageSource={require('../../assets/icons/email.png')} keyboardType="mail-address"/>
    <Input value={form.password} placeholder={"Password"} onchange={(e)=>setForm({...form, password: e})} imageSource={require('../../assets/icons/password.png')}/>
    </View>

    <MainButtons text={"Login"} onpress={login}/>

    <StatusBar  style='dark'/>
    </View>
  )
}

export default login

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
    paddingTop: StatusBar.currentHeight,
  },
  imageContainer:{
    height:'40%',
    width:'100%',
  },
  img:{
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  inputContainer:{
    width: '100%',
    height: '30%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
  },
})