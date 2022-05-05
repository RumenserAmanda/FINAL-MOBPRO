import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

import { DotsDark as Dots } from '../assets/icons';
import { Gap } from '../components';

const dummyData = require('../data');

const s = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#21325E',
    },
    top: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        fontFamily: 'Helvetica',
        color: '#F1F8FE',
        textAlign: 'center',
        fontSize: 20,
    },
    text: (color) => ({
        textAlign: 'center',
        fontFamily: 'Helvetica',
        color: color,
        fontSize: 15,
    }),
    inputWrap: {
        marginHorizontal: 35,
    },
    textTop: {
        paddingVertical: 7.5,
        fontFamily: 'Helvetica',
        color: '#E9F0F8',
        textAlign: 'center',
        borderBottomWidth: 2.5,
        borderBottomColor: '#87A4EE',
    },
    inputBottom: {
        flexDirection: 'row',
    },
    bottomLeft: {
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2.5,
        borderBottomColor: '#87A4EE',
    },
    bottomRight: {
        marginLeft: 10,
        flex: 1,
        fontFamily: 'Helvetica',
        color: '#E9F0F8',
        borderBottomWidth: 2.5,
        borderBottomColor: '#87A4EE',
    },
    inputNameWrap: {
        marginHorizontal: 35,
        alignItems: 'center',
        borderBottomWidth: 2.5,
        borderBottomColor: '#87A4EE',
    },
    inputName: {
        fontFamily: 'Helvetica',
        color: '#E9F0F8',
    },
    button: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        shadowColor: '#0C1D24',
        elevation: 2.5,
        backgroundColor: '#87A4EE',
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Helvetica',
        fontSize: 15,
        color: '#FFFFFF',
    },
});

export default function SignIn({navigation}) {
    const [users, setUsers] = useState(dummyData);

    const countries = [
        {name: "Indonesia", code: '62'},
    ];

    const [country, setCountry] = useState(countries[0]);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [name, setName] = useState(null);

    const continuePress = () => {
        console.log(users);
        if(phoneNumber !== null && phoneNumber !== '') {
            users.default.forEach(r => {
                if(r.phone === phoneNumber) {
                    navigation.replace('Chats', r);
                }
            });
        }
    }

    return(
        <View style={s.screen}>
            <View>
                <View style={s.top}>
                    <Text style={s.title}>Masukkan nomor telepon anda</Text>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Dots />
                    </TouchableOpacity>
                </View>
                <Gap h={10} />
                <View>
                    <Text style={s.text('#DEE5EB')}>Chats perlu memverifikasi nomor telepon anda.</Text>
                    <Text style={s.text('#23B0DC')}>Berapa nomor telepon saya?</Text>
                </View>
                <Gap h={10} />
                <View style={s.inputWrap}>
                    <Text style={s.textTop}>{country.name}</Text>
                    <View style={s.inputBottom}>
                        <View style={s.bottomLeft}>
                            <Text style={[s.text('#8A979D'), {marginRight: 15}]}>+</Text>
                            <Text style={[s.text('#DEE5EB')]}>{country.code}</Text>
                        </View>
                        <TextInput style={s.bottomRight} placeholder="nomor telepon" placeholderTextColor='#96A0A9' keyboardType='numeric' value={phoneNumber} onChangeText={(val) => setPhoneNumber(val)} />
                    </View>
                </View>
                <Gap h={15} />
                <Text style={s.text('#8A979D')}>Biaya operator mungkin berlaku</Text>
                <Gap h={30} />
                <View style={s.inputNameWrap}>
                    <TextInput style={s.inputName} placeholder="name" placeholderTextColor='#96A0A9' value={name} onChangeText={(val) => setName(val)} />
                </View>
            </View>
            <TouchableOpacity style={s.button} activeOpacity={0.5} onPress={() => continuePress()}>
                <Text style={s.buttonText}>LANJUT</Text>
            </TouchableOpacity>
        </View>
    );
}