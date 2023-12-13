import { StyleSheet, Text, View, Alert } from 'react-native'
import { Button, Input } from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Account({ session }) {
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

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ username })}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 40,
      padding: 12,
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: 'stretch',
    },
    mt20: {
      marginTop: 20,
    },
  })