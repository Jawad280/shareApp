import { StyleSheet, Button, View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'

const BottomNavigator = ({ navigation, session }) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.navigate('Feed')} style={styles.button}>
        <AntDesign name='home' size={28} color={'navy'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('AllChats')} style={styles.button}>
        <AntDesign name='message1' size={28} color={'navy'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ItemCreation')} style={styles.button}>
        <AntDesign name='pluscircleo' size={28} color={'navy'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('MyItems')} style={styles.button}>
        <AntDesign name='appstore-o' size={28} color={'navy'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.button}>
        <AntDesign name='user' size={28} color={'navy'} />
      </TouchableOpacity>
    </View>
  )
}

export default BottomNavigator

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'gray',
        alignSelf: 'flex-end'
    },
    button: {
        backgroundColor: 'white',
        padding: 20,
        flex: 1,
        alignItems: 'center'
    }
})