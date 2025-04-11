import { Router } from "express";
import { createUser, getAllUser } from "./user.controller.js";

const userRouter = Router();

userRouter.get("/users", getAllUser)
.post("/users",createUser)

export default userRouter;
