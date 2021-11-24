import React, { useState } from 'react';
import { View, TextInput, Alert, Keyboard } from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleSendMessage() {
    const messageFormatted = message.trim();
    if (messageFormatted.length > 0) {
      setSendingMessage(true);
      await api.post('messages', { message: messageFormatted });
      setMessage('');
      Keyboard.dismiss();
      Alert.alert('Mensagem enviada com sucesso!');
      setSendingMessage(false);
    } else {
      Alert.alert('Erro', 'Por favor, preencha o campo de mensagem');
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
