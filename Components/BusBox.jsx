import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BusBox = ({from , to , time , date ,tripId ,arrivalTime}) => {
  
  return (
    <TouchableOpacity style={styles.tripContainer} onPress={()=>{router.push(`/tripinfo?tripId=${tripId}`); AsyncStorage.setItem('tripId', tripId.toString())}}>

      <View style={styles.left}>
      <Image style={{height:'100%',width:'100%',resizeMode:'contain'}} source={require('../assets/fromTo.png')}/>
      </View>

      <View style={styles.middle}>
      <Text style={styles.tripInfo}>{from}</Text>
      <View style={styles.arrivalTimeContainer}>
        <Text style={styles.arrivalText}>Arrival Time: {arrivalTime} EST</Text>
      </View>
      <Text style={styles.tripInfo}>{to}</Text>
      </View>

      <View style={styles.right}>
      <Text style={styles.arrivalText}>Date: {date}</Text>
      <Text style={styles.arrivalText}>Time: {time}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default BusBox

const styles = StyleSheet.create({
    tripContainer:{
    width: '90%',
    height: 120,
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: 'white',
    marginVertical:10,
    marginHorizontal:'auto',
    alignItems:'center',
  },
  left:{
    width: '15%',
    height: '100%',
    paddingVertical: 10,
  },
  middle:{
    width: '50%',
    height: '85%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  arrivalTimeContainer:{
    width: '100%',
    height: '25%',
    backgroundColor: '#CACACA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  tripInfo:{
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#0C3B2E',
  },
  arrivalText:{
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: 'black',
  },
  right:{
    width: '35%',
    height: '75%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
})