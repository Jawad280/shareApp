import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ItemTile({ item, userId, onLike, navigation }) {

  const [username, setUsername] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.from('users').select('*').eq('id', item.listed_by);
  
      if (error) {
        console.error(error.message);
      }

      setUsername(data[0].username);
    }

    const checkLiked = async () => {
      const { data, error } = await supabase.from('liked_items').select().eq('user_id', userId).eq('item_id', item.id);
  
      if (error) {
        console.error(error.message);
      }

      if (data[0]) {
        setIsLiked(true);
      } else {
        console.log('item isnt liked by user');
      }
  
    }

    fetchUser();
    checkLiked();
  }, []);

  const handleLike = async () => {
    console.log('Trigger like')
    const { error } = await supabase.rpc('handle_user_likes_item', {
        userid: userId,
        itemid: item.id
    });

    if (error) {
        console.error(error.message);
    } else {
        console.log('Liked/Unliked by user:', userId);
        onLike(item.id)
    }
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
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{item.name}</Text>
        <Text>{username}</Text>
      </View>
      <TouchableOpacity style={styles.likeContainer} onPress={handleLike}>
        <AntDesign name={isLiked ? 'heart' : 'hearto'} size={28} color={'pink'} />
        <Text style={{fontWeight: 'bold', fontSize: 12, alignItems: 'center', justifyContent: 'center', marginTop: 5}}>{item.num_likes}</Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      margin: 15,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowRadius: 20
    },
    textContainer: {
      flex: 1
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    likeContainer: {
      alignItems: 'center'
    }
})