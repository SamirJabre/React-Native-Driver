import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import io from 'socket.io-client';
import { router, useLocalSearchParams } from 'expo-router';
import { BASE_URL } from '@env';
import axios from 'axios';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SOCKET_SERVER_URL = 'http://192.168.1.108:6001';

const tripinfo = () => {
  const [trip_id, setTrip_id] = useState('');
  const { tripId } = useLocalSearchParams();
  const [busId, setBusId] = useState();
  const [currentLocation, setCurrentLocation] = useState('');
  const [socket, setSocket] = useState(null);
  const [tripInfo, setTripInfo] = useState('');
  const { data } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedTripId = await AsyncStorage.getItem('tripId');
        if (storedTripId) setTrip_id(parseInt(storedTripId));
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage', error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    axios.post(`${BASE_URL}/tripinfo`, {
      id: tripId
    })
    .then(res => {
      console.log(res.data);
      setTripInfo(res.data);
      setBusId(res.data.bus_id);
    });
  }, []);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!busId || !socket) return;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 10,
        },
        (location) => {
          const coords = location.coords;
          console.log(coords);
          setCurrentLocation(coords);
          console.log(coords.latitude);
          console.log('this is the longitude '+coords.longitude);

          socket.emit('updateLocation', {
            busId: busId,
            current_latitude: coords.latitude,
            current_longitude: coords.longitude,
          });
        }
      );
    })();
  }, [busId, socket]);

  return (
    <SafeAreaView style={styles.area}>
    <View style={styles.container}>

    <View style={styles.headerContainer}>
    <TouchableOpacity style={styles.backBtn} onPress={()=>{router.push('/dashboard');AsyncStorage.removeItem('tripId')}}>
      <Image source={require('../../assets/icons/back.png')} style={styles.icon}/>
    </TouchableOpacity>
    <Text style={styles.tripid}>Trip ID : #{trip_id}</Text>

    <View style={styles.unwanted}>
    </View>

    </View>


    
    <View style={styles.mapContainer}>
    
    {
      currentLocation && (
        <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >
        <Marker
        coordinate={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }}
        title="Bus"
        description="Bus location"
        />
        </MapView>
        )
    }
    </View>

    <View style={styles.tripInfo}>
    <Text style={styles.infoText}>Tripoli</Text>
    <View style={styles.line}><Image source={require('../../assets/line.png')}/></View>
    <Text style={styles.infoText}>Beirut</Text>
    </View>

    <View style={styles.timeDate}>
    <Text style={styles.timeDateText}>Date: 2024-09-16</Text>
    <Text style={styles.timeDateText}>Time: 10:00</Text>
    </View>

    <TouchableOpacity style={styles.scanQRCode} onPress={()=>router.push('/scanQR')}>
    <Text style={styles.scanQRCodeText}>Scan QR Code</Text>
    </TouchableOpacity>
    
    <View style={styles.resultContainer}>
    {
      data && (
        <Image style={{height:'100%',width:'100%'}} source={require('../../assets/belong.png')}/>
      )
    }
    </View>

    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container:{
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContainer:{
    width: '90%',
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn:{
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unwanted:{
    width: 50,
    height: 50,
  },
  icon:{
    width: '50%',
    height: '50%',
  },
  mapContainer:{
    width: '100%',
    height: '35%',
    backgroundColor: 'gray',
  },
  tripid:{
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  tripInfo:{
    width: '90%',
    height: 30,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left:{
    width: '40%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  right:{
    width: '50%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  infotext:{
    fontSize: 14,
    fontWeight: 'bold',
  },
  scanQRCode:{
    marginTop: 10,
    width: '50%',
    height: 60,
    backgroundColor: '#0C3B2E',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanQRCodeText:{
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  resultContainer:{
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 100,
  },
  infoText:{
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#0C3B2E',
  },
  line:{
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeDate:{
    width: '90%',
    height: '10%',
    justifyContent: 'space-between',
    alignItems :'flex-start',
    marginBottom: 10,
  },
  timeDateText:{
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'black',
  }
});


export default tripinfo;