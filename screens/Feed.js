import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../styles/global'
import { supabase } from '../lib/supabase'
import ItemTile from '../components/ItemTile';
import { useFocusEffect } from '@react-navigation/native';

export default function Feed({ navigation, session }) {

    const [allItems, setAllItems] = useState([]);
    const userId = session.user.id;
    const [likedItem, setLikedItem] = useState(null);

    useFocusEffect(
      React.useCallback(() => {
        fetchItems();
      }, [likedItem]) 
    );

    const fetchItems = async () => {
        const { data, error } = await supabase.from('items').select('*');

        if (error) {
          console.error(error.message)
        } else {
          const filteredData = data.filter((item) => item.is_available)
          console.log(filteredData)
          setAllItems(filteredData)
        }
    }


  return (
    <View style={globalStyles.container}>
      <View style={{alignItems: 'center', padding: 5}}>
        <FlatList 
          data={allItems}
          keyExtractor={(items) => items.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('ItemDetails', { item })} style={{padding: 10, width: '50%', height: 'auto', alignItems: 'center'}}>
              <ItemTile item={item} userId={userId} onLike={setLikedItem} navigation={navigation}/>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>
    </View>
  )
}
