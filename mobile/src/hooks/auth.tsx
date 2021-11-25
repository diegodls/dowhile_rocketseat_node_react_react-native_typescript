import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authorize } from 'react-native-app-auth';
import { api } from '../services/api';

const REDIRECT_URL: string = 'com.diegodls.nlwheat.auth://oauthredirect';
const CLIENT_ID: string = '4847f282d9816d96cb29';
const SCOPES: string[] = ['read:user'];
const USER_STORAGE: string = '@nlwheat:user';
const TOKEN_STORAGE: string = '@nlwheat:token';

type User = {
  id: string;
  name: string;
  avatar_url: string;
  login: string;
};

type AuthContextData = {
  userLogged: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type OauthGithubResponse = {
  token: string;
  user: User;
};

type AuthorizationGithubResponse = {
  authorizationCode?: string;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [userLogged, setUserLogged] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(true);

  async function signIn() {
    const oauthGithubConfig = {
      redirectUrl: REDIRECT_URL,
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
      setIsSigningIn(true);
      const oauthGithubResponse: AuthorizationGithubResponse = await authorize(
        oauthGithubConfig,
      );

      if (oauthGithubResponse && oauthGithubResponse.authorizationCode) {
        const authResponse = await api.post('/authenticate', {
          code: oauthGithubResponse.authorizationCode,
          type: 'mobile',
        });
        const { token, user } = authResponse.data as OauthGithubResponse;

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        if (token && token !== undefined && user && user !== undefined) {
          await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
          await AsyncStorage.setItem(TOKEN_STORAGE, token);

          setUserLogged(user);
        }
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.code);
    } finally {
      setIsSigningIn(false);
    }
  }

  async function signOut() {
    setUserLogged(null);
    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (userStorage && tokenStorage) {
        api.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
        setUserLogged(JSON.parse(userStorage));
      } else {
        setUserLogged(null);
      }

      setIsSigningIn(false);
    }
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ userLogged, isSigningIn, signIn, signOut }}>
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
