import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MessageList";
import { SendMessageForm } from "./components/SendMessageForm";
import { Modal } from "./components/Modal";
import { useAuth } from "./contexts/auth";

import styles from "./App.module.scss";
import { Footer } from "./components/Footer";

export function App() {
  const { user } = useAuth();

  return (
    <main>
      <div
        className={`${styles.contentWrapper} ${
          !!user ? styles.contentSigned : ""
        }`}
      >
        <MessageList />
        {!!user ? <SendMessageForm /> : <LoginBox />}
        <Modal />
      </div>
      <Footer />
    </main>
  );
}
