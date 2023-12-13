import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import React from 'react'
import { supabase } from '../lib/supabase'

export default function ItemTile({ item, userId, onLike }) {

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
      <View style={styles.textContainer}>
        <Text style={styles.header}>{item.name}</Text>
        <Text>{item.listed_by}</Text>
      </View>
      <TouchableOpacity style={styles.likeContainer} onPress={handleLike}>
        <AntDesign name='hearto' size={28} color={'pink'} />
        <Text style={{fontWeight: 'bold', fontSize: 12, alignItems: 'center', justifyContent: 'center', marginTop: 5}}>{item.num_likes}</Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        marginVertical: 15
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