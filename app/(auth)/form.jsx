import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { BASE_URL } from '@env';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebaseConfig';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import FormInput from '../../Components/FormInput';
import Upload from '../../Components/Upload';

const form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [idPhoto, setIdPhoto] = useState(null);
  const [driverLicense, setDriverLicense] = useState(null);

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
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `images/${filename}`);

    try {
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error('Error uploading image: ', error);
      alert('Failed to upload image');
    }
  };


  const handleSubmit = async () => {
    const profilePictureUrl = await uploadImage(profilePicture);
    const idPhotoUrl = await uploadImage(idPhoto);
    const driverLicenseUrl = await uploadImage(driverLicense);
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
      .then((res)=>{
        alert('Form submitted successfully')
        setName('')
        setEmail('')
        setPassword('')
        setPhoneNumber('')
        setAge('')
        setAddress('')
        setProfilePicture(null)
        setIdPhoto(null)
        setDriverLicense(null)
      })
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
    <TouchableOpacity style={styles.backBtn} onPress={()=>router.push('/')}>
      <Image source={require('../../assets/icons/back.png')} style={styles.icon}/>
    </TouchableOpacity>
    <Text style={styles.header}>Driver Application Form</Text>

    <View style={styles.unwanted}>
    </View>

    </View>
      <ScrollView>
      <FormInput label='Name' placeHolder='Enter your name...' onchange={(text) => setName(text)}/>
      <FormInput label='Email' placeHolder='Enter your email...' onchange={(text)=>setEmail(text)} type='email-address'/>
      <FormInput label='Password' placeHolder='Enter a password...' onchange={(text)=>setPassword(text)} secure={true}/>
      <FormInput label='Phone Number' placeHolder='Enter your phone number...' onchange={(text)=>setPhoneNumber(text)} type='phone-pad'/>
      <FormInput label='Age' placeHolder='Enter your age...' onchange={(text)=>setAge(text)} type='phone-pad'/>
      <FormInput label='Address' placeHolder='Enter your address...' onchange={(text)=>setAddress(text)}/>


      
      <Upload label="Upload a profile picture" onpress={() => pickImage(setProfilePicture)}/>
      <Upload label="Upload an ID Photo" onpress={() => pickImage(setIdPhoto)}/>
      <Upload label="Upload Driver License" onpress={() => pickImage(setDriverLicense)}/>

        {/* <View style={styles.uploadContainer}>
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
        </View> */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} ><Text style={styles.Txt}>Submit</Text></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default form

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F2F2',
  },
  headerContainer:{
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
  header: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
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
  submitBtn: {
    height: 50,
    width: '100%',
    backgroundColor: '#0C3B2E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  Txt:{
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  }
})