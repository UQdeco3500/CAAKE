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
                        iconName = focused ? 'user-circle' : 'user-circle';
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
                listeners={({ navigation, route }) => ({ // Goes to the first stack screen in the stack if this tab is pressed
                    tabPress: (e) => {
                        if (route.name === "PhotoStack") {
                            e.preventDefault();
                            navigation.reset({
                                index: 0, // Reset to the first screen in the stack
                                routes: [{ name: 'PhotoStack' }], // Specify the current route
                            });
                        }
                    },
                })}
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