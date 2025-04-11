import User from "./user.model.js";

class UserService {
    constructor() {
        this.userModel = User;
    }

    async getAllUsers() {
        const users = await this.userModel.find();
        console.log("users",users)
        
        return {
            message: "Success",
            count: users.length, 
            data: users
        };
    }
    async createUser({ name }) {
        const user = await this.userModel.create({ name });
        return user;
      }
}

export default new UserService(); 