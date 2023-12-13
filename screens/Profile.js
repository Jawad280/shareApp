import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function Profile({ navigation }) {
  return (
    <View>
      <Text>Profile</Text>
      <Button 
        title='Home'
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}

const styles = StyleSheet.create({})