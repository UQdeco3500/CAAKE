import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import PictureScreen from "../screens/PictureScreen";
import Send from "../screens/Send";
import PhoneCamera from "./PhoneCamera";
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs =() => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Send') {
                        iconName = focused ? 'paper-plane' : 'paper-plane';
                    }
                    else if (route.name === 'PhoneCamera'){
                        iconName = focused ? 'images' : 'images';
                    }
                    return <FontAwesome5 name={iconName} size={size} color={color} />
                },

            })}

                tabBarOptions={{
                    activeTintColor: "#126F90",
                    inactiveTintColor: 'gray',
            }}

        >
            <Tab.Screen 
                name="Send"
                component={Send}
                options={{
                    headerShown: false
                }}
            />

            <Tab.Screen 
                name="PhoneCamera"
                component={PhoneCamera}
                options={{
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs;