import { createContext, useContext, useState } from "react";
import socketClient from "socket.io-client";
export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);
const SERVER = "http://localhost:3001";

export function Provider({ children }) {
  const [valueForm, setValueForm] = useState({});

  // const socket = socketClient(SERVER);
  function socketCreate() {
    if (Object.values(valueForm).length > 0) {
      // console.log("Create");
    }
  }
  socketCreate();
  function getValueForm(value) {
    setValueForm(value);
  }
  const valueObject = {
    forms: (...p) => getValueForm(...p),
    email: valueForm.email,
  };
  return (
    <AppContext.Provider value={valueObject}>{children}</AppContext.Provider>
  );
}
