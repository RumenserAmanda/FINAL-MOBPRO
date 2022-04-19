import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { 
    Home, 
    Account, 
} from '../pages';

const Drawer = createDrawerNavigator();

export default function HomeRouter() {
    return(
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen 
                name="Home"
                component={Home}
                options={{headerShown: false}}
            />
            <Drawer.Screen
                name="Account"
                component={Account}
                options={{headerShown: false}}
            />
        </Drawer.Navigator>
    );
}
