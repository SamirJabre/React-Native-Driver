import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native'
import React from 'react'

const BackButton = ({onpress}) => {
  return (
    <TouchableOpacity 
    onPress={onpress}
    activeOpacity={0.7}>
    <View style={styles.container}>
      <Image style={styles.icon} source={require('../assets/icons/back.png')}/>
      <Text style={styles.txt}>Back</Text>
    </View>
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
    container:{
        margin:40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon:{
        height: 30,
        width: 30,
    },
    txt:{
        fontSize: 20,
        fontFamily: 'Inter-SemiBold',
    },
})