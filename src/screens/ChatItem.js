import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import {CameraDark, Smile, Attachment, Microphone, Chat} from '../assets/icons';
import {ChatItemBg, ChatBackground} from '../assets/images';
import {Header} from '../components';

const s = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  chats: {
    flex: 1,

    // borderWidth: 1,
    // borderColor: 'white',
  },
  message: type => ({
    marginVertical: 5,
    marginRight: type === 'send' ? 10 : 100,
    marginLeft: type === 'receive' ? 10 : 100,
    padding: 7.5,
    alignSelf: type === 'send' ? 'flex-end' : 'flex-start',
    backgroundColor: '#87A4EE',
    // borderRadius: 10,
    borderTopLeftRadius: type === 'send' ? 10 : 0,
    borderTopRightRadius: type === 'send' ? 0 : 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

    // borderWidth: 1,
    // borderColor: 'red',
  }),
  messageText: {
    fontFamily: 'Helvetica',
    textAlign: 'left',
    color: '#E8ECEE',
    fontSize: 15,

    // borderWidth: 1,
    // borderColor: 'green',
  },
  messageTime: {
    fontFamily: 'Helvetica',
    textAlign: 'right',
    color: '#8696A0',
    fontSize: 12.5,

    // borderWidth: 1,
    // borderColor: 'blue',
  },
  bottom: {
    paddingTop: 10,
    paddingBottom: 2.5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#010202',
  },
  input: {
    paddingVertical: 7.5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#21325E',
    borderRadius: 50,
  },
  icon: {
    marginHorizontal: 10,
  },
  inputText: {
    fontFamily: 'Helvetica',
    padding: 0,
    flex: 1,
    color: '#E9EDEF',
    fontSize: 17.5,
  },
  mic: {
    marginLeft: 5,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#87A4EE',
    borderRadius: 50 / 2,
  },
});

export default function ChatItem({route, navigation}) {
  const [contactData, setContactData] = useState(route.params);

  return (
    <View style={s.screen}>
      {/* <Header back={'light'} usePicture={true} picture={(contactData.picture !== null) ? contactData.picture : null} onPressLeft={() => navigation.goBack()} useMid={true} title={contactData.name} text={`last seen at ${contactData.lastSeen}`} onPressMid={() => navigation.push('Contact', contactData)} video={true} phone={true} dots={true} /> */}
      <Header
        back={'light'}
        usePicture={true}
        picture={contactData.picture !== undefined ? contactData.picture : null}
        onPressLeft={() => navigation.goBack()}
        useMid={true}
        title={'Amanda'}
        onPressMid={() => navigation.push('Contact', contactData)}
        video={true}
        phone={true}
        dots={true}
      />
      <ImageBackground
        source={ChatBackground}
        style={s.content}
        resizeMode="cover">
        <ScrollView style={s.chats}>
          {contactData.chats !== null &&
            contactData.chats.map(r => {
              return (
                <TouchableOpacity style={s.message(r.type)} activeOpacity={0.5}>
                  <Text style={s.messageText}>{r.msg}</Text>
                  <Text style={s.messageTime}>{r.date}</Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
        <View style={s.bottom}>
          <View style={s.input}>
            <TouchableOpacity style={s.icon} activeOpacity={0.25}>
              <Smile />
            </TouchableOpacity>
            <TextInput
              style={s.inputText}
              placeholder="Message"
              placeholderTextColor="#8696A0"
            />
            <TouchableOpacity style={s.icon} activeOpacity={0.5}>
              <Attachment />
            </TouchableOpacity>
            <TouchableOpacity style={s.icon} activeOpacity={0.5}>
              <CameraDark />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={s.mic} activeOpacity={0.5}>
            <Microphone />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
