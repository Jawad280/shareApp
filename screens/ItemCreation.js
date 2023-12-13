import { StyleSheet, Text, View,FlatList, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { globalStyles } from '../styles/global';
import { Button, Input } from 'react-native-elements';
import { supabase } from '../lib/supabase';
import ItemTile from '../components/ItemTile';

export default function ItemCreation({ navigation, session }) {

  const [name, setName] = useState('');
  const [listedItems, setListedItems] = useState([]);

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

  const getListedItems = async () => {
    const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('listed_by', session.user.id);

    if (error) {
      console.error(error.message)
    } else {
      console.log(data)
      setListedItems(data);
    }

  }

  console.log('ItemCreation: ',session.user.id);

  return (
    <View style={globalStyles.container}> 
      <View style={globalStyles.formHeader}>
        <Input label="Name of item" value={name} style={globalStyles.textInput} onChangeText={(t) => setName(t)}/>
      </View>
      <Button 
        title={'Create item !'}
        onPress={handleCreateItem}
      />
      <View>
        <Text>All your listed items : </Text>
        <Button 
          title={'View Your items'}
          onPress={getListedItems}
        />        
        <FlatList 
          data={listedItems}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('ItemDetails', { item })}>
              <ItemTile item={item}/>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  )
}
