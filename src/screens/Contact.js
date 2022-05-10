import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image, Text, TouchableHighlight } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { ProfilePerson as DefaultProfile } from '../assets/images';
import { BackLight as Back, DotsLight as Dots, PhoneLight as Phone, VideoLight as Video, SearchDark as Search, DeleteContact, DeleteChat } from '../assets/icons';
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

export default function Contact({navigation, route}) {
    const uri = route.params.uri;
    const [userData, setUserData] = useState(route.params.userData);
    const [contactData, setContactData] = useState(route.params.contactData);

    const deleteContactPress = async() => {
        const reqOpt = {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user: userData._id,
                contact: contactData._id,
            }),
        };

        const req = await fetch(`${uri}/api/user/deleteContact`, reqOpt);
        const res = await req.json();
        showMessage(s.showMessage({
            type: res.status,
            title: res.message,
        }));
        (res.status === 'success') && navigation.reset({routes: [{name: 'Chats', params: {uri: uri, data: userData._id.toString()}}]});
    };
    
    const clearChatPress = async() => {
        const reqOpt = {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user: userData._id,
                contact: contactData._id,
            }),
        };

        const req = await fetch(`${uri}/api/user/clearChat`, reqOpt);
        const res = await req.json();
        showMessage(s.showMessage({
            type: res.status,
            title: res.message,
        }));
        (res.status === 'success') && navigation.reset({routes: [{name: 'Chats', params: {uri: uri, data: userData._id.toString()}}]});
    };

    return(
        <ScrollView style={s.screen}>
            <View style={s.contentTop}>
                <View style={s.contentTopTop}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
                        <Back />
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.push('ProfilePicture', {name: userData.contact.contactName, picture: (contactData.picture === null) ? DefaultProfile : {uri: contactData.picture}})}>
                            <Image source={(contactData.picture === null) ? DefaultProfile : {uri: contactData.picture}} style={s.picture} />
                        </TouchableOpacity>
                        <Text style={s.name}>{userData.contact.contactName}</Text>
                        <Text style={s.phone}>{contactData.phone}</Text>
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
                <TouchableHighlight underlayColor='#454E55' onPress={() => deleteContactPress()}>
                    <View style={s.bottomItem}>
                        <DeleteContact />
                        <Text style={s.bottomItemText}>Delete Contact</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='#454E55' onPress={() => clearChatPress()}>
                    <View style={s.bottomItem}>
                        <DeleteChat />
                        <Text style={s.bottomItemText}>Clear Chat</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </ScrollView>
    );
}
