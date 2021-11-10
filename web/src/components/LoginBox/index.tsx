import styles from "./styles.module.scss";
import { VscGithubInverted } from "react-icons/vsc";

import { AuthContext } from "../../contexts/auth";
import { useContext } from "react";

export function LoginBox() {
  const { signInUrl } = useContext(AuthContext);

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signWithGithub}>
        <VscGithubInverted size='24' /> Entrar com Github
      </a>
    </div>
  );
}
