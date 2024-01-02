import { StyleSheet, Text, View, Alert } from 'react-native'
import { Button, Input } from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { globalStyles } from '../styles/global'

export default function Account({ session, navigation }) {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    
    useEffect(() => {
        if (session) {
            getProfile()
        }
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const { data, status, error } = await supabase
            .from('users')
            .select(`username`)
            .eq('id', session?.user.id)
            .single()

            if (error & status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
            }

        } catch(error) {
            Alert.alert(error.message)
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({username}) {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!')

            const updates = {
                id: session?.user.id,
                username, 
                updated_at: new Date()
            }

            const { error } = await supabase.from('users').upsert(updates);

            if (error) {
                throw error
            }
        } catch (error) {
            Alert.alert(error.message);
        } finally {
            setLoading(false);
        }
    } 

    const handleDeleteAccount = async () => {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to delete your account ?',
        [
          {
            text: 'No',
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => confirmDelete()
          }
        ],
        { cancelable: false }
      );
    }

    const confirmDelete = async () => {
      try {
        const userId = session.user.id;
        console.log('id: ', userId);
        const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId)

        if (error) {
          console.error(error.message);
        }

        console.log('Account has been deleted !');
        await supabase.auth.signOut();

      } catch (error) {
        console.error(error.message);
      }
    }

  return (
    <View style={globalStyles.container}>

      <View style={styles.container}>
        <Input label="Email" value={session?.user?.email} disabled />
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ username })}
          disabled={loading}
        />
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
        <Button title="Delete Account" buttonStyle={styles.delete} onPress={handleDeleteAccount}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 12,
      rowGap: 15
    },
    delete: {
      backgroundColor: '#e31e00',
      color: 'white'
    }
  })