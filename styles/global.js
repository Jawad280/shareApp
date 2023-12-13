import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1
    },
    titleText: {
        fontFamily: 'nunito-bold',
        fontSize: 25,
        color: '#333'
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20
    },
    formHeader: {
        fontFamily: 'nunito-bold',
        fontSize: 18,
    },
    textInput: {
        fontFamily: 'nunito-regular',
        fontSize: 15,
        borderBottomWidth: 1,
        paddingVertical: 15
    }
});