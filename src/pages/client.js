import { useEffect, useState } from "react";

import styles from "../../styles/Client.module.css";

import ChatForm from "./chatForm";
import ChatConverse from "./chatConverse";
import { useAppContext } from "../context/SupportContext";
import { disconnectSocket, initiateSocket } from "../utils/SocketConnect.js";
import { ClearValues } from "../utils/CleanValues.js";

export default function Client() {
  const { formValue, forms, clientMessage, clearMessages } = useAppContext();
  const [isVisible, setisVisible] = useState(false);
  const [isForm, setIsForm] = useState(true);

  function activeOrDeactiveChat() {
    setisVisible(!isVisible);
    if (isVisible) {
      setIsForm(true);
      ClearValues(forms, clearMessages);
      disconnectSocket();
    }
  }

  function clientSocket() {
    if (!isForm) {
      const socket = initiateSocket();
      socket.on("connect", () => {
        const params = {
          email: formValue.email,
          text: formValue.text,
        };
        socket.emit("first_acess_client", params, (call, err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(call);
          }
        });
      });
      socket.on("client_list_all_messages", (messages) => {
        clientMessage(messages);
      });
    }
  }
  useEffect(() => {
    clientSocket();
  }, [!isForm]); // eslint-disable-line
  useEffect(() => {
    if (formValue.email != undefined) {
      setIsForm(false);
    }
  }, [formValue.email]);
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
    </div>
  );
}
