import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {Header, Gap} from '../components';

const s = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
  },
  content: {
    paddingVertical: 25,
    paddingHorizontal: 50,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1C2342',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    height: '100%',
    paddingLeft: 5,
    textAlignVertical: 'center',
    fontFamily: 'Helvetica',
    color: '#FFFFFF',
    fontSize: 15,
    borderBottomWidth: 2.5,
    borderBottomColor: '#21325E',
  },
  input: {
    flex: 1,
    marginLeft: 5,
    paddingRight: 5,
    textAlignVertical: 'center',
    fontFamily: 'Helvetica',
    color: '#FFFFFF',
    fontSize: 15,
    borderBottomWidth: 2.5,
    borderBottomColor: '#21325E',
  },
  button: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#21325E',
    borderRadius: 5,
    shadowColor: '#0C1D24',
    elevation: 2.5,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Helvetica',
    color: '#FFFF',
    fontSize: 15,
  },
});

export default function Chats({navigation}) {
  return (
    <View style={s.screen}>
      <Header
        back="light"
        title="Add Contact"
        onPressLeft={() => navigation.goBack()}
      />
      <View style={s.content}>
        <View style={s.wrap}>
          <Text style={s.title}>Name :</Text>
          <TextInput
            style={s.input}
            placeholder="Enter name here"
            placeholderTextColor="#96A0A9"
          />
        </View>
        <View style={s.wrap}>
          <Text style={s.title}>Phone Number :</Text>
          <TextInput
            style={s.input}
            keyboardType="numeric"
            placeholder="Enter phone number here"
            placeholderTextColor="#96A0A9"
          />
        </View>
        <Gap h={50} />
        <TouchableOpacity
          style={s.button}
          activeOpacity={0.5}
          onPress={() => {}}>
          <Text style={s.buttonText}>ADD CONTACT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}