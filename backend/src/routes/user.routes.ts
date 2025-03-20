import { Router } from "express";
import userController from "../controllers/user.controller";
import { checkLoggedIn, checkLoggedOut } from "../middlewares/user.middleware";

const userRouter = Router();

userRouter.get("/", checkLoggedIn, userController.getAllUsers);
userRouter.get("/profile", checkLoggedIn, userController.getUser);
userRouter.get("/profile/edit", checkLoggedIn, userController.getEdit);
userRouter.put("/profile/edit", userController.putEdit);

export default userRouter;
