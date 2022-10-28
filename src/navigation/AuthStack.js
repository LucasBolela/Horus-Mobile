import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import PluggyWidget from "../screens/PluggyWidget";

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Widget" component={PluggyWidget} />
        </Stack.Navigator>
    );
};