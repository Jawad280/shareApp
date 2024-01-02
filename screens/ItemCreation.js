import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../styles/global';
import { supabase } from '../lib/supabase';

export default function ItemCreation({ navigation, session }) {

  const [name, setName] = useState('');

  const handleCreateItem = async () => {
    const newItem = {
      name: name,
      listed_by: session.user.id
    }

    const { data, error } = await supabase
    .from('items')
    .insert(newItem)
    .select()

    if (error) {
      console.error(error.message)
    } else {
      console.log('Item has been created successfully !', data);
    }
  }

  console.log('ItemCreation: ',session.user.id);

  return (
    <View style={globalStyles.container}> 
      
      <View style={styles.container}>
        
        <View style={{rowGap: 10, width: '100%'}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'grey' }}>Name</Text>
          <TextInput value={name} style={styles.textInput} onChangeText={(t) => setName(t)}/>
        </View>

        <TouchableOpacity onPress={handleCreateItem} style={styles.button}>
          <Text style={{color: 'white'}}>Create Listing !</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    rowGap: 15
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    borderColor: 'grey',
    fontSize: 18
  },
  button: {
    padding: 20,
    backgroundColor: 'green',
    borderRadius: 8
  }
})