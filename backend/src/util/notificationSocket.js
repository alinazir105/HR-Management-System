import { Server } from "socket.io";
let users = [];

let io;

export const initializeSocket = (server) => {
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

      console.log("🚀 ~ users:", users);
    });

    socket.on("disconnect", () => {
      console.log(`A user disconnected: ${socket.id}`);
      users = users.filter((user) => user.socketId !== socket.id);
    });
  });
};

export const sendNotification = (notification) => {
  const { user_id } = notification;

  if (user_id !== "hr") {
    const user = users.find((u) => u.userId === user_id);
    if (user) {
      io.to(user.socketId).emit("new-notification", notification);
    } else {
      console.log(`User with ID "${user_id}" not found or not connected.`);
    }
  } else {
    const matchedUsers = users.filter((u) => u.role === "hr");
    if (matchedUsers.length > 0) {
      matchedUsers.forEach((user) => {
        io.to(user.socketId).emit("new-notification", notification);
      });
    } else {
      console.log(`No users with HR Role are connected.`);
    }
  }
};
