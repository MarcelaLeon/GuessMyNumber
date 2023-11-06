import React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';


function Title({ children }) {
    return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Happy-Dance',
        fontSize: 24,
        //fontWeight: 'bold', if use custom font dont use extra font transformation in styles
        color: 'white',
        textAlign: 'center',
        //borderWidth: Platform.OS === 'android' ? 2 : 0,
        borderWidth: Platform.select({ ios: 0, android: 2 }),
        borderColor: 'white',
        padding: 12,
        maxWidth: '80%',
        width: 300,
    },
});