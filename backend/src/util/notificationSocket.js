import { Server } from "socket.io";
let users = [];

let io;

export const initializeSocket = (server, id, role) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on("register", ({ id, role }) => {
      users = [
        ...users,
        {
          socketId: socket.id,
          userId: id,
          role: role,
        },
      ];

      console.log(`ID ${id} role ${role} has been added to the array!`);

      console.log("🚀 ~ users:", users);
    });

    socket.on("disconnect", () => {
      console.log(`A user disconnected: ${socket.id}`);
      users = users.filter((user) => user.socketId !== socket.id);
    });
  });
};

export const sendNotificationToClient = (userId, message) => {
  const user = users.find((u) => u.userId === userId);
  if (user) {
    io.to(user.socketId).emit("new-notification", { userId, message });
  } else {
    console.log(`User ${userId} not found or not connected.`);
  }
};
