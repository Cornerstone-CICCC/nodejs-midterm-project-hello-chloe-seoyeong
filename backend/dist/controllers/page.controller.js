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
/**
 * Displays the home page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Render home page
 */
const getHome = (req, res) => {
    res.status(200).send("Welcome to home.");
};
/**
 * Displays the join page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Render join page
 */
const getJoin = (req, res) => {
    res.status(200).send("Join page");
};
/**
 * Displays the login page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Render login page
 */
const getLogin = (req, res) => {
    res.status(200).send("Login page");
};
/**
 * Add new user
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Return newly created user.
 */
const postJoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstname, lastname } = req.body;
    const user = yield user_model_1.default.addUser({
        username,
        password,
        firstname,
        lastname,
    });
    if (!user) {
        res.status(400).json({
            message: "Username is already taken!",
        });
        return;
    }
    res.status(200).json({
        message: "Added new user successfully! 🙂",
    });
});
/**
 * Login
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Render home page
 */
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_model_1.default.loginUser(username, password);
    if (!user) {
        res.status(500).json({
            message: "Incorrect one of those or both.",
        });
        return;
    }
    if (req.session) {
        req.session.isLoggedIn = true;
        req.session.username = username;
    }
    res.status(200).json({
        message: "Successfully Logged In!",
    });
});
exports.default = {
    getHome,
    getJoin,
    postJoin,
    getLogin,
    postLogin,
};
