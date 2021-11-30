import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { io } from 'socket.io-client';

import { api } from '../../services/api';

import { Message, MessageProps } from '../Message';

import { styles } from './styles';

let messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));

socket.on('new_message', newMessage => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProps[]>('messages/last3');
      setCurrentMessages(messagesResponse.data);
    }

    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages(prevState =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean),
        );
        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {currentMessages.length > 0 ? (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollViewContainer}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="never">
            {currentMessages.map(message => (
              <Message key={message.id} data={message} />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.noMessagesContainer}>
          <Text style={styles.noMessagesTitle}>Sem Mensagens!</Text>
          <Text style={styles.noMessagesSubTitle}>
            Seja o primeiro a deixar uma mensagem!
          </Text>
        </View>
      )}
    </>
  );
}
