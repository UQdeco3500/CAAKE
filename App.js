import React from 'react';
import Tabs from './components/Tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider } from './components/appContext';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <AppProvider>
                <Tabs />
            </AppProvider>
        </NavigationContainer>
    )
}
export default App