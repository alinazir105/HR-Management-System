import { io } from "socket.io-client";

export let socket;

const connectSocket = () => {
  console.log("About to connect");
  if (!socket) {
    socket = io("http://localhost:3000", {
      withCredentials: true,
    });
  }
};

const listenForNotifications = (callback) => {
  socket.on("new-notification", (notification) => {
    callback(notification);
  });
};

const sendNotification = (notification) => {
  if (socket) {
    socket.emit("send-notification", notification);
  }
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export {
  connectSocket,
  listenForNotifications,
  sendNotification,
  disconnectSocket,
};
