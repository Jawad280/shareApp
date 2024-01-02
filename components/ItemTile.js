import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

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

  return (
    <View style={styles.container}>

      <Image 
        source={{uri: 'https://picsum.photos/200/300'}}
        width={145}
        height={145}
        contentFit='cover'
        placeholder={'Image here'}
        style={styles.image}
      />

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>{item.name}</Text>
          <Text>{username}</Text>
        </View>
        
        <TouchableOpacity style={styles.likeContainer} onPress={handleLike}>
          <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={28} color={'pink'} />
          <Text style={{fontWeight: 'bold', fontSize: 12, alignItems: 'center', justifyContent: 'center', marginTop: 5}}>{item.num_likes}</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    // container: {
    //   borderRadius: 10,
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   alignItems: 'center',
    //   padding: 20,
    //   margin: 15,
    //   backgroundColor: 'white',
    //   shadowColor: 'black',
    //   shadowRadius: 20
    // },
    textContainer: {
      flex: 1
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    likeContainer: {
      alignItems: 'center'
    },
    image: {
      borderRadius: 10,
      shadowOffset: 1,
      shadowOpacity: 0.1
    },
    container: {
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowRadius: 20,
      width: '100%',
      rowGap: 10
    }
})