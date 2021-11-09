import { useEffect } from "react";

import styles from "./styles.module.scss";

import { VscGithubInverted } from "react-icons/vsc";

import { api } from "../../services/api";

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

export function LoginBox() {
  // Sem o redirect configurado no github
  // const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${}&redirect_uri=http://localhost:3000`

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${"70e16479b18e4ea349cd"}`;

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>("authenticate", {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem("@dowhile:token", token);

    console.log(user);
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");
      console.log({ urlWithoutCode, githubCode });

      window.history.pushState({}, "", urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signWithGithub}>
        <VscGithubInverted size='24' /> Entrar com Github
      </a>
    </div>
  );
}
