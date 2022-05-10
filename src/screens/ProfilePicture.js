import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
const { width } = Dimensions.get('screen');

import { BackLight } from '../assets/icons';

const s = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    text: {
        paddingLeft: 30,
        fontFamily: 'Helvetica',
        color: '#FFFFFF',
        fontSize: 17.5,
    },
    imageWrap: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default function ProfilePicture({navigation, route}) {
    return(
        <View style={s.screen}>
            <View style={s.header}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
                    <BackLight />
                </TouchableOpacity>
                <Text style={s.text}>{route.params.name}</Text>
            </View>
            <View style={s.imageWrap}>
                <Image style={{height: width}} source={route.params.picture} />
            </View>
        </View>
    );
}
