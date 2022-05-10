import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { DotsDark as Dots } from '../assets/icons';
import { Gap } from '../components';

const s = StyleSheet.create({
    showMessage: ({type='default', title='<Title>', desc=null}) => ({
        fontFamily: 'Helvetica',
        color: '#202020',
        titleStyle: {
            fontWeight: 'bold',
        },

        backgroundColor: (type === 'success') ? '#40F040' : (type === 'error') ? '#F04040' : (type === 'warning') ? '#F0F040' : '#808080',
        message: title,
        description: desc,
    }),

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

export default function SignIn({navigation, route}) {
    const uri = route.params;
    const [users, setUsers] = useState(null);
    useEffect(() => {
        (async() => {
            try {
                const req = await fetch(`${uri}/api/users?phone`);
                const res = await req.json();
                (res.status === 'success') && setUsers(res.desc);
            }
            catch(e) {
                showMessage(s.showMessage({
                    type: 'error',
                    title: "Tidak bisa terhubung ke server",
                    desc: "Server mungkin sedang dalam perbaikan. Coba lagi nanti.",
                }));
            }
        })();
    }, []);

    const countries = [
        {name: "Indonesia", code: '62'},
    ];

    const [country, setCountry] = useState(countries[0]);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [name, setName] = useState(null);

    const continuePress = async() => {
        try {
            let exist = false;

            users.forEach(r => {
                if(phoneNumber === r.phone) {
                    navigation.push('Chats', {uri: uri, data: r._id.toString()}); // use this in dev mode
                    // navigation.reset({routes: [{name: 'Chats', params: {uri: uri, data: r._id.toString()}}]});
                    exist = true;
                }
            });

            (exist === false) && showMessage(s.showMessage({
                type: 'warning',
                title: "Nomor telepon tidak terdaftar",
                desc: "Tolong masukkan nomor telepon yang sudah terdaftar atau buat akun baru dengan memasukkan nama anda.",
            }));

            if(exist === false && phoneNumber !== null && phoneNumber !== '' && phoneNumber.trim().length !== 0 && name !== null && name !== '' && name.trim().length !== 0) {
                const reqOpt = {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        phone: phoneNumber,
                        country: {
                            name: country.name,
                            code: country.code,
                        },
                        name: name,
                    }),
                };

                const req = await fetch(`${uri}/api/user`, reqOpt);
                const res = await req.json();
                (res.status === 'success') && navigation.push('Chats', {uri: uri, data: res.desc._id}); // use this in dev mode
                // (res.status === 'success') && navigation.reset({routes: [{name: 'Chats', params: {uri: uri, data: res.desc._id}}]});
                (res.status === 'error') && showMessage(s.showMessage({
                    type: 'error',
                    title: "Oops! Terjadi kesalahan",
                    desc: "Tidak dapat membuat akun baru. Coba lagi nanti.",
                }));
            }
        }
        catch(e) {
            showMessage(s.showMessage({
                type: 'error',
                title: "Tidak bisa terhubung ke server",
                desc: "Server mungkin sedang dalam perbaikan. Coba lagi nanti.",
            }));
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
                        <TextInput style={s.bottomRight} placeholder="nomor telepon" placeholderTextColor='#96A0A9' keyboardType='numeric' value={phoneNumber} onChangeText={(val) => setPhoneNumber(val.replace(/\s/g, ''))} />
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