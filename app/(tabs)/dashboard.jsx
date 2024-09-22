import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import BusBox from '../../Components/BusBox'
import BusContainer from '../../Components/BusConatiner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { BASE_URL } from '@env';
import axios from 'axios';
import { Image } from 'react-native';

const dashboard = () => {
  const [driver_id, setDriver_id] = useState('');
  const [driver_name, setDriver_name] = useState('');
  const [signInTime, setSignInTime] = useState('');
  const { driverId , driverName } = useLocalSearchParams();
  const [trips, setTrips] = useState([]);
  const [focused, setFocused] = useState('all');
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedDriverId = await AsyncStorage.getItem('driverId');
        if (storedDriverId) setDriver_id(parseInt(storedDriverId));
        const storedDriverName = await AsyncStorage.getItem('driverName');
        if (storedDriverName) setDriver_name(storedDriverName);
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage', error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    const now = new Date();
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = now.toLocaleString('en-US', options);
    setSignInTime(formattedTime);
  }, []);



  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayName}\n${monthName} ${day}, ${year}`;
  };

  useEffect(() => {
    axios.post(`${BASE_URL}/driver-trips` , {
      driver_id: driver_id,
    })
    .then((res) => {
      setTrips(res.data);
    })
  },[driver_id])

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
  const date = new Date();


  return (
    <SafeAreaView style={styles.safearea}>

    <View style={styles.upperPart}>
      <View style={styles.top}>
        <View><Text style={styles.date}>{formatDate(date)}</Text></View>
        <TouchableOpacity style={styles.logoutBtn} onPress={()=>router.replace('/')}><Image style={styles.img} source={require('../../assets/icons/logout.png')}/></TouchableOpacity>
      </View>

      <View style={styles.driverCard}>
      <View style={styles.topCard}>

      <View style={styles.personalInfoContainer}>

        <View style={styles.profilePicture}></View>

        <View style={styles.personalInfo}>
          <Text style={styles.driverName}>{driver_name}</Text>
          <Text style={styles.driverId}>#{driver_id}</Text>
        </View>

      </View>

      <View style={styles.onlineContainer}>
        <Text style={styles.online}>ONLINE</Text>
      </View>
      
      </View>

      <View style={styles.bottomCard}>
        <Text style={styles.loggedFrom}>Logged from </Text>
        <Text style={styles.time}>{signInTime}</Text>
      </View>
      </View>
    </View>


    <View style={styles.lowerPart}>
    <View style={{width:'90%',marginTop:15}}><Text style={styles.tripsText}>My Trips</Text></View>

    <View style={{width:'90%',marginTop:15,marginBottom:10 ,flexDirection:'row'}}>
    <TouchableOpacity style={focused === 'all' ? styles.focusedTO : styles.unfocusedTO} onPress={()=>setFocused('all')}><Text style={styles.filterText}>All Trips</Text></TouchableOpacity>
    <TouchableOpacity style={focused === 'upcoming' ? styles.focusedTO : styles.unfocusedTO} onPress={()=>setFocused('upcoming')}><Text style={styles.filterText}>Upcoming Trip</Text></TouchableOpacity>
    </View>

    <ScrollView style={{width:'100%',height:'100%'}}>
    {
      focused === 'all' ? trips.map((trip) => <BusBox key={trip.id} from={trip.from} to={trip.to} time={trip.departure_time} date={trip.date} tripId={trip.id} arrivalTime={trip.arrival_time}/>) : otherTrips.map((trip) => <BusBox key={trip.id} from={trip.from} to={trip.to} time={trip.departure_time} date={trip.date} tripId={trip.id} arrivalTime={trip.arrival_time}/>)
    }
    </ScrollView>

    </View>

    
    </SafeAreaView>
  )
}

export default dashboard

const styles = StyleSheet.create({
  safearea:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0C3B2E',
  },
  upperPart:{
    width: '100%',
    height: '40%',
    alignItems: 'center',
  },
  top:{
    width: '90%',
    height: '20%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutBtn:{
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img:{
    height: '100%',
    width: '100%',
  },
  date:{
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  driverCard:{
    width: '90%',
    height: '50%',
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  topCard:{
    width: '100%',
    height: '60%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  personalInfoContainer:{
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profilePicture:{
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'black',
    marginRight: 10,
  },
  driverName:{
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#0C3B2E',
  },
  driverId:{
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'gray',
  },
  onlineContainer:{
    width: 70,
    height: 20,
    borderRadius: 100,
    backgroundColor: '#E1ECE3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  online:{
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#59CE6A',
  },
  bottomCard:{
    flexDirection: 'row',
    width: '100%',
    height: '40%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'rgba(153, 153, 153, 0.5)',
    background: 'linear-gradient(180deg, rgba(153, 153, 153, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)',
    paddingLeft: 15,
    alignItems: 'center',
  },
  loggedFrom:{
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'white',
  },
  time:{
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  lowerPart:{
    alignItems: 'center',
    width: '100%',
    height: '60%',
    backgroundColor: '#D9D9D9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tripsText:{
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#0C3B2E',
  },
  focusedTO:{
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#0C3B2E',
  },
  unfocusedTO:{
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 100,
  },
  filterText:{
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#0C3B2E',
  },
})