import React, { createContext, useContext, useState } from 'react';
import { authorize } from 'react-native-app-auth';

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

type AuthResponse = {
  accessToken?: string;
  authorizeAdditionalParameters?: {};
  idToken?: string;
  refreshToken?: string;
  scopes?: string[];
  tokenAdditionalParameters?: {};
  tokenType?: string;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const CLIENT_ID: string = '4847f282d9816d96cb29';
  const SECRET: string = '7587939c879d409768a2a24b541f688998a47d0d';
  const SCOPES: string[] = ['identity'];

  async function signIn() {
    console.log('Logando - signIn hook');

    setIsSigningIn(true);

    const config = {
      redirectUrl: 'com.diegodls.nlwheat.auth://oauthredirect',
      clientId: CLIENT_ID,
      clientSecret: SECRET,
      scopes: SCOPES,
      additionalHeaders: { Accept: 'application/json' },
      serviceConfiguration: {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        revocationEndpoint: `https://github.com/settings/connections/applications/${CLIENT_ID}`,
      },
    };

    try {
      const authState: AuthResponse = await authorize(config);

      console.log(`Token: ${authState}`);
      console.log(authState);
    } catch (error) {
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
