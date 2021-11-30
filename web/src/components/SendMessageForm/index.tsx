import { FormEvent, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { useAuth } from "../../contexts/auth";
import { useModal } from "../../contexts/modal";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export function SendMessageForm() {
  const [message, setMessage] = useState("");

  const { user, signOut } = useAuth();
  const { openModal } = useModal();

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    if (message.trim()) {
      await api
        .post("messages", { message })
        .then(() => {
          setMessage("");
        })
        .catch(() => {
          openModal("Erro", "Não foi possível enviar a mensagem!");
        });
    } else {
      openModal("Erro", "Digite uma mensagem antes!");
      return;
    }
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size='32' />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size='16' />
          <strong className={styles.userLogin}> {user?.login}</strong>
        </span>
      </header>
      <form className={styles.sendMessageForm}>
        <label htmlFor='message'>Mensagem</label>
        <textarea
          name='message'
          id='message'
          placeholder='Qual sua expectativa para o evento?'
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          minLength={1}
          maxLength={140}
        />
        <div className={styles.sendButtonContainer}>
          <p>{140 - message.length}</p>
          <button onClick={handleSendMessage} type='submit'>
            Enviar Mensagem
          </button>
        </div>
      </form>
    </div>
  );
}
