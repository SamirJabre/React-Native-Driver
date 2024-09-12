import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BusContainer = ({from , to , time , date }) => {
  return (
    <View style={styles.tripContainer}>

      <View style={styles.left}>
        <Text style={styles.infotext}>From: {from}</Text>
        <Text style={styles.infotext}>To: {to}</Text>
      </View>

      <View style={styles.right}>
      <Text style={styles.infotext}>Time: {time}</Text>
      <Text style={styles.infotext}>Date: {date}</Text>
      </View>
    </View>
  )
}

export default BusContainer

const styles = StyleSheet.create({
    tripContainer:{
    width: '90%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    margin:'auto',
    marginTop: 10,
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