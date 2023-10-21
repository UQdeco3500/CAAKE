import * as React from 'react';
import { SafeAreaView, View, Text, FlatList, TextInput, StyleSheet, Button, Pressable, Alert } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
// import { styles } from '../data/styles';

const Send = ({ navigation }) => {
    const [text, onChangeText] = React.useState('Enter your message here...');

    return (
        <SafeAreaView>
            <FontAwesome5 style={styles.icon} name="paper-plane" size={24} color="#126F90"/>
            <Text style={styles.heading}>
                {/* <FontAwesome5 name="paper-plane" size={24} color="#126F90"/> */}
                SEND
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            
        </SafeAreaView>

    )
    

};

export default Send;

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 30,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'white',
      color: '#126F90',
      borderRadius: 10,
      borderColor: 'white',
    },
    
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
        margin: 20,
        elevation: 3,
        backgroundColor: 'white',
      },

    heading: {
        paddingLeft: 30,
        fontSize: 25,
        color: '#126F90',
        fontWeight: 'bold',
    },

    icon: {
        paddingLeft: 20,
        paddingTop: 10,

    },

  });