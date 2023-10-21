import * as React from 'react';
import { SafeAreaView, View, Text, Image, TextInput, StyleSheet, Button, Pressable, Alert } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import '../data/sample.png';

const Send = ({ navigation }) => {
    const [text, onChangeText] = React.useState('Enter your message here...');

    return (
        <SafeAreaView>

            <Text style={styles.heading}>
                        <FontAwesome5 name="paper-plane" size={24} color="#126F90"/>
                        <Text style={styles.send}>
                            SEND
                        </Text>
            </Text>
            <Text style={styles.streaks}>
                <FontAwesome5 name="fire" size={24} color="tomato"/> 
                <Text style={styles.send}>
                    12 DAYS
                </Text>
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingLeft: 30, paddingRight: 10}}>
            <Entypo name="new-message" size={24} color="gray" paddingTop={28}/>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            </View>
            <View>
                <Image source={require('../data/sample.png')}
                style={styles.image}/>
                <Text style={styles.albumName}>
                    October Travel
                </Text>

            </View>
            
        </SafeAreaView>

    )

};

export default Send;

const styles = StyleSheet.create({
    
    input: {
      height: 40,
      margin: 20,
      borderWidth: 1,
      paddingLeft: 70,
      paddingRight: 70, 
      backgroundColor: 'white',
      color: 'gray',
      textAlign: 'center',
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
        paddingTop: 40,
        fontSize: 25,
        color: '#126F90',
        fontWeight: 'bold',
        letterSpacing: 10,
    },

    send: {
        letterSpacing: 0,
    },

    streaks: {
        fontSize: 15,
        alignSelf: 'flex-end',
        paddingRight: 30,
        letterSpacing: 10,
        color: 'tomato'
    },

    image: {
        alignSelf: 'center',
        width: 300,
        height: 300,
        marginTop: 60,
        marginBottom: 25,
        borderRadius: 10,

    },

    albumName: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#126F90',
        fontWeight: 'bold',
    }

  });
