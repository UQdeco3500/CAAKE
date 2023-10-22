import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Send from '../screens/HomeScreen';
import PhoneCamera from '../screens/PhotoScreen';

const Stack = createStackNavigator();

const PhotoStack = () => {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator
				screenOptions={{
					headerShown: false
				}}
				initialRouteName={"Send"}
			>
				<Stack.Screen
						name="Send"
						children={props => <Send {...props} />}
				/>
				<Stack.Screen
						name="PhoneCamera"
						children={props => <PhoneCamera {...props} />}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default PhotoStack;