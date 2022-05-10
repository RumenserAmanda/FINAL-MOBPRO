import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import { CameraDark, Smile, Attachment, Microphone } from '../assets/icons';
import { ProfilePerson as DefaultPicture, ChatBackground } from '../assets/images';
import { Header } from '../components';

const s = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  chats: {
    flex: 1,
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
  }),
  messageText: {
    fontFamily: 'Helvetica',
    textAlign: 'left',
    color: '#E8ECEE',
    fontSize: 15,
  },
  messageTime: {
    fontFamily: 'Helvetica',
    textAlign: 'right',
    color: '#8696A0',
    fontSize: 12.5,
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

export default function ChatItem({navigation, route}) {
  const uri = route.params.uri;
  const [userData, setUserData] = useState(route.params.userData);
  const [contactData, setContactData] = useState(route.params.contactData);
  const [message, setMessage] = useState(null);
  const scrollViewRef = useRef();

  const sendMessagePress = async() => {
    if(message !== null && message !== '' && message.trim().length !== 0) {
      const reqOpt = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          sender: userData._id,
          receiver: contactData._id,
          message: message,
        }),
      };

      const req = await fetch(`${uri}/api/message`, reqOpt);
      const res = await req.json();
      if(res.status === 'success') {
          setMessage(null);
          
        const reqUserDataNew = await fetch(`${uri}/api/user?_id=${userData._id}`);
        const resUserDataNew = await reqUserDataNew.json();
        if(resUserDataNew.status === 'success') {
          let contactTemp = null;
          resUserDataNew.desc[0].contacts.forEach(r => {
            if(userData.contact._id === r._id) {
              contactTemp = r;
            }
          });
          const userDataTemp = {
            _id: userData._id,
            contact: contactTemp,
          };
          setUserData(userDataTemp);
        }

        const reqContactDataNew = await fetch(`${uri}/api/user?_id=${contactData._id}`);
        const resContactDataNew = await reqContactDataNew.json();
        (resContactDataNew.status === 'success') && setContactData(resContactDataNew.desc[0]);
      }
    }
  };

  return (
    <View style={s.screen}>
      <Header 
        back={'light'} 
        usePicture={true} 
        picture={(contactData.picture === null) ? DefaultPicture : {uri: contactData.picture}} 
        onPressLeft={() => navigation.goBack()} 
        useMid={true} 
        title={userData.contact.contactName} 
        onPressMid={() => navigation.push('Contact', {uri: uri, userData: userData, contactData: contactData})} 
        video={true} 
        phone={true} 
        dots={true} 
      />
      <ImageBackground
        source={ChatBackground}
        style={s.content}
        resizeMode="cover">
        <ScrollView style={s.chats}>
          {(userData.contact.chats !== null) && userData.contact.chats.map(r => {
              return(<TouchableOpacity key={r._id} style={s.message(r.type)} activeOpacity={0.5}>
                  <Text style={s.messageText}>{r.msg}</Text>
                  <Text style={s.messageTime}>{r.date.substring(11, 16)}</Text>
              </TouchableOpacity>)
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
              value={message}
              onChangeText={(val) => setMessage(val)}
            />
            <TouchableOpacity style={s.icon} activeOpacity={0.5}>
              <Attachment />
            </TouchableOpacity>
            <TouchableOpacity style={s.icon} activeOpacity={0.5}>
              <CameraDark />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={s.mic} activeOpacity={0.5} onPress={() => sendMessagePress()}>
            <Microphone />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
