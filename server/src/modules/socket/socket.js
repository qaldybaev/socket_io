import messageModel from "../message/message.model.js";
import userModel from "../user/user.model.js";

export const socketHandler = (io) => {
  io.on("connection", async (socket) => {
    const messages = await messageModel
      .find()
      .sort([["createdAt", "asc"]])
      .populate("user");
    socket.emit("message", messages);

    socket.on("typing", async (data) => {
      const user = await userModel.findById(data.user);
      console.log(data)
      console.log(user)
      socket.broadcast.emit("typing", user);
    });

    socket.on("new_message", async (data) => {
      await messageModel.create({
        text: data.text,
        user: data.user,
      });

      const messages = await messageModel
        .find()
        .sort([["createdAt", "asc"]])
        .populate("user");
      io.emit("message", messages);
    });

    socket.on("join", async (data) => {
      const user = await userModel.findById(data.user);
      if (!user) return;

      await messageModel.create({
        type: "join_message",
        user: data.user,
      });

      const messages = await messageModel.find().populate("user");
      socket.emit("message", messages);
    });
  });
};
