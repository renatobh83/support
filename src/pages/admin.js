import { useEffect, useState } from "react";
import { initiateSocket, disconnectSocket } from "../utils/SocketConnect.js";
import ChatWithSupport from "../components/ChatWithSupport.js";
import styles from "../../styles/Admin.module.css";
import { useAppContext } from "../context/SupportContext.js";

export default function Admin() {
  const { getSocket, socket } = useAppContext();
  const [waitSupport, setWatiSupport] = useState([]);
  const [inSupport, setInSupport] = useState({});
  const [messagesClient, setMessagesClient] = useState([]);

  function socketAdmin() {
    const socketIo = initiateSocket();
    getSocket(socketIo);
    socketIo.on("admin_list_all_users", (connections) => {
      setWatiSupport(connections);
    });

    socketIo.on("admin_receive_message", (message) => {
      setMessagesClient(message.message);
    });
  }

  const close = () => {
    setInSupport({ ...inSupport, active: false });
  };
  const call = (id) => {
    const connection = waitSupport.find(
      (connection) => connection.socket_id === id
    );
    setInSupport({
      id: connection.user_id,
      email: connection.user.email,
      active: true,
    });
    const params = {
      user_id: connection.user_id,
    };
    socket.emit("admin_list_messages_by_user", params, (messages) => {
      setMessagesClient(messages);
    });
  };

  function sendMessage(params) {
    params.user_id = inSupport.id;
    socket.emit("admin_send_message", params, (messages) => {
      setMessagesClient(messages);
    });
  }
  useEffect(() => {
    socketAdmin();
    return () => disconnectSocket();
  }, []);
  return (
    <div className={styles.adminContainer}>
      <span>Clientes aguardando atendimento</span>
      {waitSupport.map((user) => (
        <div key={user.socket_id} className={styles.userList} id={user.user_id}>
          <span className={styles.email}>{user.user.email}</span>
          <button
            className={styles.btnAtd}
            onClick={() => call(user.socket_id)}
          >
            Entrar em atendimento
          </button>
        </div>
      ))}
      {inSupport.active && (
        <div className={styles.admin}>
          <span className={styles.inSupport}>
            Em atendimento - <strong> {inSupport.email} </strong>
            <i className="zmdi zmdi-close" onClick={close}></i>
          </span>
          <ChatWithSupport messagesClient={messagesClient} send={sendMessage} />
        </div>
      )}
    </div>
  );
}
