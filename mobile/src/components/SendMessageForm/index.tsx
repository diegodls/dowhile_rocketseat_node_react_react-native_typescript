import React, { useState } from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import { useModal } from '../../hooks/modal';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  const { openModal } = useModal();

  async function handleSendMessage() {
    const messageFormatted = message.trim();

    if (messageFormatted.length > 0) {
      setSendingMessage(true);
      await api
        .post('messages', { message: messageFormatted })
        .then(() => {
          setMessage('');
          Keyboard.dismiss();
          openModal('Sucesso', 'Mensagem enviada com sucesso!');
          setSendingMessage(false);
        })
        .catch(error => {
          console.log(error);
          openModal('Erro', 'Não foi possível enviar a mensagem!');
          setSendingMessage(false);
        });
    } else {
      openModal('Erro', 'Digite uma mensagem antes!');
      setSendingMessage(false);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          keyboardAppearance="dark"
          placeholder="Diga-nos sua expectativa para o evento"
          multiline
          maxLength={140}
          placeholderTextColor={COLORS.WHITE}
          onChangeText={setMessage}
          value={message}
          editable={!sendingMessage}
        />
        <Button
          title="Enviar Mensagem"
          backgroundColor={COLORS.PINK}
          color={COLORS.WHITE}
          isLoading={sendingMessage}
          onPress={handleSendMessage}
        />
      </View>
    </>
  );
}
