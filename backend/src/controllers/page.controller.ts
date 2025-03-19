import { Request, Response } from "express";
import userModel from "../models/user.model";
import { IUser } from "../types/user";

/**
 * Displays the home page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Render home page
 */
const getHome = async (req: Request, res: Response) => {
  const data = await fetch("https://bgg-json.azurewebsites.net/hot");
  const json = await data.json();
  res.status(200).json(json);
  return json;
};

/**
 * Displays the join page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Render join page
 */
const getJoin = (req: Request, res: Response) => {
  res.status(200).send("Join page");
};

/**
 * Displays the login page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Render login page
 */
const getLogin = (req: Request, res: Response) => {
  res.status(200).send("Login page");
};

/**
 * Add new user
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Return newly created user.
 */
const postJoin = async (
  req: Request<{}, {}, Omit<IUser, "id">>,
  res: Response
) => {
  const { username, password, firstname, lastname } = req.body;
  const user = await userModel.addUser({
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
};

/**
 * Login
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Render home page
 */
const postLogin = async (
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response
) => {
  const { username, password } = req.body;
  const user = await userModel.loginUser(username, password);
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
    username,
  });
};

const logout = (req: Request<{}, {}, Omit<IUser, "id">>, res: Response) => {
  req.session = null;
  res.status(200).json({
    message: "Successfully log outted",
  });
};

export default {
  getHome,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
};
