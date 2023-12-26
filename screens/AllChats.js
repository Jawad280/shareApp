import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../lib/supabase';
import ChatTile from '../components/ChatTile';
import BottomNavigator from '../components/BottomNavigator';
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
      <Button 
        title='Get my chats for items i have listed'
        onPress={getMyChats}
      />

      <Button 
        title='Get my chats for items i want to buy'
        onPress={getMyChatsLiked}
      />

      <FlatList 
        data={myChats}
        keyExtractor={(chat) => chat.id}
        renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleGoToChat(item)}>
                <ChatTile chatroom={item} userId={userId}/>
            </TouchableOpacity>
        )}
      />

      <BottomNavigator navigation={navigation}/>
    </View>
  )
}

export default AllChats

const styles = StyleSheet.create({})