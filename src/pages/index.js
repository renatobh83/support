import { useState } from "react";
import styles from "../../styles/Home.module.css";

import ChatForm from "./chatForm";
import ChatConverse from "./chatConverse";
export default function Home() {
  const [isVisible, setisVisible] = useState(false);
  function activeOrDeactiveChat() {
    setisVisible(!isVisible);
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.chatBtn}>
          <div
            className={
              isVisible ? styles.chat + " " + styles.isVisible : styles.chat
            }
          >
            <ChatConverse />
            {/* <ChatForm /> */}
          </div>
          <a
            id="prime"
            className={styles.chatIcon}
            onClick={activeOrDeactiveChat}
          >
            {isVisible ? (
              <i className="zmdi zmdi-close"></i>
            ) : (
              <i className="zmdi zmdi-comment-outline"></i>
            )}
          </a>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
