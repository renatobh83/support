import styles from "../../styles/ChatConverse.module.css";
import Header from "./Header";

export default function ChatConverse() {
  return (
    <>
      <Header />
      <div className={styles.chatConverse}>
        <span className={styles.chatMsgItem + " " + styles.chatMsgItemAdmin}>
          Admin
        </span>
        <span className={styles.chatMsgItem + " " + styles.chatMsgItemUser}>
          User
        </span>
      </div>
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
