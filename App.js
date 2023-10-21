import React from 'react';
import Tabs from './components/Tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    )
}
export default App