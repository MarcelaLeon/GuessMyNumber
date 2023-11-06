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
        color: 'white',
        textAlign: 'center',
        padding: 12,
        maxWidth: '80%',
        width: 300,
    },
});

//You can have a file.ios.js with ios and other file.android.js for android an just need to import Title from '../components/ui/Title'; NOT '../components/ui/Title.ios'; example color.android.js import ./color;


