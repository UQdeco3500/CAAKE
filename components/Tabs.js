import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import PictureScreen from "../screens/PictureScreen";
import HomeScreen from "../screens/HomeScreen";
import PhoneCamera from "./PhoneCamera";
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabIcon =(icon, color) => {
    return(
        <FontAwesome5 name={icon} size={28} color={color ? color : '#000'} />
    )
}
const Tabs =() => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeScreen') {
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
                name="HomeScreen"
                component={HomeScreen}
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