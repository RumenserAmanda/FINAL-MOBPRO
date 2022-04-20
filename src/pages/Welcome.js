import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { Background as Bg } from '../assets/image';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    bg: {
        flex: 1,
    }
});

export default function Welcome({navigation}) {
    useEffect(() => {
        setTimeout(() => {
            navigation.reset({routes: [{name: 'HomeRouter'}]});
            // navigation.replace('HomeRouter');
        }, 2500);
    }, []);

    return(
        <View style={styles.screen}>
            <ImageBackground source={Bg} style={styles.bg} resizeMode='cover'>
                <Text>Welcome</Text>
            </ImageBackground>
        </View>
    );
}
