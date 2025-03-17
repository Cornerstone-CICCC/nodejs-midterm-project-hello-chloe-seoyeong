"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const page_controller_1 = __importDefault(require("../controllers/page.controller"));
const user_middleware_1 = require("../middlewares/user.middleware");
const pageRouter = (0, express_1.Router)();
pageRouter.get("/", page_controller_1.default.getHome);
pageRouter.get("/join", user_middleware_1.checkLoggedIn, page_controller_1.default.getJoin);
pageRouter.post("/join", page_controller_1.default.postJoin);
pageRouter.get("/login", user_middleware_1.checkLoggedIn, page_controller_1.default.getLogin);
pageRouter.post("/login", page_controller_1.default.postLogin);
exports.default = pageRouter;
