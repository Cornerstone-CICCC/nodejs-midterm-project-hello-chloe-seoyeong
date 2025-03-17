import { Router } from "express";
import userController from "../controllers/user.controller";
import { checkLoggedOut } from "../middlewares/user.middleware";

const userRouter = Router();

userRouter.get("/", checkLoggedOut, userController.getAllUsers);
userRouter.get("/:id", checkLoggedOut, userController.getUser);
userRouter.get("/:id/edit", checkLoggedOut, userController.getEdit);
userRouter.put("/:id/edit", userController.putEdit);

export default userRouter;
