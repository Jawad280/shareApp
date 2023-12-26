import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../styles/global'
import { supabase } from '../lib/supabase'
import ItemTile from '../components/ItemTile';
import BottomNavigator from '../components/BottomNavigator';

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
          const filteredData = data.filter((item) => item.is_published && item.is_available)
          console.log(filteredData)
          setAllItems(filteredData)
        }
    }


  return (
    <View style={globalStyles.container}>
      <FlatList 
        data={allItems}
        keyExtractor={(items) => items.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('ItemDetails', { item })}>
              <ItemTile item={item} userId={userId} onLike={setLikedItem} navigation={navigation}/>
          </TouchableOpacity>
        )}
      />
      <BottomNavigator navigation={navigation}/>
    </View>
  )
}
