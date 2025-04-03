import { Server } from "socket.io";
let users = [{}];

let io;

export const initializeSocket = (server, id, role) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);
    users = [
      ...users,
      {
        socketId: socket.id,
        userId: id,
        role: role,
      },
    ];

    socket.on("send-notification", (notification) => {
      const { userId } = notification;
      if (users[userId]) {
        io.to(users[userId]).emit("new-notification", notification);
      }
    });

    socket.on("disconnect", () => {
      console.log(`A user disconnected: ${socket.id}`);
    });
  });
};

export const sendNotificationToClient = (notification) => {
  io.emit("new-notification", { notification });
};
