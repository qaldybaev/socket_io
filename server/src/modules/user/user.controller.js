import UserService from "./user.service.js";

console.log(UserService);
class UserController {
  #_service;
  constructor() {
    this.#_service = UserService;
  }

  getAllUser = async (req, res) => {
    try {
      const result = await this.#_service.getAllUsers();
      res.json(result);
    } catch (error) {
      console.error(error.stack);
      res.status(500).json({ message: "Xatolik yuz berdi!" });
    }
  };

  createUser = async (req, res, next) => {
    try {
      const { name } = req.body;
      const newUser = await this.#_service.createUser({ name });
      res.send({
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
