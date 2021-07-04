import socketClient from "socket.io-client";
const SERVER = "http://192.168.1.47:3001";
let socket;

export const initiateSocket = () => {
  socket = socketClient(SERVER);
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("Desconectar");
    socket.disconnect();
  }
};
