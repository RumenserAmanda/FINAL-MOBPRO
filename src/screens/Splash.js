import React, { useEffect } from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {Logo as Bg} from '../assets/images';

const uri = 'http://192.168.1.12:3000';

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#304771',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    width: 150,
    height: 150,
  },
});

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => navigation.reset({routes: [{name: 'Welcome', params: uri}]}), 1000);
  }, []);

  return (
    <View style={s.screen}>
      <Image source={Bg} style={s.bg} />
    </View>
  );
}
