import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import BusBox from '../../Components/BusBox'

const dashboard = () => {
  return (
    <SafeAreaView style={styles.safearea}>
    <View style={styles.container}>
    
    <View style={styles.upComingContainer}>
    <Text style={styles.text}>Upcoming Trip</Text>

    <BusBox/>

    </View>

    <View style={styles.otherTrips}>
    <Text style={styles.text}>Other Trips</Text>

    <ScrollView style={styles.scrollTrips}>
    
    </ScrollView>

    </View>

    </View>
    </SafeAreaView>
  )
}

export default dashboard

const styles = StyleSheet.create({
  safearea:{
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container:{
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  upComingContainer:{
    width: '100%',
    height: '30%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  otherTrips:{
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollTrips:{
    backgroundColor: 'blue',
  }
})