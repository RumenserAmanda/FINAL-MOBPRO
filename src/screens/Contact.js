import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image, Text, TouchableHighlight } from 'react-native';

import { ProfilePerson as Profile } from '../assets/images';
import { BackLight as Back, DotsLight as Dots, PhoneLight as Phone, VideoLight as Video, SearchDark as Search, DeleteContact, DeleteChat } from '../assets/icons';
import { Gap } from '../components';

const s = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#1C2342',
    },
    contentTop: {
        padding: 20,
        backgroundColor: '#21325E',
    },
    contentTopTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    picture: {
        height: 100,
        width: 100,
        marginBottom: 10,
        borderRadius: 125/2,
    },
    name: {
        fontFamily: 'Helvetica',
        color: '#E9EDEF',
        fontSize: 22.5,
        textAlign: 'center',
    },
    phone: {
        marginVertical: 5,
        fontFamily: 'Helvetica',
        color: '#8696A0',
        fontSize: 17.5,
        textAlign: 'center',
    },
    lastSeen: {
        color: '#8696A0',
        fontFamily: 'Helvetica',
        fontSize: 12.5,
        textAlign: 'center',
    },
    optionsWrap: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    option: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        marginTop: 15,
        fontFamily: 'Helvetica',
        color: '#87A4EE',
        fontSize: 12.5,
    },
    contentBottom: {
        backgroundColor: '#21325E',
    },
    bottomItem: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        flexDirection: 'row',
    },
    bottomItemText: {
        marginLeft: 25,
        fontFamily: 'Helvetica',
        color: '#F15C6D',
        fontSize: 17.5,
    },
});

export default function Contact({route, navigation}) {
    const [contactData, setContactData] = useState(route.params);

    return(
        <ScrollView style={s.screen}>
            <View style={s.contentTop}>
                <View style={s.contentTopTop}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
                        <Back />
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity activeOpacity={0.5}>
                            {/* <Image source={(contactData.picture !== null) ? data.picture : Profile } style={s.picture} /> */}
                            <Image source={(contactData.picture !== undefined) ? contactData.picture : Profile } style={s.picture} />
                        </TouchableOpacity>
                        <Text style={s.name}>{"Amanda"}</Text>
                        <Text style={s.phone}>{"08123456789"}</Text>
                        <Text style={s.lastSeen}>{contactData.lastSeen}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Dots />
                    </TouchableOpacity>
                </View>
                <View style={s.optionsWrap}>
                    <TouchableOpacity style={s.option} activeOpacity={0.5}>
                        <Phone />
                        <Text style={s.optionText}>Audio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.option} activeOpacity={0.5}>
                        <Video />
                        <Text style={s.optionText}>Video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.option} activeOpacity={0.5}>
                        <Search />
                        <Text style={s.optionText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Gap h={15} />
            <View style={s.contentBottom}>
                <TouchableHighlight underlayColor='#454E55' onPress={() => {}}>
                    <View style={s.bottomItem}>
                        <DeleteContact />
                        <Text style={s.bottomItemText}>Delete Contact</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='#454E55' onPress={() => {}}>
                    <View style={s.bottomItem}>
                        <DeleteChat />
                        <Text style={s.bottomItemText}>Clear Chat</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </ScrollView>
    );
}
