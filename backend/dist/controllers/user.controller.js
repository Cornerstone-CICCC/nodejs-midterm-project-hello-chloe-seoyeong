"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const getAllUsers = (req, res) => {
    const users = user_model_1.default.getAllUser();
    res.status(200).json(users);
};
const getUser = (req, res) => {
    if (!req.session || !req.session.username) {
        res.status(403).json({ message: "Forbidden", authCheck: false });
        return;
    }
    if (req.session && req.session.username) {
        const user = user_model_1.default.getUserByUsername(req.session.username);
        if (!user) {
            res.status(404).json({
                authCheck: false,
                message: "User does not exist!",
            });
            return;
        }
        res.status(200).json({ user, authCheck: true });
        // return user;
    }
};
const getEdit = (req, res) => {
    const { username } = req.params;
    const user = user_model_1.default.getUserByUsername(username);
    if (!user) {
        res.status(400).json({
            message: "User does not exist!",
        });
        return;
    }
    res.status(200).json(user);
};
const putEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { id } = req.params;
    const { username, password, firstname, lastname } = req.body;
    const user = yield user_model_1.default.editUserById({
        username,
        password,
        firstname,
        lastname,
    });
    if (!user) {
        res.status(404).json({
            message: "User does not exist!",
        });
        return;
    }
    res.status(200).json(user);
});
exports.default = {
    getAllUsers,
    getUser,
    getEdit,
    putEdit,
};
