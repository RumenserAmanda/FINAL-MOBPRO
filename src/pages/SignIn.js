import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Button } from 'react-native';
import { Background as Bg } from '../assets/image';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    bg: {
        flex: 1,
    }
});

export default function SignIn({navigation}) {
    const signInPress = () => {
        navigation.replace('Welcome');
    }

    const signUpPress = () => {
        navigation.push('SignUp');
    }

    return(
        <View style={styles.screen}>
            <ImageBackground source={Bg} style={styles.bg} resizeMode='cover'>
                <Text>SignIn</Text>
                <Button title="SignIn" onPress={signInPress} />
                <Button title="SignUp" onPress={signUpPress} />
            </ImageBackground>
        </View>
    );
}
