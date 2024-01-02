import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { globalStyles } from '../styles/global';
import { supabase } from '../lib/supabase';
import ItemTile from '../components/ItemTile';

const MyItems = ({ session, navigation }) => {

    const userId = session.user.id;
    const [userItems, setUserItems] = useState([]);

    const getListedItems = async () => {
        try {
            const { data, error } = await supabase
            .from('items')
            .select('*')
            .eq('listed_by', session.user.id);
        
            if (error) {
              console.error(error.message)
            } else {
              console.log(data)
              setUserItems(data);
            }
        } catch (error) {
            console.error(error.message);
        }
    
    }

    const getLikedItems = async () => {
        try {
            const { data, error } = await supabase
            .from('liked_items')
            .select(`items (*)`)
            .eq('user_id', session.user.id);

            if (error) {
                console.error(error.message);
            }
            const flattenedData = data.map((item) => item.items);
            console.log(flattenedData);
            setUserItems(flattenedData);
        } catch (error) {
            console.error(error.message);
        }

    }

  return (
    <View style={globalStyles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, columnGap: 15 }} >
        <TouchableOpacity style={styles.buttonClicked} onPress={getListedItems}>
          <Text style={{ fontSize: 18, padding: 20 }}>Your Listed Items</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonClicked} onPress={getLikedItems}>
          <Text style={{ fontSize: 18, padding: 20 }}>Your Liked Items</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={userItems}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('ItemDetails', { item })}>
            <ItemTile item={item} userId={userId}/>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />


    </View>
  )
}

export default MyItems

const styles = StyleSheet.create({
    button: {
        flex: 1, 
        borderRadius: 10
    },
    buttonClicked: {
        flex: 1, 
        borderRadius: 10, 
        backgroundColor: 'lightgray'
    }
})