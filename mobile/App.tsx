import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/hooks/auth';

import Home from './src/screens/Home';

import { COLORS } from './src/theme';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Home />
    </AuthProvider>
  );
};

export default App;
