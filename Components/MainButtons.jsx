import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MainButtons = () => {
  return (
    <TouchableOpacity style={styles.btn}><Text style={styles.buttons_text}>Apply To Drive</Text></TouchableOpacity>
  )
}

export default MainButtons

const styles = StyleSheet.create({
    btn:{
    width:'85%',
    height:60,
    marginBottom:25,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#0C3B2E',
    borderRadius:100,
  },
  buttons_text:{
    color:'white',
    fontSize:20,
  },
})