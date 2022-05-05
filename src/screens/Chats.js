import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, ScrollView, Image, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');

import { SearchDark as Search, DotsDark as Dots, CameraDark as Camera, AddContact } from '../assets/icons';
import { ProfilePerson as DefaultPicture } from '../assets/images';
import { Gap } from '../components';

// import Data from '../data';

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
    whatsApp: {
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

export default function Chats({route, navigation}) {
    const userData = route.params;

    const Item = () => {
        if(userData.contacts === undefined || userData.contacts === null || userData.contacts.length === 0) {
            return(
                <View style={s.contentEmpty}>
                    <Text style={s.contentEmptyText}>You don't have any contacts</Text>
                </View>
            );
        }
        else {
            return(
                <ScrollView style={s.content}>
                    {userData.contacts.map(r => {
                        return(
                            <TouchableHighlight key={r._id} underlayColor='#87A4EE' onPress={() => navigation.push('ChatItem', r)}>
                                <View style={s.item}>
                                    <TouchableOpacity style={s.profile} activeOpacity={0.5}>
                                        {/* <Image source={(r.picture === null) ? DefaultPicture : r.picture} style={s.profile} /> */}
                                        <Image source={(r.picture === undefined) ? DefaultPicture : r.picture} style={s.profile} />
                                    </TouchableOpacity>
                                    <View style={s.itemWrap}>
                                        <View style={s.itemTop}>
                                            <Text style={s.itemName}>{r.name}</Text>
                                            {/* <Text style={s.itemDate}>{r.lastSeen}</Text> */}
                                            <Text style={s.itemDate}>r.lastSeen</Text>
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
                    <Text style={s.whatsApp}>Chats</Text>
                    <View style={s.iconWrap}>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Search style={{marginRight: 25}}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.push('MyProfile', userData)}>
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
            <TouchableOpacity style={s.chatsFAB} activeOpacity={0.5} onPress={() => navigation.push("AddContact", userData)}>
                <AddContact />
            </TouchableOpacity>
        </View>
    );
}
