import React from 'react';
import Login from "./screens/Login"
import Tabs from './components/Tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App