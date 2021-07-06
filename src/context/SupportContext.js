import { createContext, useContext, useEffect, useState } from "react";

import { initiateSocket } from "../utils/SocketConnect.js";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export function Provider({ children }) {
  const [valueForm, setValueForm] = useState({});
  const [messageClient, setMessageClient] = useState([]);
  const [socket, setSocket] = useState({});
  const [socketInSupport, setSocketInSupport] = useState();
  const [textMessage, setTextMessage] = useState("");

  let arrayMessages;
  function getMessageClient(messages) {
    setMessageClient(...messageClient, messages);
  }
  arrayMessages = messageClient;

  function clearMessages() {
    setMessageClient([]);
  }
  function getSocket(value) {
    setSocket(value);
  }
  function socketCreate() {
    if (Object.values(valueForm).length > 0) {
      initiateSocket();
    }
  }
  socketCreate();

  function getValueForm(value) {
    setValueForm(value);
  }

  // Send to admin_socket
  function sendMessageToSupport() {
    const params = {
      text: textMessage,
      socket_admin_id: socketInSupport,
    };

    socket.emit("client_send_to_admin", params, (messages) => {
      setMessageClient(messages);
    });
    setTextMessage("");
  }

  const valueObject = {
    forms: (...p) => getValueForm(...p),
    clientMessage: (...p) => getMessageClient(...p),
    clearMessages: (...p) => clearMessages(...p),
    getSocket: (...p) => getSocket(...p),
    sokcet_admin: (...p) => setSocketInSupport(...p),
    setText: (...p) => setTextMessage(...p),
    send: () => sendMessageToSupport(),
    textMessage,
    socket,
    formValue: valueForm,
    arrayMessages: messageClient,
  };
  return (
    <AppContext.Provider value={valueObject}>{children}</AppContext.Provider>
  );
}
