import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import { globalStyles } from '../styles/global';
import { supabase } from '../lib/supabase';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

export default function ItemDetails({ navigation, session, route }) {
    const { item } = route.params;
    const userId = session.user.id;

    const [isAvail, setIsAvail] = useState(item.is_available);

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

    const handleStatus = async () => {
      try {
        const { error } = await supabase.from('items').update({ is_available: !isAvail }).eq('id', item.id);
        
        if (error) {
          console.log(error.message);
        }
        setIsAvail(!isAvail)

      } catch (error) {
        Alert(error.message);
      }
    }

    const handleEdit = async () => {
      console.log('edit product page')
    }

    const handleShare = async () => {
      console.log('share link generated ?')
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

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

          <Text style={globalStyles.titleText}>Status : {isAvail ? 'Available' : 'Not Available'}</Text>
          
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Ionicons name='heart' size={30} color={'red'} />
            <Text >{item.num_likes}</Text>
          </View>
          
        </View>

        <View>
          <Text>Category</Text>
          <Text>Description</Text>
          <Text>Collect @ ____</Text>
        </View>
        
        {
          userId == item.listed_by ? (
            <View style={styles.container}>
              <View style={{flexDirection: 'row', columnGap: 15}}>
                <TouchableOpacity onPress={handleStatus} style={styles.button}>
                  <Ionicons name={item.is_available ? 'lock-open-outline' : 'lock-closed'} size={28} color='#673ab7'/>
                  <Text style={{color: '#673ab7'}}>{item.is_available ? 'Lock' : 'Unlock'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleEdit} style={styles.button}>
                  <Ionicons name='create-outline' size={28} color='#673ab7'/>
                  <Text style={{color: '#673ab7'}}>Edit</Text>
                </TouchableOpacity>
      
                <TouchableOpacity onPress={handleDelete} style={styles.button}> 
                  <Ionicons name='trash-outline' size={28} color='red'/>
                  <Text style={{color: 'red'}}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <View style={{flexDirection: 'row', columnGap: 15}}>
                <TouchableOpacity style={styles.button} onPress={handleChat}>
                  <Ionicons name='chatbubbles-outline' size={28} color='#673ab7'/>
                  <Text style={{color: '#673ab7'}}>Chat to Seller</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleShare}>
                  <Ionicons name='share-outline' size={28} color='#673ab7'/>
                  <Text style={{color: '#673ab7'}}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'lightblue',
    padding: 20,
    shadowOffset: 1,
    shadowOpacity: 0.1
  },
  button: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    shadowOffset: 1,
    shadowOpacity: 0.1
  }
})