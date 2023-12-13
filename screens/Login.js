import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../styles/global'
import bcrypt from 'bcryptjs'

export default function Login({ navigation, setIsLoggedIn }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    try {
      const response = await fetch(`http://192.168.10.3:3000/api/users/email/${email}`, {
        method: 'GET'
      });

      const existingUser = await response.json();
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
      console.log(password, passwordMatch)

      if (passwordMatch) {
        console.log('Login successful');
        setIsLoggedIn(true);
        navigation.navigate('Home');
      } else {
        console.log('Unsuccessful login');
        setIsLoggedIn(false);
      }

    } catch (error) {
      console.error(error)
    }
    
  }

  return (
    <View style={globalStyles.container}>

      <View style={styles.inputContainer}>
        <Text style={globalStyles.formHeader}>Email</Text>
        <TextInput 
            placeholder='Enter Email'
            onChangeText={(t) => setEmail(t)}
            style={globalStyles.textInput}
            inputMode='email'
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={globalStyles.formHeader}>Password</Text>
        <TextInput 
            placeholder='Enter Password'
            onChangeText={(t) => setPassword(t)}
            style={globalStyles.textInput}
            secureTextEntry={true}
        />
      </View>

      <Button 
        title='Login'
        onPress={handleLogin}
      />

      <Button 
        title='Create Account'
        onPress={() => navigation.navigate('CreateAccount')}
      />
    </View>
  )
}

export const styles = StyleSheet.create({
  inputContainer: {
      padding: 18
  }
});