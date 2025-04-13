import messageModel from "../message/message.model.js";
import User from "./user.model.js";

class UserService {
  constructor() {
    this.userModel = User;
  }

  getAllUsers = async () => {
    const users = await this.userModel.find();
    console.log("users", users);

    return {
      message: "Success",
      count: users.length,
      data: users,
    };
  };
  createUser = async ({ name }) => {
    const foundedUser = await this.userModel.findOne({ name });

    if (foundedUser) {
      throw new Error("User allaqachon mavjud!");
    }
    const user = await this.userModel.create({ name });
    const message = await messageModel.create({
      type: "join_message",
      user: user._id,
    });
    return {
      data: user
    };
  };
}

export default new UserService();
