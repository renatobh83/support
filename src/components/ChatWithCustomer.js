import styles from "../../styles/ChatWithCustomer.module.css";
import { useAppContext } from "../context/SupportContext";
export default function Conversartions() {
  const { arrayMessages, textMessage, setText, send } = useAppContext();

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
          key={message.id}
          className={styles.chatMsgItem + " " + styles.chatMsgItemAdmin}
        >
          {" "}
          {message.text}
        </span>
      );
    }
  });

  return (
    <>
      <div className={styles.chatConverse}>{chatActive}</div>
      <div className={styles.fabField}>
        <a
          id="fab_send"
          className={styles.chatIcon + " " + styles.send}
          onClick={send}
        >
          <i className="zmdi zmdi-mail-send"></i>
        </a>
        <textarea
          id="chatSend"
          name="chat_message"
          value={textMessage}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enviar uma mensagem"
          className={styles.chatField + " " + styles.chatMessage}
        ></textarea>
      </div>
    </>
  );
}
