import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#333'
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20
    },
    formHeader: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    textInput: {
        fontSize: 15,
        borderBottomWidth: 1,
        paddingVertical: 15
    },
    chatTextInput : {
        fontSize: 16,
        borderRadius: 10,
        padding: 15,
        flex: 1,
        backgroundColor: '#fffef7'
    }
});