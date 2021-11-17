import React from 'react';
import { View, Text } from 'react-native';
import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

export function Message() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.message}>Message</Text>
        <View style={styles.footer}>
          <UserPhoto
            imageUri="https://www.github.com/diegodls.png"
            sizes="SMALL"
          />
          <Text style={styles.userName}>Usuário</Text>
        </View>
      </View>
    </>
  );
}
