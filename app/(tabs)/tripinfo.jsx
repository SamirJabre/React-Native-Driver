import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import { router, useLocalSearchParams } from 'expo-router';
import { BASE_URL } from '@env';
import axios from 'axios';
import * as Location from 'expo-location';
// import MapView, { Marker } from 'react-native-maps';

// Socket.IO server URL
const SOCKET_SERVER_URL = 'http://192.168.1.108:6001';

const tripinfo = () => {
  const { tripId } = useLocalSearchParams();
  const [busId, setBusId] = useState();
  const [currentLocation, setCurrentLocation] = useState('');
  const [socket, setSocket] = useState(null);
  const [tripInfo, setTripInfo] = useState('');
  const { data } = useLocalSearchParams();

  // Fetch bus ID based on trip ID
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

  // Initialize Socket.IO client
  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  // Watch position and emit location data
  useEffect(() => {
    if (!busId || !socket) return;

    // Request location permissions
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // Watch position
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

          // Emit location data to the server
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
    <SafeAreaView style={style.area}>
    <View style={style.container}>

    <Text style={style.tripid}>Trip ID : #{tripId}</Text>
    
    <View style={style.mapContainer}>
    
    {/* {
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
    } */}
    </View>

    <View style={style.tripInfo}>
    <View style={style.left}>
      <Text style={style.infotext}>From : {tripInfo.from}</Text>
      <Text style={style.infotext}>To : {tripInfo.to}</Text>
    </View>

    <View style={style.right}>
      <Text style={style.infotext}>Passengers # : {tripInfo.passenger_load}</Text>
      <Text style={style.infotext}>Arrival Time : {tripInfo.arrival_time}</Text></View>
    </View>

    <TouchableOpacity style={style.scanQRCode} onPress={()=>router.push('/scanQR')}>
    <Text style={style.scanQRCodeText}>Scan QR Code</Text>
    </TouchableOpacity>
    
    <View style={style.resultContainer}>
    {
      data && (
        <Text>{data}</Text>
      )
    }
    </View>

    </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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
  mapContainer:{
    width: '80%',
    height: '35%',
    backgroundColor: 'red',
    marginTop: '10%',
    borderRadius: 10,
  },
  tripid:{
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  tripInfo:{
    width: '80%',
    height: '20%',
    backgroundColor: 'gray',
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
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
    height: '10%',
    backgroundColor: '#0C3B2E',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanQRCodeText:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer:{
    width: '80%',
    height: '20%',
    backgroundColor: 'gray',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'flex-start',
  },
});


export default tripinfo;