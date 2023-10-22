import * as React from 'react';
import { SafeAreaView, View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import '../data/sample.png';

const Send = ({ navigation }) => {
    const [text, onChangeText] = React.useState('Enter Your Message');

    return (
        <SafeAreaView>

            <Text style={styles.heading}>
                        <FontAwesome5 name="paper-plane" size={24} color="#126F90"/>
                        <Text style={styles.send}>
                            SEND
                        </Text>
            </Text>
            <Text style={styles.streaks}>
                <FontAwesome5 name="plane" size={24} color="#4ABCDE"/> 
                <Text style={styles.send}>
                    12 DAYS
                </Text>
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingLeft: 30, paddingRight: 10, paddingTop: 25, }}>
                <Entypo name="new-message" size={24} color="gray" paddingTop={28} marginLeft={0}/>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    numberOfLines={1}
                    fontSize={14}
                    color= 'gray'
                />
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("PhoneCamera")}>
                    <Image source={require('../data/sample.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <Text style={styles.albumName}>
                    October Travel
                </Text>
                <Text style={styles.date}>
                    Last Edited        10/10/2023
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    title="Send"
                    onPress={() => Alert.alert('Sent')}>
                    <Text style={styles.buttonText}>
                        SEND
                    </Text>
                </TouchableOpacity>

            </View>
            
        </SafeAreaView>

    )

};

export default Send;

const styles = StyleSheet.create({
    
    input: {
      height: 40,
      margin: 20,
      marginLeft: 8,
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
        color: 'white',
        backgroundColor: '#126F90',
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
        paddingBottom: 15,
        letterSpacing: 10,
        color: '#4ABCDE'
    },

    image: {
        alignSelf: 'center',
        width: 250,
        height: 250,
        marginTop: 20,
        marginBottom: 25,
        borderRadius: 10,

    },

    albumName: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#126F90',
        fontWeight: 'bold',
    },

    date: {
        alignSelf: 'center',
        fontSize: 15,
        marginTop: 20,
        color: '#126F90',
    },

    button: {
        backgroundColor: '#4ABCDE',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10,
        width: 280,
        margin: 20,
    },

    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color:'white',
    }

  });
