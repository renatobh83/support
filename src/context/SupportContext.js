import { createContext, useContext, useEffect, useState } from "react";

import { initiateSocket } from "../utils/SocketConnect.js";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export function Provider({ children }) {
  const [valueForm, setValueForm] = useState({});
  const [messageClient, setMessageClient] = useState([]);
  let arrayMessages;
  function getMessageClient(messages) {
    setMessageClient(...messageClient, messages);
  }
  arrayMessages = messageClient;

  function clearMessages() {
    setMessageClient([]);
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

  const valueObject = {
    forms: (...p) => getValueForm(...p),
    clientMessage: (...p) => getMessageClient(...p),
    clearMessages: (...p) => clearMessages(...p),
    formValue: valueForm,
    arrayMessages: messageClient,
  };
  return (
    <AppContext.Provider value={valueObject}>{children}</AppContext.Provider>
  );
}
