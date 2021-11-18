import React from 'react';
import { View, Text } from 'react-native';
//import { MotiView } from 'moti'; // Error : TypeError: Cannot read property 'MotiView' of undefined

import { styles } from './styles';

import { UserPhoto } from '../UserPhoto';

export type MessageProps = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar: string;
  };
};

type Props = {
  data: MessageProps;
};

export function Message({ data }: Props) {
  return (
    <>
      {/* <MotiView
        style={styles.container}
        from={{ opacity: 0, translateY: -50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 700 }}> 
        Se for usar o Moti, remover a View container abaixo e deixar somente o moti!!!*/}
      <View style={styles.container}>
        <Text style={styles.message}>{data.text}</Text>
        <View style={styles.footer}>
          <UserPhoto imageUri={data.user.avatar} sizes="SMALL" />
          <Text style={styles.userName}>{data.user.name}</Text>
        </View>
      </View>
      {/* </MotiView> */}
    </>
  );
}
