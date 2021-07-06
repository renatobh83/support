import { useEffect, useState } from "react";

import styles from "../../styles/Client.module.css";

import ChatForm from "../components/chatForm";
import ChatWithConstomer from "../components/ChatWithCustomer";
import Header from "../components/Header";
import { useAppContext } from "../context/SupportContext";
import { disconnectSocket, initiateSocket } from "../utils/SocketConnect.js";
import { ClearValues } from "../utils/CleanValues.js";

export default function Client() {
  const {
    formValue,
    forms,
    clientMessage,
    clearMessages,
    sokcet_admin,
    getSocket,
  } = useAppContext();
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
      getSocket(socket);
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
      socket.on("admin_send_to_client", (params) => {
        clientMessage(params.allMessages);
        sokcet_admin(params.socket_id);
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
            {isForm ? (
              <ChatForm />
            ) : (
              <>
                <Header /> <ChatWithConstomer />
              </>
            )}
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
