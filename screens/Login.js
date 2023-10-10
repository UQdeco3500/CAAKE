import * as React from 'react';
import { View, Text } from 'react-native';

const Login = ({ navigation }) => {
    return (
        <View 
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} 
        >
            <Text
                onPress={() => navigation.navigate('Tabs')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >
                Login Screen
            </Text>
            <Text>
                Click me to go to the app!
            </Text>
        </View>
    );
}

export default Login;
