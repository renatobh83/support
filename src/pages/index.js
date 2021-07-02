import { useEffect, useState } from "react";

import styles from "../../styles/Home.module.css";

import ChatForm from "./chatForm";
import ChatConverse from "./chatConverse";
import { useAppContext } from "../context/SupportContext";

export default function Home() {
  const { forms, email } = useAppContext();
  const [isVisible, setisVisible] = useState(false);
  const [isForm, setIsForm] = useState(true);

  function activeOrDeactiveChat() {
    setisVisible(!isVisible);
    setIsForm(true);
    forms({});
  }
  useEffect(() => {
    if (email != undefined) {
      setIsForm(false);
    }
  }, [email]);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.chatBtn}>
          <div
            className={
              isVisible ? styles.chat + " " + styles.isVisible : styles.chat
            }
          >
            {isForm ? <ChatForm /> : <ChatConverse />}
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
