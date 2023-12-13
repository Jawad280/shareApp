import { Text, View, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../styles/global'

export default function Home({ navigation, session }) {

  // const handleLogout = () => {
  //     setIsLoggedIn(false)
  //     navigation.navigate('Login')
  // }

  console.log('Home: ',session.user.id);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Home</Text>
      <Button 
        title='Go to Profile'
        onPress={() => navigation.navigate('Account')}
      />
      <Button 
        title='Create an Item'
        onPress={() => navigation.navigate('ItemCreation')}
      />
      <Button 
        title='Feed (all items)'
        onPress={() => navigation.navigate('Feed')}
      />
    </View>
  )
}

