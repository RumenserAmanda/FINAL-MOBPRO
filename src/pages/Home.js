import React from 'react';
import {StyleSheet, View, Text, ImageBackground, Button} from 'react-native';
import {Background as Bg} from '../assets/image';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
});

export default function Home({navigation}) {
  const addDiaryPress = () => {
    navigation.push('AddDiary');
  };

  return (
    <View style={styles.screen}>
      <ImageBackground source={Bg} style={styles.bg} resizeMode="cover">
        <Text>Home</Text>
        <Button title="Add Diary" onPress={addDiaryPress} />
      </ImageBackground>
    </View>
  );
}
