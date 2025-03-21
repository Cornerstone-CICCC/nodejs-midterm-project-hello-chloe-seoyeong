import { Request, Response } from "express";
import { IUser } from "../types/user";
import userModel from "../models/user.model";

const getAllUsers = (req: Request, res: Response) => {
  const users = userModel.getAllUser();
  res.status(200).json(users);
};

const getUser = (req: Request, res: Response) => {
  if (!req.session || !req.session.username) {
    res.status(403).json({ message: "Forbidden", authCheck: false });
    return;
  }
  if (req.session && req.session.username) {
    const user = userModel.getUserByUsername(req.session.username);
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
const getEdit = (req: Request<{ username: string }>, res: Response) => {
  const { username } = req.params;
  const user = userModel.getUserByUsername(username);
  if (!user) {
    res.status(400).json({
      message: "User does not exist!",
    });
    return;
  }
  res.status(200).json(user);
};

const putEdit = async (req: Request<{}, {}, Partial<IUser>>, res: Response) => {
  const { username, password, firstname, lastname } = req.body;
  console.log(username, firstname, lastname);
  const user = await userModel.editUserById({
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
};

export default {
  getAllUsers,
  getUser,
  getEdit,
  putEdit,
};
