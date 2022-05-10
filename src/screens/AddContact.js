import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

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
  },
  content: {
    paddingVertical: 25,
    paddingHorizontal: 50,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1C2342',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    height: '100%',
    paddingLeft: 5,
    textAlignVertical: 'center',
    fontFamily: 'Helvetica',
    color: '#FFFFFF',
    fontSize: 15,
    borderBottomWidth: 2.5,
    borderBottomColor: '#21325E',
  },
  input: {
    flex: 1,
    marginLeft: 5,
    paddingRight: 5,
    textAlignVertical: 'center',
    fontFamily: 'Helvetica',
    color: '#FFFFFF',
    fontSize: 15,
    borderBottomWidth: 2.5,
    borderBottomColor: '#21325E',
  },
  button: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#21325E',
    borderRadius: 5,
    shadowColor: '#0C1D24',
    elevation: 2.5,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Helvetica',
    color: '#FFFF',
    fontSize: 15,
  },
});

export default function Chats({navigation}) {
  const uri = route.params.uri;
  const [userData, setUserData] = useState(route.params.data);
  const [name, setName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const addContactPress = async() => {
    if(name !== null && name !== '' && phoneNumber !== null && phoneNumber !== '' && userData.phone !== phoneNumber) {
      const reqOpt = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: name,
          phone: phoneNumber,
          contacts: userData.contacts,
        }),
      };

      if(name !== null && name !== '' && name.trim().length !== 0 && phoneNumber !== null && phoneNumber !== '' && phoneNumber.trim().length !== 0) {
        const req = await fetch(`${uri}/api/user/addaccount?_id=${userData._id}`, reqOpt);
        const res = await req.json();
        if(res.status === 'success') {
          const reqUserDataNew = await fetch(`${uri}/api/user?_id=${userData._id}`);
          const resUserDataNew = await reqUserDataNew.json();
          if(resUserDataNew.status === 'success') {
            setUserData(resUserDataNew.desc[0]);
            setName(null);
            setPhoneNumber(null);
          }
        }

        (res.status === 'success') ? showMessage(s.showMessage({
          type: 'success',
          title: res.message,
        })) : showMessage(s.showMessage({
          type: 'error',
          title: res.message,
          desc: res.desc,
        }));
      }
    }
    else {
      showMessage(s.showMessage({
        type: 'error',
        title: "Oops! Terjadi kesalahan",
        desc: "Tidak dapat menambahkan kontak baru. Coba lagi nanti.",
      }));
    }
  }
  
  return (
    <View style={s.screen}>
      <Header
        back="light"
        title="Add Contact"
        onPressLeft={() => navigation.goBack()}
      />
      <View style={s.content}>
        <View style={s.wrap}>
          <Text style={s.title}>Name :</Text>
          <TextInput
            style={s.input}
            placeholder="Enter name here"
            placeholderTextColor="#96A0A9"
            val={name} onChangeText={(val) => setName(val)}
          />
        </View>
        <View style={s.wrap}>
          <Text style={s.title}>Phone Number :</Text>
          <TextInput
            style={s.input}
            keyboardType="numeric"
            placeholder="Enter phone number here"
            placeholderTextColor="#96A0A9"
            val={phoneNumber} onChangeText={(val) => setPhoneNumber(val.replace(/\s/g, ''))}
          />
        </View>
        <Gap h={50} />
        <TouchableOpacity
          style={s.button}
          activeOpacity={0.5}
          onPress={() => addContactPress()}>
          <Text style={s.buttonText}>ADD CONTACT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}