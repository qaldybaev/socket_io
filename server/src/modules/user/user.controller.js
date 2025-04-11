import UserService from "./user.service.js";


// console.log(UserService)
// class UserController {
//     #_service;
//     constructor() {
//         this.#_service = UserService;
//     }


   
// }
export const getAllUser = async (req, res) => {
    try {
      const result = await UserService.getAllUsers();
      res.json(result);
    } catch (error) {
      console.error(error.stack);
      res.status(500).json({ message: "Xatolik yuz berdi!" });
    }
  };

  export const createUser = async (req, res) => {
    try {
      const { name } = req.body;
      const newUser = await UserService.createUser({ name });
      res.status(201).json({ message: "Foydalanuvchi qo‘shildi", data: newUser });
    } catch (error) {
      res.status(500).json({ message: "Foydalanuvchini qo‘shishda xatolik" });
    }
  };

// export default new UserController();
