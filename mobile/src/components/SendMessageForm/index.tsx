import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
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
        />
      </View>
    </>
  );
}
