import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/global';
import BottomNavigator from '../components/BottomNavigator';
import { supabase } from '../lib/supabase';

export default function ItemDetails({ navigation, session, route }) {
    const { item } = route.params;
    const userId = session.user.id;

    const handlePublish = async () => {
      try {

        const { error } = await supabase.from('items').update({ is_published: true }).eq('id', item.id);
        
        if (error) {
          console.log(error.message);
        }

      } catch (error) {
        Alert(error.message);
      }
    }

    const handleDelete = async () => {
      console.log('delete item');
    } 

  return (
    <View style={globalStyles.container}>
      <View>
        <Text style={globalStyles.titleText}>Likes : {item.num_likes}</Text>
        <Text style={globalStyles.titleText}>Status : {item.is_available ? 'Available' : 'Not Available'}</Text>
        <Text style={globalStyles.titleText}>Published : {item.is_published ? 'Yes' : 'No'}</Text>

        {
          userId == item.listed_by ? (
            <>
              <TouchableOpacity onPress={handlePublish}>
                <Text style={globalStyles.titleText}>Publish Item</Text>
              </TouchableOpacity>
    
              <TouchableOpacity onPress={handleDelete}> 
                <Text style={globalStyles.titleText}>Delete Item</Text>
              </TouchableOpacity>
            </>
          ) : (
            <></>
          )
        }

      </View>

      <BottomNavigator navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})