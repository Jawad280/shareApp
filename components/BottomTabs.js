import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const BottomTabs = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, padding: 25, justifyContent: 'space-between', backgroundColor:'#efe0ff' }}
          >
            {
                options.tabBarIcon 
                ? options.tabBarIcon({ focused: isFocused, color: isFocused ? '#673ab7' : '#222', size: 28 })
                : null
            }
          </TouchableOpacity>
        );
      })}
    </View>
  )
}

export default BottomTabs

const styles = StyleSheet.create({})