import { useState } from "react";
import styles from "../../styles/ChatForm.module.css";
import { useAppContext } from "../context/SupportContext";
export default function ChatForm() {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const { forms } = useAppContext();

  function onSubimit(e) {
    e.preventDefault();
    const data = {
      text,
      email,
    };
    setEmail("");
    setText("");
    forms(data);
  }
  return (
    <div className={styles.chatForm}>
      <div>
        <form className={styles.messageForm} onSubmit={onSubimit}>
          <input
            placeholder="Email"
            value={email}
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            rows="4"
            placeholder="Sua mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button>Enviar</button>
        </form>
      </div>
    </div>
  );
}
