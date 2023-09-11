import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, TextInput, Button} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/app';

function Chat({route}) {
  const {chatId, otherUser} = route.params;
  const [messages, setMessages] = useState([]);
  const user = auth().currentUser;

  useEffect(() => {
    const chatRef = firestore()
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

  const onSend = (newMessages = []) => {
    const message = newMessages[0];
    firestore().collection('chats').doc(chatId).collection('messages').add({
      text: message.text,
      sender: user.uid,
      createdAt: new Date(),
    });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{_id: user.uid}}
    />
  );
}

export default Chat;
