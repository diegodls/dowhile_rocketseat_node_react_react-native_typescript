import { useEffect, useState } from "react";
import io from "socket.io-client";

import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";

import { api } from "../../services/api";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

const messagesQueue: Message[] = [];

const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage: Message) => {
  console.log("new_message", newMessage);

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
        {messages ? (
          messages.map((message) => (
            <li className={styles.message} key={message.id}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          ))
        ) : (
          <p className={styles.messageContent}>Sem Mensagens ! 😔</p>
        )}
      </ul>
    </div>
  );
}
