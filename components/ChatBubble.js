import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChatBubble = ({ userId, message }) => {

    if (message.writer_id == userId) {
        return (
            <View style={styles.containerCurr}>
                <Text style={styles.textCurr}>{message.text}</Text>
            </View>
        )
    }

  return (
    <View style={styles.containerOther}>
        <Text style={styles.textOther}>{message.text}</Text>
    </View>
  )
}

export default ChatBubble

const styles = StyleSheet.create({
    containerCurr: {
        borderRadius: 10,
        backgroundColor: 'blue',
        padding: 15,
        width: 'auto',
        maxWidth: '80%',
        alignSelf: 'flex-end',
        marginBottom: 15
    },
    containerOther: {
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 15,
        width: 'auto',
        maxWidth: '80%',
        alignSelf: 'flex-start',
        marginBottom: 15
    },
    textCurr: {
        fontSize: 16,
        color: 'white'
    },
    textOther: {
        fontSize: 16,
        color: 'black'
    }
})