import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import { styles } from './styles';

import { Header } from '../../components/Header';
import { MessageList } from '../../components/MessageList';
import { SignInBox } from '../../components/SignInBox';
import { SendMessageForm } from '../../components/SendMessageForm';
import { useAuth } from '../../hooks/auth';

function Home() {
  const { userLogged } = useAuth();
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Header />
        <MessageList />
        {userLogged ? <SendMessageForm /> : <SignInBox />}
      </View>
    </KeyboardAvoidingView>
  );
}

export default Home;
