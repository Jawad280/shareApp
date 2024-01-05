import { Keyboard, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import 'react-native-url-polyfill/auto'

import ItemCreation from './screens/ItemCreation';
import ItemDetails from './screens/ItemDetails';

import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import Chatroom from './screens/Chatroom';
import Main from './screens/Main';

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
                  <Stack.Screen name='Main' options={{headerShown: false}}>
                    {(props) => <Main {...props} key={session.user.id} session={session}/>}
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

                  <Stack.Screen name='Chatroom' options={{ title: 'Chatroom', headerStyle: { backgroundColor: 'lightblue' }, headerTintColor: 'black', headerTitleStyle: { fontWeight: 'bold' }, headerBackVisible: false }}>
                    {(props) => <Chatroom {...props} key={session.user.id} session={session}/>}
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