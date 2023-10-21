import * as React from 'react';
import { View, Text } from 'react-native';

const Send = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('This is the "Send" page.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Send</Text>
        </View>
    );
}

export default Send; 
