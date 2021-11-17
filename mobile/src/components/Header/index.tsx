import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import LogoSvg from '../../assets/img/logo.svg';

import { UserPhoto } from '../UserPhoto';

export function Header() {
  return (
    <View style={styles.container}>
      <LogoSvg />
      <View style={styles.logoutButton}>
        <TouchableOpacity>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
        <UserPhoto imageUri="https://www.github.com/diegodls.png" />
      </View>
    </View>
  );
}
