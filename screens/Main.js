import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabs from '../components/BottomTabs';
import { Ionicons } from '@expo/vector-icons';

import Feed from './Feed';
import AllChats from './AllChats';
import MyItems from './MyItems';
import Account from '../components/Account';
import ItemCreation from './ItemCreation';

const Tab = createBottomTabNavigator();

const Main = ({navigation, session}) => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabs {...props} />} >
        <Tab.Screen name='Home' options={{
            tabBarIcon: ({ focused, size, color }) => (
                <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color}/>
            )
            }}
        >
            {(props) => <Feed {...props} key={session.user.id} session={session}/>}
        </Tab.Screen>

        <Tab.Screen name='Chats' options={{
            tabBarIcon: ({ focused, size, color }) => (
                <Ionicons name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} size={size} color={color}/>
            )
            }}
        >
            {(props) => <AllChats {...props} key={session.user.id} session={session}/>}
        </Tab.Screen>

        <Tab.Screen name='Create Listing' options={{
            tabBarIcon: ({ focused, size, color }) => (
                <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={size} color={color}/>
            )
            }}
        >
            {(props) => <ItemCreation {...props} key={session.user.id} session={session}/>}
        </Tab.Screen> 

        <Tab.Screen name='Items' options={{
            tabBarIcon: ({ focused, size, color }) => (
                <Ionicons name={focused ? 'grid' : 'grid-outline'} size={size} color={color}/>
            )
            }}
        >
            {(props) => <MyItems {...props} key={session.user.id} session={session}/>}
        </Tab.Screen>

        <Tab.Screen name='My Profile' options={{
            tabBarIcon: ({ focused, size, color }) => (
                <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={color}/>
            )
            }}
        >
            {(props) => <Account {...props} key={session.user.id} session={session}/>}
        </Tab.Screen> 

    </Tab.Navigator>
  )
}

export default Main

const styles = StyleSheet.create({})