import React from 'react';
import { StatusBar } from 'react-native';
import { CustomModal } from './src/components/Modal';
import { AuthProvider } from './src/hooks/auth';
import { ModalProvider } from './src/hooks/modal';

import Home from './src/screens/Home';

const App = () => {
  return (
    <ModalProvider>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Home />
        <CustomModal />
      </AuthProvider>
    </ModalProvider>
  );
};

export default App;
