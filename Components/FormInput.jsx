import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const FormInput = ({label,placeHolder,onchange,type,secure}) => {
  return (
    <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} placeholder={placeHolder} onChangeText={onchange} keyboardType={type} secureTextEntry={secure}/>
    </View>
  )
}

export default FormInput

const styles = StyleSheet.create({
    inputContainer:{
        height: 70,
        widt:'100%',
        borderRadius: 10,
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    label:{
        fontSize: 16,
        color: '#0C3B2E',
        fontFamily: 'Inter-SemiBold',
    },
    input: {
        height: 40,
        borderColor: '#0C3B2E',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontFamily: 'Inter-Regular',
  },
})