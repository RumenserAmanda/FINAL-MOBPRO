import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Splash,
  Welcome,
  SignIn,
  Chats,
  MyProfile,
  ChatItem,
  Contact,
  AddContact,
  ProfilePicture,
} from '../screens';

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
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="ChatItem" component={ChatItem} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="AddContact" component={AddContact} />
      <Stack.Screen name="ProfilePicture" component={ProfilePicture} />
    </Stack.Navigator>
  );
}
