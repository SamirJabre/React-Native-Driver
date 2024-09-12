import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const App = () => {
  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>router.push('/login')}><Text>App</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  safearea:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})