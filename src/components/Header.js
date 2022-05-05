import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Text, TouchableOpacity } from 'react-native';

import { ProfilePerson as Picture } from '../assets/images';
import { BackDark, BackLight, VideoLight, PhoneLight, DotsLight as Dots } from '../assets/icons';

const s = StyleSheet.create({
    container: {
        height: 60,
        paddingVertical: 15,
        paddingRight: 10,
        flexDirection: 'row',
        backgroundColor: '#21325E',
    },
    left: {
        paddingLeft: 10,
        paddingRight: 2.5,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    profile: {
        marginLeft: 5,
        height: 40,
        width: 40,
        borderRadius: 40/2,
    },
    mid: {
        paddingLeft: 5,
        flex: 1,
        justifyContent: 'center',
    },
    title: (text) => ({
        fontFamily: 'Helvetica',
        color: '#E9EDEF',
        fontSize: 17.5,
    }),
    text: {
        marginTop: -7.5,
        fontFamily: 'Helvetica',
        color: '#E9EDEF',
        fontSize: 15,
    },
    right: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 30,
        justifyContent: 'center',
    },
});

export default function Header({back=false, usePicture=false, picture=null, onPressLeft=null, useMid=false, title="<Header_Title>", text=null, onPressMid=null, video=false, phone=false, dots=false}) {
    return(
        <View style={s.container}>
            <TouchableHighlight underlayColor='#454E55' onPress={onPressLeft}>
                <View style={s.left}>
                    {(back === 'dark') ? <BackDark /> : (back === 'light') && <BackLight />}
                    {(usePicture) ? <Image source={(picture === null) ? Picture : picture} style={s.profile} /> : <View style={{marginHorizontal: 12.5}} />}
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={s.mid} underlayColor='#454E55' onPress={onPressMid}>
                <View>
                    <Text style={s.title(text)}>{title}</Text>
                    {(text !== null) && <Text style={s.text}>{text}</Text>}
                </View>
            </TouchableHighlight>
            <View style={s.right}>
                {(video) && <TouchableOpacity style={s.icon}>
                    <VideoLight />
                </TouchableOpacity>}
                {(phone) && <TouchableOpacity style={s.icon}>
                    <PhoneLight />
                </TouchableOpacity>}
                {(dots) && <TouchableOpacity style={s.icon}>
                    <Dots />
                </TouchableOpacity>}
            </View>
        </View>
    );
}
