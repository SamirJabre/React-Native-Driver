import { StyleSheet, Text, View ,TextInput , Image} from 'react-native'
import React,{useState} from 'react'

const input = ({placeholder , value , onchange , imageSource , showPassword}) => {


  return (

    <View style={styles.inputcontainer}>
    <Image source={imageSource} style={styles.icon}/>
    <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={onchange} secureTextEntry={placeholder === 'Password' && !showPassword} underlineColorAndroid="transparent">
    </TextInput>
    </View>



    
  )
}

export default input

const styles = StyleSheet.create({
  inputcontainer: {
    flexDirection: 'row',
    height: 60,
    width: '85%',
    borderColor: 'gray',
    borderWidth: 0.8,
    borderRadius: 10,
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  input: {
    height: '100%',
    width:'86%',
    marginBottom: 15,
    padding: 10,
    color: 'grey',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  icon:{
    width: 30,
    height: 30,
    margin:'auto',
  },
})