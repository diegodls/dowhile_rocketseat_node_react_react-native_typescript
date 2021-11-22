import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { authorize } from 'react-native-app-auth';
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  avatar_url: string;
  login: string;
};

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

/*

type AuthResponse = {
  token: string;
  user: User;
};

type AuthorizationResponse = {
  params: {
    code?: string;
  };
};

*/

type AuthStateResponse = {
  accessToken?: string;
  authorizeAdditionalParameters?: {};
  idToken?: string;
  refreshToken?: string;
  scopes?: string[];
  tokenAdditionalParameters?: {};
  tokenType?: string;
  authorizationCode?: string;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const CLIENT_ID: string = '4847f282d9816d96cb29';
  const SCOPES: string[] = ['read:user'];

  async function signIn() {
    console.log('Logando - signIn hook');

    setIsSigningIn(true);

    const config = {
      redirectUrl: 'com.diegodls.nlwheat.auth://oauthredirect',
      clientId: CLIENT_ID,
      scopes: SCOPES,
      skipCodeExchange: true,
      serviceConfiguration: {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        revocationEndpoint: `https://github.com/settings/connections/applications/${CLIENT_ID}`,
      },
    };

    try {
      const authState: AuthStateResponse = await authorize(config);
      console.log(`authState: ${authState}`);
      console.log(authState);

      if (authState && authState.authorizationCode) {
        const AuthResponse = await api.post('/authenticate', {
          code: authState.authorizationCode,
        });

        console.log('AuthResponse.data');
        console.log(AuthResponse.data);
      }
      setIsSigningIn(true);
    } catch (error) {
      setIsSigningIn(false);
      throw error;
    }
  }

  async function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isSigningIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
