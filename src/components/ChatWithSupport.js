import { useState } from "react";
import styles from "../../styles/ChatWithSupport.module.css";
import { useAppContext } from "../context/SupportContext";

export default function ChatWithSupport({ messagesClient, send }) {
  const { socket } = useAppContext();
  const [messageText, setMessageText] = useState("");

  const chatActive = messagesClient.map((message) => {
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
          key={message.id}
          className={styles.chatMsgItem + " " + styles.chatMsgItemAdmin}
        >
          {message.text}
        </span>
      );
    }
  });

  function sendMessage() {
    const params = {
      text: messageText,
    };
    send(params);
    setMessageText("");
  }
  return (
    <>
      <div className={styles.chatConverse}>{chatActive}</div>
      <div className={styles.fabField}>
        <a id="fab_send" className={styles.chatIcon + " " + styles.send}>
          <i className="zmdi zmdi-mail-send" onClick={() => sendMessage()}></i>
        </a>
        <textarea
          id="chatSend"
          name="chat_message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Enviar uma mensagem"
          className={styles.chatField + " " + styles.chatMessage}
        ></textarea>
      </div>
    </>
  );
}
