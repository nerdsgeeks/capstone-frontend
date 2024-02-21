import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';


// To Use it in your code -> name should be given in parent component 
// onpress  if you want to do something on click 
// there are two types of buttons primary and secondary

const Button = ({ name, type, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={type === 'primary' ? styles.primary : styles.secondary} >
            <View style={styles.buttonContainer}>
                <Text style={type === 'primary' ? styles.primaryText : styles.secondaryText}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    primary: {
        backgroundColor: 'blue',
        width: 151,
        height: 40,
        borderRadius: 60,
        justifyContent: 'center',
    },
    secondary: {
        backgroundColor: 'white',
        width: 151,
        height: 40,
        borderRadius: 60,
        justifyContent: 'center',
        borderColor: 'red', 
        borderWidth: 1,
    },
    primaryText: {
        color: 'white',
        textAlign: 'center',
    },
    secondaryText: {
        color: 'red', 
        textAlign: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Button;
