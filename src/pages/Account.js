import React from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {Background as Bg} from '../assets/image';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
});

export default function Account({navigation}) {
  return (
    <View style={styles.screen}>
      <ImageBackground source={Bg} style={styles.bg} resizeMode="cover">
        <Text>Account</Text>
      </ImageBackground>
    </View>
  );
}
