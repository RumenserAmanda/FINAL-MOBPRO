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

export default function SignUp({navigation}) {
    const signUpPress = () => {
        navigation.reset({routes: [{name: 'HomeRouter'}]});
        // navigation.replace('HomeRouter');
    }

    return(
        <View style={styles.screen}>
            <ImageBackground source={Bg} style={styles.bg} resizeMode='cover'>
                <Text>SignUp</Text>
                <Button title="SignUp" onPress={signUpPress} />
            </ImageBackground>
        </View>
    );
}
