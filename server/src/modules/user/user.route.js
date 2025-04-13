import { Router } from "express";
import userController from "./user.controller.js";

const userRouter = Router();

userRouter.get("/users", userController.getAllUser)
.post("/login",userController.createUser)

export default userRouter;
