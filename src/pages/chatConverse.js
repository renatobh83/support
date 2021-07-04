import { useEffect } from "react";
import styles from "../../styles/ChatConverse.module.css";
import { useAppContext } from "../context/SupportContext";
import Header from "./Header";

export default function ChatConverse() {
  const { arrayMessages } = useAppContext();

  const chatActive = arrayMessages.map((message) => {
    if (message.admin_id === null) {
      return (
        <span
          key={message.id}
          className={styles.chatMsgItem + " " + styles.chatMsgItemUser}
        >
          {message.text}
        </span>
      );
    } else {
      return (
        <span
          className={styles.chatMsgItem + " " + styles.chatMsgItemAdmin}
        ></span>
      );
    }
  });

  return (
    <>
      <Header />
      <div className={styles.chatConverse}>{chatActive}</div>
      <div className={styles.fabField}>
        <a id="fab_send" className={styles.chatIcon + " " + styles.send}>
          <i className="zmdi zmdi-mail-send"></i>
        </a>
        <textarea
          id="chatSend"
          name="chat_message"
          placeholder="Enviar uma mensagem"
          className={styles.chatField + " " + styles.chatMessage}
        ></textarea>
      </div>
    </>
  );
}
