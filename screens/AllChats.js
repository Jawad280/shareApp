import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../lib/supabase';
import ChatTile from '../components/ChatTile';
import { globalStyles } from '../styles/global';

const AllChats = ({ session, navigation }) => {

    const [myChats, setMyChats] = useState([]);
    const userId = session.user.id;

    const getMyChats = async () => {
        const { data, error } = await supabase
        .from('chatroom')
        .select('*')
        .eq('owner_id', userId)

        setMyChats(data);

        console.log(data);
    }

    const getMyChatsLiked = async () => {
        const { data, error } = await supabase
        .from('chatroom')
        .select('*')
        .eq('buyer_id', userId)

        setMyChats(data);

        console.log(data);        
    }

    const handleGoToChat = async (chatroom) => {
        const chatroom_id = chatroom.id;

        navigation.navigate('Chatroom', {chatroom_id});
    }

  return (
    <View style={globalStyles.container}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, columnGap: 15 }} >
        <TouchableOpacity style={styles.buttonClicked} onPress={getMyChats}>
          <Text style={{ fontSize: 18, padding: 20 }}>Your Listed Items</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonClicked} onPress={getMyChatsLiked}>
          <Text style={{ fontSize: 18, padding: 20 }}>Your Liked Items</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={myChats}
        keyExtractor={(chat) => chat.id}
        renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleGoToChat(item)}>
                <ChatTile chatroom={item} userId={userId}/>
            </TouchableOpacity>
        )}
      />

    </View>
  )
}

export default AllChats

const styles = StyleSheet.create({
  buttonClicked: {
    flex: 1, 
    borderRadius: 10, 
    backgroundColor: 'lightgray'
  }
})