import { Request, Response } from "express";
import { IUser } from "../types/user";
import userModel from "../models/user.model";

const getAllUsers = (req: Request, res: Response) => {
  const users = userModel.getAllUser();
  res.status(200).json(users);
};

const getUser = (req: Request<{ username: string }>, res: Response) => {
  const { username } = req.params;
  const user = userModel.getUserByUsername(username);
  if (!user) {
    res.status(404).json({
      message: "User does not exist!",
    });
    return;
  }
  res.status(200).json(user);
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

const putEdit = async (
  req: Request<{ id: string }, {}, Partial<IUser>>,
  res: Response
) => {
  const { id } = req.params;
  const { username, password, firstname, lastname } = req.body;
  const user = await userModel.editUserById(id, {
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
