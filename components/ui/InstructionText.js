import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../../constants/colors';

function InstructionText({ children, style }) {
    return (
        <Text style={[styles.instructionText, style]}>{children}</Text> //style overwrite styles.instructionText because read front left to right 
    );
}

export default InstructionText;


const styles = StyleSheet.create({
    instructionText: {
        color: Colors.accent500,
        fontSize: 24,
    },
})