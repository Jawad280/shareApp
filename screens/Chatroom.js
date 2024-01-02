import { View, Text, TextInput, FlatList, TouchableOpacity, Button, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { globalStyles } from '../styles/global';
import ChatBubble from '../components/ChatBubble';
import AntDesign from '@expo/vector-icons/AntDesign'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Chatroom = ({ navigation, session, route }) => {

    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const userId = session.user.id;
    const { chatroom_id } = route.params;
    
    const getMessages = async () => {

      try {
        const { data, error } = await supabase
        .from('message')
        .select('*')
        .eq('chatroom_id', chatroom_id);

        if (error) {
          console.error(error.message);
        } else {
          setMessages(data);
        }
      } catch (error) {
        console.error(error.message);
      }

    }

    useEffect(() => {
      getMessages();
    }, []);

    const handleSendMessage = async () => {

      const newMessage = {
        text: text,
        writer_id: userId,
        chatroom_id: chatroom_id
      };

      const { data, error } = await supabase
      .from('message')
      .insert(newMessage);

      if (error) {
        console.error(error.message);
      } else {
        console.log(data);
        setText('');
        console.log('message sent');
        getMessages();
      }

    }

  return (    
      <View style={{ justifyContent: 'space-between', flex: 1 }}>

        <View style={{ padding: 15 }}>
          <FlatList 
            data={messages}
            renderItem={({item}) => (
              <ChatBubble userId={userId} message={item}/>
            )}
            keyExtractor={(message) => message.id}
          />
        </View>

        <View>

          <View style={{flexDirection: 'row', columnGap: 8, paddingHorizontal: 15, paddingVertical: 10 }}>
            <TextInput 
              onChangeText={(t) => setText(t)}
              value={text}
              placeholder='Type here...'
              style={globalStyles.chatTextInput}
            />
            <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: '#a1a1a1', justifyContent: 'center'}} onPress={handleSendMessage}>
              <AntDesign name='arrowup' size={28} color={'white'} />
            </TouchableOpacity>
          </View>

        </View>

      </View>
  )
}

export default Chatroom