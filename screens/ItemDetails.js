import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/global';
import BottomNavigator from '../components/BottomNavigator';
import { supabase } from '../lib/supabase';
import { Image } from 'expo-image';

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

    const handleChat = async () => {
      console.log('Check if a chat already exists between these 2 users');
      console.log('currentUser: ', userId);
      console.log('owner: ', item.listed_by);
      console.log('item: ', item.id);
      
      try {
        const { data, error } = await supabase
        .from('chatroom')
        .select('id')
        .eq('buyer_id', userId)
        .eq('owner_id', item.listed_by)
        .eq('item_id', item.id)
  
        if (error) {
          throw error;
        }
        
        if (data.length != 0) {
          console.log('there exists a chatroom : ', data);
  
          const chatroom_id = data[0].id;
  
          console.log(chatroom_id);
  
          navigation.navigate('Chatroom', {chatroom_id});
        } else {
          console.log('There is no chatroom between these 2 users, so we create a new chatroom');
          
          const newChatroom = {
            owner_id: item.listed_by,
            buyer_id: userId,
            item_id: item.id
          };
  
          const { data, error } = await supabase
          .from('chatroom')
          .insert(newChatroom)
          .select()
  
          if (error) {
            console.error(error.message);
          } else {
            console.log('Chatroom has been created', data);
            console.log('Now routing to the chatroom');
  
            const chatroom_id = data[0].id;
            console.log(chatroom_id);
  
            navigation.navigate('Chatroom', {chatroom_id});
          }
          
        }        
      } catch (error) {
        Alert.alert(error.message);
      }
  
  
  
    }

  return (
    <View style={globalStyles.container}>
      <View style={{ rowGap: 15, margin: 15 }}>
        
        <Image 
          source={{uri: 'https://picsum.photos/200/300'}}
          width={600}
          height={600}
          contentFit='cover'
          placeholder={'Image here'}
          style={styles.image}
        />
        
        <View style={styles.container}>
          <Text style={globalStyles.titleText}>Likes : {item.num_likes}</Text>
          <Text style={globalStyles.titleText}>Status : {item.is_available ? 'Available' : 'Not Available'}</Text>
          <Text style={globalStyles.titleText}>Published : {item.is_published ? 'Yes' : 'No'}</Text>
        </View>

        {
          userId == item.listed_by ? (
            <View style={styles.container}>
              <TouchableOpacity onPress={handlePublish} style={styles.button}>
                <Text style={globalStyles.titleText}>Publish Item</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text style={globalStyles.titleText}>Edit Item</Text>
              </TouchableOpacity>
    
              <TouchableOpacity onPress={handleDelete} style={styles.delete}> 
                <Text style={globalStyles.titleText}>Delete Item</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.container}>
              <TouchableOpacity style={styles.button} onPress={handleChat}>
                <Text style={globalStyles.titleText}>Chat to Owner</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>

      <BottomNavigator navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'lightgray',
    padding: 20,
    shadowOffset: 1,
    shadowOpacity: 0.1
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  delete: {
    backgroundColor: 'pink',
    padding: 15,
    borderRadius: 10
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    shadowOffset: 1,
    shadowOpacity: 0.1
  }
})