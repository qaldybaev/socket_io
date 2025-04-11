import { config } from "dotenv";
import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import cors from "cors";
import { Server } from "socket.io";
import userRouter from "./modules/user/user.route.js";

const app = express();
const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

config(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV.trim() === "development") {
  app.use(morgan("tiny"));
}

app.use("/api", userRouter);

io.on("connection", (socket) => {
  console.log("Foydalanuvchi ulanishi");

  socket.on("message", (msg) => {
    console.log("Xabar keldi:", msg);
    socket.emit("message", `Yangi xabar: ${msg}`);
    socket.broadcast.emit("message", `Yangi xabar: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("Foydalanuvchi uzildi");
  });
});

export default server;
