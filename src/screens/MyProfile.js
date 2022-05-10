import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, TouchableHighlight, Text, TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';

import { CameraLight as Camera, Person, Pen, Info, PhoneDark as Phone } from '../assets/icons';
import { ProfilePerson as DefaultPicture } from '../assets/images';
import { Header, Gap } from '../components';

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
        color: '#21325E',
    },
    content: {
        marginTop: 25,
        color: '#21325E',
    },
    picture: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    camera: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#87A4EE',
        borderRadius: 50/2,
    },
    line: {
        marginLeft: 70,
        borderBottomWidth: 1,
        borderBottomColor: '#222D34',
    },
    item: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        flexDirection: 'row',
        color: '#21325E',
    },
    icon: {
        marginRight: 25,
    },
    itemWrap: {
        flex: 1,
        color: '#21325E',
    },
    itemTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#21325E',
    },
    itemTitle: {
        fontFamily: 'Helvetica',
        color: '#8696A0',
        fontSize: 15,
    },
    itemText: {
        fontFamily: 'Helvetica',
        color: '#E9EDEF',
        fontSize: 17.5,
    },
    itemSubText: {
        fontFamily: 'Helvetica',
        color: '#8696A0',
        fontSize: 12.5,
    },

    overlayScreen: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
    },
    overlay: {
        padding: 20,
        backgroundColor: '#21325E',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    overlayText: (type) => ({
        marginTop: (type === 'input') ? 10 : null,
        marginBottom: (type === 'input') ? 30 : null,
        fontFamily: 'Helvetica',
        color: '#E9EDEF',
        fontSize: 15,
        borderBottomWidth: (type === 'input') ? 2.5 : null,
        borderBottomColor: (type === 'input') ? '#21325E' : null,
    }),
    overlayPressWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    overlayPressText: {
        fontFamily: 'Helvetica',
        color: '#21325E',
        fontSize: 15,
    },
});

export default function MyProfile({navigation, route}) {
    const uri = route.params.uri;
    const [userData, setUserData] = useState(route.params.data);
    const [userPictureTemp, setUserPictureTemp] = useState(userData.picture);
    const [userNameTemp, setUserNameTemp] = useState(userData.name);
    const [userAboutTemp, setUserAboutTemp] = useState(userData.about);
    const [overlay, setOverlay] = useState([false, null]);

    const imagePress = async() => {
        try {
            const result = await launchImageLibrary({
                maxHeight: 150,
                maxWidth: 150,
                includeBase64: true,
            });
            
            if(!result.didCancel) {
                const reqOpt = {
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        uri: result.assets[0].uri,
                    }),
                };
    
                const req = await fetch(`${uri}/api/user/picture?_id=${userData._id}`, reqOpt);
                const res = await req.json();
                (res.status === 'success') && setUserPictureTemp(result.assets[0].uri);

                showMessage(s.showMessage({
                    type: res.status,
                    title: res.message,
                }));
            }
        }
        catch(e) {
            showMessage(s.showMessage({
                type: 'Error',
                title: "Unable to open image.",
            }));
        }
    };

    const ItemWrap = (title, text, subText, pen) => {
        return(
            <View style={s.itemWrap}>
                <View style={s.itemTop}>
                    <View>
                        <Text style={s.itemTitle}>{title}</Text>
                        <Text style={s.itemText}>{text}</Text>
                    </View>
                    {(pen) && <Pen />}
                </View>
                {(subText !== null) && <Text style={s.itemSubText}>{subText}</Text>}
            </View>
        );
    }

    const overlaySavePress = async() => {
        try {
            const reqOpt = {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: (overlay[1] === 'name') ? JSON.stringify({name: userNameTemp}) : JSON.stringify({about: userAboutTemp}),
            };
    
            if(userNameTemp !== null && userNameTemp !== '' && userNameTemp.trim().length !== 0 && userAboutTemp !== null && userAboutTemp !== '' && userAboutTemp.trim().length !== 0) {
                const req = await fetch(`${uri}/api/user/${(overlay[1] === 'name') ? 'name' : 'about'}?_id=${userData._id}`, reqOpt);
                const res = await req.json();
                if(res.status === 'success') {
                    const reqNewData = await fetch(`${uri}/api/user?_id=${userData._id}`);
                    const resNewData = await reqNewData.json();
                    if(resNewData.status === 'success') {
                        setUserData(resNewData.desc[0]);
                        setUserNameTemp(userData.name);
                        setUserAboutTemp(userData.about);
                    }
                }
                showMessage(s.showMessage({
                    type: res.status,
                    title: res.message,
                }));
            }
        }
        catch(e) {
            showMessage(s.showMessage({
                type: 'error',
                title: "Unable to save changes",
            }));
        }
    }

    return(
        <View style={s.screen}>
            <Header back={'dark'} title="My Profile" onPressLeft={() => navigation.goBack()} />
            <View style={s.content}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => imagePress()}>
                <ImageBackground source={(userPictureTemp === null) ? DefaultPicture : {uri: userPictureTemp}} style={s.picture} imageStyle={{borderRadius: 150/2}}>
                        <View style={s.camera}>
                            <Camera />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <Gap h={50} />

            <TouchableHighlight disabled={overlay[0]} underlayColor='#21325E' onPress={() => setOverlay([true, 'name'])}>
                <View style={s.item}>
                    <Person style={s.icon} />
                    {ItemWrap('Name', userData.name, "This is not your username or pin. This name will be visible to your WhatsApp contacts.", true)}
                </View>
            </TouchableHighlight>
            <View style={s.line} />
            <TouchableHighlight disabled={overlay[0]} underlayColor='#21325E' onPress={() => setOverlay([true, 'about'])}>
                <View style={s.item}>
                    <Info style={s.icon} />
                    {ItemWrap('About', userData.about, null , true)}
                </View>
            </TouchableHighlight>
            <View style={s.line} />
            <TouchableHighlight underlayColor='#21325E' onPress={() => {}}>
                <View style={s.item}>
                    <Phone style={s.icon} />
                    {ItemWrap('Phone', `+${userData.country.code}${userData.phone}`, null, false)}
                </View>
            </TouchableHighlight>



            {(overlay[0]) && <View style={s.overlayScreen}>
                <View style={s.overlay}>
                    <Text style={s.overlayText('noninput')}>{(overlay[1] === 'name') ? "Enter your name" : "Add About"}</Text>
                    <TextInput style={s.overlayText('input')} value={(overlay[1] === 'name') ? userNameTemp : userAboutTemp} onChangeText={(val) => (overlay[1] === 'name') ? setUserNameTemp(val) : setUserAboutTemp(val)} />
                    <View style={s.overlayPressWrap}>
                        <TouchableOpacity style={{marginRight: 50}} activeOpacity={0.5} onPress={() => setOverlay([false, null])}>
                            <Text style={s.overlayPressText}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => {setOverlay([false, null]); overlaySavePress()}}>
                            <Text style={s.overlayPressText}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>}
        </View>
    );
}
