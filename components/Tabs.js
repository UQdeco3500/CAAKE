import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PhotoStack from "./PhotoStack";
import ProfileScreen from "../screens/ProfileScreen"
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs =() => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'PhotoStack') {
                        iconName = focused ? 'paper-plane' : 'paper-plane';
                    }
                    else if (route.name === 'ProfileScreen'){
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
                name="PhotoStack"
                component={PhotoStack}
                options={{
                    headerShown: false
                }}
            />

            <Tab.Screen 
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs;