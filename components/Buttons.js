import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Button({ title, onPress, icon, color, pictureIcon }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Entypo name={icon} size={30} color={color ? color : 'white'} />
      <View style={styles.pictureIcon}>
        <FontAwesome5 name={pictureIcon} size={78} color={color ? color : 'white'} />
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
  },

  pictureIcon: {
    height: 80,
  }
});