import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Colors from '../../constants/colors';

function Card({ children }) {
    return (
        <View style={styles.inputContainer}>
            {children}
        </View>
    )
};

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: deviceWidth < 380 ? 18 : 36,
        marginHorizontal: 24,
        padding: 15,
        backgroundColor: Colors.primary700,
        borderRadius: 8,
        elevation: 4, //Just for android
        shadowColor: 'black', //for IOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
})