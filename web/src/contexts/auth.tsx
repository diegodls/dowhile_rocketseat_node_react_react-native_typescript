import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

type AuthProvider = {
  children: ReactNode;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  // Sem o redirect configurado no github
  // const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${}&redirect_uri=http://localhost:3000`

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=b962cf1959d2157f54bf`;

  async function signIn(githubCode: string) {
    try {
      const response = await api.post<AuthResponse>("authenticate", {
        code: githubCode.trim(),
        type: "web",
      });
      const { token, user } = response.data;

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      if (token && token !== undefined) {
        localStorage.setItem("@dowhile:token", token);
      }

      if (user && user !== undefined) {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("@dowhile:token");
  }

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");

    if (token && token !== undefined) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>("/profile").then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      window.history.pushState({}, "", urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
