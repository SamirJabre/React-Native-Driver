import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import BusBox from '../../Components/BusBox'
import BusContainer from '../../Components/BusConatiner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { BASE_URL } from '@env';
import axios from 'axios';

const dashboard = () => {

  const { driverId } = useLocalSearchParams();
  const [trips, setTrips] = useState([]);


  useEffect(() => {
    axios.post(`${BASE_URL}/driver-trips` , {
      driver_id: driverId,
    })
    .then((res) => {
      console.log(res.data);
      setTrips(res.data);
    })
  },[])

  const findClosestDate = (trips) => {
    const currentDate = new Date();
  
    let closestTrip = null;
    let smallestDifference = Infinity;
  
    trips.forEach(trip => {
      const tripDate = new Date(trip.date);
      const difference = Math.abs(tripDate - currentDate);
  
      if (difference < smallestDifference) {
        smallestDifference = difference;
        closestTrip = trip;
      }
    });
  
    return closestTrip;
  };

  const closestTrip = findClosestDate(trips);
  const otherTrips = trips.filter(trip => trip.id !== closestTrip.id);


  return (
    <SafeAreaView style={styles.safearea}>
    <View style={styles.container}>
    
    <View style={styles.upComingContainer}>
    <Text style={styles.text}>Upcoming Trip</Text>

    {
      closestTrip ? 
      <BusBox from={closestTrip.from} to={closestTrip.to} time={closestTrip.departure_time} date={closestTrip.date} tripId={closestTrip.id}/>
      :
      <Text>No Upcoming Trips</Text>
    }

    </View>

    <View style={styles.otherTrips}>
    <Text style={styles.text}>Other Trips</Text>

    <ScrollView style={styles.scrollTrips} >
    {
          otherTrips.length > 0 ? 
          otherTrips.map(trip => (
            <BusContainer key={trip.id} from={trip.from} to={trip.to} time={trip.departure_time} date={trip.date} />
          ))
          :
          <Text style={{margin:'auto', marginTop:100, fontSize:20}}>No Other Trips</Text>
        }
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
    fontSize: 15,
    fontWeight: 'bold',
  },
  otherTrips:{
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollTrips:{
    marginTop: 10,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: 'gray',
  }
})