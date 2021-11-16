import React from 'react';
import {StatusBar} from 'react-native';

import Home from './src/screens/Home';

import {COLORS} from './src/theme';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.BLACK_SECONDARY}
      />
      <Home />
    </>
  );
};

export default App;
