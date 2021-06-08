import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import Speech from "../Component/Sppech";
import Translator from "../Component/Translator";
import GoglTransApi from "../Component/GoglTransApi";

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="speech" component={Speech} />
            <Stack.Screen name="translator1" component={GoglTransApi} />
            <Stack.Screen name="translator" component={Translator} />
        </Stack.Navigator>
    );
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}
export default Navigation;