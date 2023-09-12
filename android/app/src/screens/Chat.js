import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/authContext';

function Chat({route}) {
  const {chatId, otherUser} = route.params;
  console.log(chatId);
  console.log(otherUser);
  const [messages, setMessages] = useState([]);
  const user = auth().currentUser;
  const firestoreForDefaultApp = firestore();
  const [state, setState] = useContext(AuthContext);
  const [text, SetText] = useState('');

  useEffect(() => {
    const chatRef = firestoreForDefaultApp
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(20);

    const unsubscribe = chatRef.onSnapshot(querySnapshot => {
      const messagesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const firebaseMessage = {
          ...data,
          createdAt: data.createdAt.toDate(),
        };
        return firebaseMessage;
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [chatId]);

  const renderMessage = ({item}) => {
    console.log('rendering msg =>', item);
    const isSent = item.sender === state.user;
    return (
      <View
        style={{
          alignSelf: isSent ? 'flex-end' : 'flex-start',
          backgroundColor: isSent ? 'lightblue' : 'lightgray',
          borderRadius: 5,
          margin: 5,
          padding: 10,
        }}>
        <Text>{item.text}</Text>
        {/* <Text>{item.createdAt}</Text> */}
      </View>
    );
  };

  const onSend = (newMessages = []) => {
    const message = newMessages[0];
    firestoreForDefaultApp
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        text: message.text,
        sender: state.user,
        createdAt: new Date(),
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'flex-start', marginTop: 30}}>
      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={renderMessage}
        inverted
      />
      <GiftedChat
        messages={[]}
        onSend={newMessages => onSend(newMessages)}
        user={{_id: state.user}}
        renderInputToolbar={() => (
          <View
            style={{marginLeft: 10, marginVertical: -20, flexDirection: 'row'}}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 10,
                width: '80%',
              }}
              placeholder="Type a message..."
              onChangeText={text => SetText(text)}
              // value={messages.length > 0 ? messages[0].text : ''}
            />
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center'}}
              onPress={() => onSend([{text}])}>
              <Text
                style={{
                  backgroundColor: 'grey',
                  alignSelf: 'center',
                  width: '80%',
                  height: 50,
                  borderRadius: 25,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  fontSize: 30,
                }}>
                >>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default Chat;
