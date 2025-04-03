import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const listenForNotifications = (callback) => {
  socket.on("new-notification", (notification) => {
    callback(notification);
  });
};

const sendNotification = (notification) => {
  socket.emit("send-notification", notification);
};

const disconnectSocket = () => {
  socket.disconnect();
};

export { listenForNotifications, sendNotification, disconnectSocket };
