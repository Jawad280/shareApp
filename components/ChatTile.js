import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase';

const ChatTile = ({ chatroom, userId }) => {

    const [otherUser, setOtherUser] = useState(null);

    const [itemName, setItemName] = useState('');

    const { item_id, buyer_id, owner_id, chatroom_id } = chatroom;

    const isBuyer = (userId == buyer_id); 

    console.log(item_id);

    useEffect(() => {
        const fetchOtherUser = async () => {

            if (isBuyer) {
                const { data, error } = await supabase.from('users').select('username').eq('id', owner_id);

                if (error) {
                    console.error(error.message);
                }

                setOtherUser(data[0].username);

            } else {
                const { data, error } = await supabase.from('users').select('username').eq('id', buyer_id);

                if (error) {
                    console.error(error.message);
                }
                
                setOtherUser(data[0].username);
            }

        }

        const fetchItem = async () => {
            const { data, error } = await supabase.from('items').select('name').eq('id', item_id);

            if (error) {
                console.error(error.message);
            }
            
            setItemName(data[0].name);
        }

        fetchOtherUser();
        fetchItem();
    }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', }}>{itemName}</Text>
      <Text>{otherUser}</Text>
    </View>
  )
}

export default ChatTile

const styles = StyleSheet.create({
    container: {
        padding: 25,
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 10
    }
})