import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './styles';

function Home() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Home</Text>
        <Text style={styles.textRoboto}>Home</Text>
      </View>
    </>
  );
}

export default Home;
