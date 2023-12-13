import { Text, View, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../styles/global'

export default function CreateAccount({ navigation }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        console.log('Button has been pressed')
        const newUser = {
            name: name,
            email: email,
            password: password
        }

        try {
            const response = await fetch('http://192.168.10.3:3000/api/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData, 'User has been created');
        } catch(error) {
            console.error('Request not sent',error)
        }
    }

  return (
    <View style={globalStyles.container}>

      <View style={styles.inputContainer}>
        <Text style={globalStyles.formHeader}>Name</Text>
        <TextInput 
            placeholder='Enter Name'
            onChangeText={(t) => setName(t)}
            style={globalStyles.textInput}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={globalStyles.formHeader}>Email</Text>
        <TextInput 
            placeholder='Enter Email'
            onChangeText={(t) => setEmail(t)}
            style={globalStyles.textInput}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={globalStyles.formHeader}>Password</Text>
        <TextInput 
            placeholder='Enter Password'
            onChangeText={(t) => setPassword(t)}
            style={globalStyles.textInput}
        />
      </View>

      <Button 
        title='Create User'
        onPress={handleSubmit}
      />
    </View>
  )
}

export const styles = StyleSheet.create({
    inputContainer: {
        padding: 18
    }
});