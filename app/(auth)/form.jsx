import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { BASE_URL } from '@env';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebaseConfig';


const form = () ={

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [idPhoto, setIdPhoto] = useState(null);
  const [driverLicense, setDriverLicense] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);


  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);


  const pickImage = async (setState) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setState(result.assets[0].uri);
    }
  };

  const uploadImage = async (image) => {
    if (!image) return;

    // Create a reference to the location where the image will be uploaded
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `images/${filename}`);

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, blob);

      // Get the downloadable URL
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error('Error uploading image: ', error);
      alert('Failed to upload image');
    }
  };

  const handleSubmit = async () => {
    // Upload images and get URLs
    const profilePictureUrl = await uploadImage(profilePicture);
    const idPhotoUrl = await uploadImage(idPhoto);
    const driverLicenseUrl = await uploadImage(driverLicense);

    // If all uploads were successful, send data to the database
    if (profilePictureUrl && idPhotoUrl && driverLicenseUrl) {
      await sendToDatabase(profilePictureUrl, idPhotoUrl, driverLicenseUrl);
    }
  };


  const sendToDatabase = async (profilePictureUrl,idPhotoUrl,driverLicenseUrl) => {
    try{
      await axios.post(`${BASE_URL}/driver-app`,{
        name: name,
        email: email,
        password: password,
        phone_number: phoneNumber,
        age: age,
        address: address,
        profile_picture: profilePictureUrl,
        id_photo: idPhotoUrl,
        driver_license: driverLicenseUrl,
      })
      .then((res)=>alert('Form submitted successfully'))
    }
    catch(error){
      console.log(error)
    }
  }

  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Driver Application Form</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={(text) => setAge(text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <View style={styles.uploadContainer}>
          <Text>Profile Picture</Text>
          <Button style={styles.btn} title="Upload" onPress={() => pickImage(setProfilePicture)} />
        </View>
        <View style={styles.uploadContainer}>
          <Text>ID Photo</Text>
          <Button title="Upload" onPress={() => pickImage(setIdPhoto)} />
        </View>
        <View style={styles.uploadContainer}>
          <Text>Driver License</Text>
          <Button title="Upload" onPress={() => pickImage(setDriverLicense)} />
        </View>
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};


export default form

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  uploadContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: 'green',
  },
})