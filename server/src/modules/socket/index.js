import messageModel from "../message/message.model.js";
import userModel from "../user/user.model.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("typing", async (data) => {
      const user = await userModel.findById(data.user);

      socket.broadcast.emit("typing", user.name);
    });
    socket.on("message", async (data) => {
      const newMessage = await messageModel.create({
        text: data.text,
        user: data.user,
      });

      const messages = await messageModel.find().populate("user");

      socket.emit("message", messages);
    });
    socket.on("message", async (data) => {
      const newMessage = await messageModel.create({
        type:"join_message",
        user: data.user,
      });

      const messages = await messageModel.find().populate("user");

      socket.emit("message", messages);
    });
  });
};
