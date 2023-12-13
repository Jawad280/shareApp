import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/global';

export default function ItemDetails({ navigation, session, route }) {
    const { item } = route.params;

  return (
    <View style={globalStyles.container}>
        <View style={styles.top}>
            <Text style={globalStyles.titleText}>{item.name}</Text>
            <Text style={globalStyles.titleText}>{item.num_likes}</Text>
        </View>

      <Text style={globalStyles.titleText}>Available : {item.is_available ? 'Yes' : 'No'}</Text>
      <Text style={globalStyles.titleText}>Published : {item.is_published ? 'Yes' : 'No'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})