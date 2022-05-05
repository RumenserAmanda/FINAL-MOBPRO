import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {Logo as Bg} from '../assets/images';

const s = StyleSheet.create({
  screen: {
    paddingBottom: 50,
    flex: 1,
    backgroundColor: '#304771',
    justifyContent: 'center',
  },
  bg: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // resizeMode: 'contain',
    // flexWrap: 'wrap',
  },
});

export default function Splash({navigation}) {


  return (
    <View style={s.screen}>
      <Image source={Bg} style={s.bg} />
    </View>
  );
}
