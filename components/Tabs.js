import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PictureScreen from "../screens/PictureScreen";
import HomeScreen from "../screens/HomeScreen";
import PhoneCamera from "./PhoneCamera";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator

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
    )
}

export default Tabs;