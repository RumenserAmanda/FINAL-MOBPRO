import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Splash, Welcome, SignIn, Chats, MyProfile, ChatItem} from '../screens';

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="Chats" component={MyProfile} />
      <Stack.Screen name="ChatItem" component={ChatItem} />
    </Stack.Navigator>
  );
}
