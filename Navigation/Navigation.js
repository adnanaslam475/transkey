import React from "react";
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import Speech from "../Component/Sppech";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Translator from "../Component/Translator";

const Stack = createStackNavigator();
const drawer = createDrawerNavigator()
const StackNavigator = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="speech" options={{
                headerTintColor: 'blue',
                headerTitle: 'Transkey',
                headerTransparent: false,
                headerTitleAlign: 'center',

                // headerBackground
                headerTitleContainerStyle: {
                    borderRadius: 30,
                },
                headerTitleStyle: {
                    color:'blue',
                    padding: 10
                }
            }} component={Speech} />
            {/* <Stack.Screen name="translator" component={Translator} /> */}
        </Stack.Navigator>
    );
}

const DraweerNavigtor = () => {
    return (
        <drawer.Navigator>
            <drawer.Screen name='Home' component={StackNavigator} />
        </drawer.Navigator>
    )
}
const Navigation = () => {
    return (
        <NavigationContainer>
            <DraweerNavigtor />
        </NavigationContainer>
    )
}
export default Navigation;