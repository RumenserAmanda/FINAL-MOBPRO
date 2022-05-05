import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Splash,
} from '../screens';

const Stack = createNativeStackNavigator();

export default function Router() {
    return(
        <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>
            <Stack.Screen
                name='Splash'
                component={Splash}
            />
        </Stack.Navigator>
    );
}
