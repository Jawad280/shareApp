import { Keyboard, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-url-polyfill/auto'

import Home from './screens/Home';
import Profile from './screens/Profile';
import ItemCreation from './screens/ItemCreation';
import Feed from './screens/Feed';
import ItemDetails from './screens/ItemDetails';

import { supabase } from './lib/supabase';
import Account from './components/Account';
import Auth from './components/Auth';

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
                  <Stack.Screen name='Home'>
                    {(props) => <Home {...props} key={session.user.id} session={session}/>}
                  </Stack.Screen>
                  <Stack.Screen name='Account'>
                    {(props) => <Account {...props} key={session.user.id} session={session}/>}
                  </Stack.Screen>
                  <Stack.Screen name='Profile' component={Profile} />
                  <Stack.Screen name='ItemCreation'>
                    {(props) => <ItemCreation {...props} key={session.user.id} session={session}/>}
                  </Stack.Screen>
                  <Stack.Screen name='Feed'>
                    {(props) => <Feed {...props} key={session.user.id} session={session}/>}
                  </Stack.Screen>
                  <Stack.Screen name='ItemDetails'>
                    {(props) => <ItemDetails {...props} key={session.user.id} session={session}/>}
                  </Stack.Screen>
                </>
              ) : (
                <>
                  <Stack.Screen name='Login' component={Auth}/>          
                </>
              )}
            </Stack.Navigator>        
          {/* {
            session && session.user ? <Account key={session.user.id} session={session}/> : <Auth />
          }  */}
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