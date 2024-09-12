import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const BusBox = ({from , to , time , date ,tripId}) => {
  return (
    <TouchableOpacity style={styles.tripContainer} onPress={()=>{router.push(`/tripinfo?tripId=${tripId}`)}}>

      <View style={styles.left}>
        <Text style={styles.infotext}>From: {from}</Text>
        <Text style={styles.infotext}>To: {to}</Text>
      </View>

      <View style={styles.right}>
      <Text style={styles.infotext}>Time: {time}</Text>
      <Text style={styles.infotext}>Date: {date}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default BusBox

const styles = StyleSheet.create({
    tripContainer:{
    width: '80%',
    height: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    margin:10,
  },
  left:{
    width: '45%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  right:{
    width: '45%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  infotext:{
    fontSize: 15,
    fontWeight: 'bold',
  },
})