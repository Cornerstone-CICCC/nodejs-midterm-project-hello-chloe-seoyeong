"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_middleware_1 = require("../middlewares/user.middleware");
const userRouter = (0, express_1.Router)();
userRouter.get("/", user_middleware_1.checkLoggedOut, user_controller_1.default.getAllUsers);
userRouter.get("/:id", user_middleware_1.checkLoggedOut, user_controller_1.default.getUser);
userRouter.get("/:id/edit", user_middleware_1.checkLoggedOut, user_controller_1.default.getEdit);
userRouter.put("/:id/edit", user_controller_1.default.putEdit);
exports.default = userRouter;
