import { Keyboard, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-url-polyfill/auto'

import ItemCreation from './screens/ItemCreation';
import Feed from './screens/Feed';
import ItemDetails from './screens/ItemDetails';

import { supabase } from './lib/supabase';
import Account from './components/Account';
import Auth from './components/Auth';
import Chatroom from './screens/Chatroom';
import AllChats from './screens/AllChats';
import MyItems from './screens/MyItems';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) => {
      setSession(session);
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    } 
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const initialRouteName = (session && session.user) ? 'Home' : 'Login';

  console.log('Logged in : ', (session && session.user))

  return (
    <NavigationContainer>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View onLayout={onLayoutRootView} style={styles.container}>
            <Stack.Navigator >
              {session && session.user ? (
                <>
                  <Stack.Screen 
                    name='Feed'
                    options={{ title: 'Main Feed', headerStyle: { backgroundColor: 'lightblue' }, headerTintColor: 'black', headerTitleStyle: { fontWeight: 'bold' }, headerBackVisible: false }}
                  >
                    {(props) => <Feed {...props} key={session.user.id} session={session}/>}
                  </Stack.Screen>

                  <Stack.Screen 
                    name='Account'
                    options={{ title: 'My Profile', headerStyle: { backgroundColor: 'lightblue' }, headerTintColor: 'black', headerTitleStyle: { fontWeight: 'bold' }, headerBackVisible: false }}
                  >
                    {(props) => <Account {...props} key={session.user.id} session={session}/>}
                  </Stack.Screen>

                  <Stack.Screen 
                    name='ItemCreation'
                    options={{ title: 'Create listing', headerStyle: { backgroundColor: 'lightblue' }, headerTintColor: 'black', headerTitleStyle: { fontWeight: 'bold' }, headerBackVisible: false }}
                  >
                    {(props) => <ItemCreation {...props} key={session.user.id} session={session}/>}
                  </Stack.Screen>

                  <Stack.Screen 
                    name='ItemDetails'
                    options={
                      ({ route }) => ({ title: route.params.item.name, headerStyle: { backgroundColor: 'lightblue' }, headerTintColor: 'black', headerTitleStyle: { fontWeight: 'bold' }, headerBackVisible: false })
                    }
                  >
                    {(props) => <ItemDetails {...props} key={session.user.id} session={session}/>}
                  </Stack.Screen>

                  <Stack.Screen 
                    name='MyItems'
                    options={{ title: 'Items', headerStyle: { backgroundColor: 'lightblue' }, headerTintColor: 'black', headerTitleStyle: { fontWeight: 'bold' }, headerBackVisible: false }}
                  >
                    {(props) => <MyItems {...props} key={session.user.id} session={session}/>}
                  </Stack.Screen>

                  <Stack.Screen name='Chatroom' options={{ title: 'Chatroom', headerStyle: { backgroundColor: 'lightblue' }, headerTintColor: 'black', headerTitleStyle: { fontWeight: 'bold' }, headerBackVisible: false }}>
                    {(props) => <Chatroom {...props} key={session.user.id} session={session}/>}
                  </Stack.Screen>

                  <Stack.Screen name='AllChats' options={{ title: 'My Chats', headerStyle: { backgroundColor: 'lightblue' }, headerTintColor: 'black', headerTitleStyle: { fontWeight: 'bold' }, headerBackVisible: false }}>
                    {(props) => <AllChats {...props} key={session.user.id} session={session}/>}
                  </Stack.Screen>
                  
                </>
              ) : (
                <>
                  <Stack.Screen name='Login' component={Auth} options={{title: 'ShareApp'}}/>          
                </>
              )}
            </Stack.Navigator>
        </View>
      </TouchableWithoutFeedback>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});