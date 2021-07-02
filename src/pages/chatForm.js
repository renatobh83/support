import styles from "../../styles/ChatForm.module.css";
export default function ChatForm() {
  return (
    <div className={styles.chatForm}>
      <div>
        <form className={styles.messageForm}>
          <input placeholder="Email" type="email" />
          <textarea rows="4" placeholder="Sua mensagem"></textarea>
          <button>Enviar</button>
        </form>
      </div>
    </div>
  );
}
