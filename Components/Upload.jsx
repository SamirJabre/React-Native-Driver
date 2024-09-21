import { Image, StyleSheet, Text, Touchable, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const Upload = ({label,onpress}) => {
  return (
    <TouchableOpacity style={styles.uploadContainer} onPress={onpress}>
        <View style={styles.container}>
        <View style={styles.imageContainer}><Image source={require('../assets/icons/cloud.png')} style={{height:'100%',width:'100%'}}/></View>
        </View>
        <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  )
}

export default Upload

const styles = StyleSheet.create({
    uploadContainer:{
        height: 150,
        width:'60%',
        borderRadius: 20,
        marginBottom: 20,
        borderColor: '#0C3B2E',
        alignSelf: 'center',
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container:{
        height: 60,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer:{
        height: 40,
        width: '25%',
    },
    text:{
        fontSize: 14,
        color: '#0C3B2E',
        fontFamily: 'Inter-SemiBold',
    },
})