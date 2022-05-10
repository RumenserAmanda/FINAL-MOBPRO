import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, ScrollView, Image, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
import { useIsFocused } from '@react-navigation/native';

import { SearchDark as Search, DotsDark as Dots, CameraDark as Camera, AddContact } from '../assets/icons';
import { ProfilePerson as DefaultPicture } from '../assets/images';
import { Gap } from '../components';

const s = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#1C2342',
    },
    header: {
        paddingTop: 20,
        backgroundColor: '#21325E',
    },
    headerTop: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chats: {
        fontFamily: 'Helvetica',
        color: '#F0F0F0',
        fontSize: 20,
    },
    iconWrap: {
        flexDirection: 'row',
    },
    headerBottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    camera: {
        marginHorizontal: 10,
        color: '#87A4EE',
    },
    tabs: {
        flex: 1,
        flexDirection: 'row',
    },
    tabItem: (active) => ({
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomWidth: (active) ? 2.5 : 0,
        borderColor: (active) ? '#87A4EE' : '#87A4EE',
    }),
    tabItemText: (active) => ({
        fontFamily: 'Helvetica',
        color: (active) ? '#87A4EE' : '#87A4EE',
        fontSize: 15,
        fontWeight: 'bold',
    }),
    contentEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentEmptyText: {
        color: '#E9EDEF',
    },
    content: {
        flex: 1,
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 1,
        flexDirection: 'row',
    },
    profile: {
        height: 55,
        width: 55,
        marginRight: 15,
        borderRadius: 55/2,
    },
    itemWrap: {
        flex: 1,
        justifyContent: 'center',
    },
    itemTop: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        color: '#E9EDEF',
        fontSize: 17.5,
    },
    itemDate: {
        color: '#87A4EE',
        fontSize: 12.5,
    },
    itemBottom: {
        flex: 1,
    },
    itemMessage: {
        color: '#87A4EE',
        fontSize: 15,
    },
    chatsFAB: {
        height: 60,
        width: 60,
        marginTop: height-150,
        marginLeft: width-75,
        position: 'absolute',
        // alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#87A4EE',
        borderRadius: 60/2,
    },
});

export default function Chats({navigation, route}) {
    const uri = route.params.uri;
    const [userData, setUserData] = useState(null);

    (async() => {
        if(useIsFocused() && userData === null) {
            const reqUser = await fetch(`${uri}/api/user?_id=${route.params.data}`);
            const resUser = await reqUser.json();

            if(resUser.status === 'success') {
                let userDataTemp = resUser.desc[0];

                if(userDataTemp.contacts.length > 0) {
                    userDataTemp.contacts.forEach(async(r, index) => {
                        const reqTemp = await fetch(`${uri}/api/user?_id=${r._id}`);
                        const resTemp = await reqTemp.json();
                        if(resTemp.status === 'success') {
                            userDataTemp.contacts[index].contactPicture = resTemp.desc[0].picture;
                        }
    
                        (index === userDataTemp.contacts.length-1) && setUserData(userDataTemp);
                    });
                }
                else {
                    setUserData(userDataTemp);
                }
            }
        }
    })();

    const chatItemPress = async(contactData) => {
        const req = await fetch(`${uri}/api/user?_id=${contactData._id}`);
        const res = await req.json();
        if(res.status === 'success') {
            navigation.push('ChatItem', {
                uri: uri,
                userData: {
                    _id: userData._id,
                    contact: contactData,
                },
                contactData: {
                    _id: res.desc[0]._id,
                    about: res.desc[0].about,
                    country: res.desc[0].country,
                    lastSeen: res.desc[0].lastSeen,
                    name: res.desc[0].name,
                    phone: res.desc[0].phone,
                    picture: res.desc[0].picture,
                },
            });
            setUserData(null);
        }
    };

    const Item = () => {
        if(userData !== null && userData.contacts.length === 0) {
            return(
                <View style={s.contentEmpty}>
                    <Text style={s.contentEmptyText}>You don't have any contacts</Text>
                </View>
            );
        }
        else {
            return(
                <ScrollView style={s.content}>
                    {(userData !== null) && userData.contacts.map(r => {
                        return(
                            <TouchableHighlight key={r._id} underlayColor='#87A4EE' onPress={() => chatItemPress(r)}>
                                <View style={s.item}>
                                    <TouchableOpacity style={s.profile} activeOpacity={0.5}>
                                        <Image source={(r.contactPicture === null || r.contactPicture === undefined) ? DefaultPicture : {uri: r.contactPicture}} style={s.profile} />
                                    </TouchableOpacity>
                                    <View style={s.itemWrap}>
                                        <View style={s.itemTop}>
                                            <Text style={s.itemName}>{r.contactName}</Text>
                                            <Text style={s.itemDate}>{r.lastSeen}</Text>
                                        </View>
                                        <View style={s.itemBottom}>
                                            <Text style={s.itemMessage}>{(r.chats !== null) && r.chats[r.chats.length-1].msg}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        );
                    })}
                </ScrollView>
            );
        }
    }

    return(
        <View style={s.screen}>
            <View style={s.header}>
                <View style={s.headerTop}>
                    <Text style={s.chats}>Chats</Text>
                    <View style={s.iconWrap}>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Search style={{marginRight: 25}}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.push('MyProfile', {uri: uri, data: userData}); setUserData(null)}}>
                            <Dots />
                        </TouchableOpacity>
                    </View>
                </View>
                <Gap h={10} />
                <View style={s.headerBottom}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Camera style={s.camera} />
                    </TouchableOpacity>
                    <View style={s.tabs}>
                        <TouchableHighlight style={s.tabItem(true)} underlayColor='#454E55' onPress={() => {}} >
                            <Text style={s.tabItemText(true)}>CHATS</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={s.tabItem(false)} underlayColor='#454E55' onPress={() => {}} >
                            <Text style={s.tabItemText(false)}>STATUS</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={s.tabItem(false)} underlayColor='#454E55' onPress={() => {}} >
                            <Text style={s.tabItemText(false)}>CALLS</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            {Item()}
            <TouchableOpacity style={s.chatsFAB} activeOpacity={0.5} onPress={() => {navigation.push("AddContact", {uri: uri, data: userData}); setUserData(null)}}>
                <AddContact />
            </TouchableOpacity>
        </View>
    );
}
