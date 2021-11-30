import { useEffect, useState } from "react";
import io from "socket.io-client";

import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";

import { api, API_SOCKET_URL } from "../../services/api";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

const messagesQueue: Message[] = [];

const socket = io(API_SOCKET_URL);

socket.on("new_message", (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );

        messagesQueue.shift(); //remover o item mais antigo da fila de mensagens, se não vai ter a mesma key(item repetido)
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api.get("messages/last3").then((response) => {
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt='DoWhile 2021' />

      <ul className={styles.messageList}>
        {messages.length >= 1 ? (
          messages.map((messageItem) => (
            <li className={styles.message} key={messageItem.id}>
              <p className={styles.messageContent}>{messageItem.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img
                    src={messageItem.user.avatar_url}
                    alt={messageItem.user.name}
                  />
                </div>
                <span>{messageItem.user.name}</span>
              </div>
            </li>
          ))
        ) : (
          <div className={styles.messageEmpty}>
            <strong>Sem Mensagens! 😔</strong>
            <p>Seja o primeiro a deixar uma mensagem!</p>
          </div>
        )}
      </ul>
    </div>
  );
}
