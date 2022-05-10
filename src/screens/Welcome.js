import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { WelcomeImage } from '../assets/images';

const s = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1C2342',
    },
    title: {
        marginTop: 25,
        fontFamily: 'Helvetica',
        fontSize: 20,
        color: '#87A4EE',
        fontWeight: 'bold',
    },
    image: {
        height: 250,
        width: 250,
    },
    bottom: {
        marginHorizontal: 10,
        overFlow: 'hidden',
    },
    text: (color) => ({
        textAlign: 'center',
        fontFamily: 'Helvetica',
        color: color,
        fontSize: 12.5,
    }),
    button: {
        marginVertical: 25,
        marginHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        shadowColor: '#0C1D24',
        elevation: 2.5,
        backgroundColor: '#21325E',
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Helvetica',
        fontSize: 15,
        color: '#FFFFFF',
    },
});

export default function Welcome({navigation, route}) {
    return(
        <View style={s.screen}>
            <Text style={s.title}>Welcome to Chats</Text>
            <Image source={WelcomeImage} style={s.image} />
            <View style={s.bottom}>
                <Text style={s.text('#FFFFFF')}>Baca {<Text style={s.text('#87A4EE')}>Kebijakan Privasi</Text>} kami. Ketuk "SETUJU DAN LANJUTKAN" untuk menerima {<Text style={s.text('#87A4EE')}>Ketentuan Layanan.</Text>}</Text>
                <TouchableOpacity style={s.button} activeOpacity={0.5} onPress={() => navigation.reset({routes: [{name: 'SignIn', params: route.params}]})}>
                    <Text style={s.buttonText}>SETUJU DAN LANJUTKAN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
