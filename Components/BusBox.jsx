import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const BusBox = () => {
  return (
    <TouchableOpacity style={styles.tripContainer}>

      <View style={styles.left}>
        <Text style={styles.infotext}>From:</Text>
        <Text style={styles.infotext}>To:</Text>
      </View>

      <View style={styles.right}>
      <Text style={styles.infotext}>Time:</Text>
      <Text style={styles.infotext}>Date:</Text>
      </View>
    </TouchableOpacity>
  )
}

export default BusBox

const styles = StyleSheet.create({
    tripContainer:{
    width: '70%',
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