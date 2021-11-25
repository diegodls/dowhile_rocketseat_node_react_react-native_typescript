import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import LogoSvg from '../../assets/img/logo.svg';

import { UserPhoto } from '../UserPhoto';
import { useAuth } from '../../hooks/auth';

export function Header() {
  const { userLogged, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>
        {userLogged && (
          <TouchableOpacity>
            <Text style={styles.logoutText} onPress={signOut}>
              Sair
            </Text>
          </TouchableOpacity>
        )}
        <UserPhoto imageUri={userLogged?.avatar_url} />
      </View>
    </View>
  );
}
