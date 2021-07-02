import styles from "../../styles/Header.module.css";
export default function Header() {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.chatOption}>
        <div className={styles.headerImg}>
          {/* <img src="http://res.cloudinary.com/dqvwa7vpe/image/upload/v1496415051/avatar_ma6vug.jpg" /> */}
        </div>
        <span id="chat_head">Suporte</span>
        <br />
        <span className={styles.agent}>Em atendimento </span>
        <span className={styles.online}>(Online)</span>
      </div>
    </div>
  );
}
