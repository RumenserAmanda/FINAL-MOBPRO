import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
    SplashScreen, 
    SignIn, 
    Welcome, 
    SignUp, 
    AddDiary
} from '../pages';
import HomeRouter from './HomeRouter';

const Stack = createNativeStackNavigator();

export default function Router() {
    return(
        <Stack.Navigator initialRouteName='SplashScreen'>
            <Stack.Screen 
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="Welcome"
                component={Welcome}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="HomeRouter"
                component={HomeRouter}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="AddDiary"
                component={AddDiary}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}
