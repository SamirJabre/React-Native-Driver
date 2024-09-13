import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { BASE_URL } from '@env';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebaseConfig';


export const form = () ={

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

}