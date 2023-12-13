import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../styles/global'
import { supabase } from '../lib/supabase'
import ItemTile from '../components/ItemTile';

export default function Feed({ navigation, session }) {

    const [allItems, setAllItems] = useState([]);
    const userId = session.user.id;
    const [likedItem, setLikedItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, [likedItem])

    const fetchItems = async () => {
        const { data, error } = await supabase.from('items').select('*');

        if (error) {
            console.error(error.message)
        } else {
            setAllItems(data);
        }
    }


  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.formHeader}>Main Feed</Text>
      <FlatList 
        data={allItems}
        keyExtractor={(items) => items.id}
        renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('ItemDetails', { item })}>
                <ItemTile item={item} userId={userId} onLike={setLikedItem}/>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}
