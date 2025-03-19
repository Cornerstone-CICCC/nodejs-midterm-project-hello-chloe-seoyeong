import { IUser } from "../types/user";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

class UserModel {
  private users: IUser[] = [];

  getAllUser() {
    return this.users;
  }

  async addUser(userInfo: Omit<IUser, "id">) {
    const { username, password, firstname, lastname } = userInfo;
    const user = this.users.findIndex((u) => u.username === username);
    if (user !== -1) return false;
    // if (password !== password2) {
    //   const errorMessage = "Passwords are not matched! 😣";
    //   return;
    // }
    const hashedpassword = await bcrypt.hash(password, 12);
    const newUser = {
      id: uuidv4(),
      username,
      password: hashedpassword,
      firstname,
      lastname,
    };
    this.users.push(newUser);
    return newUser;
  }

  async loginUser(username: string, password: string) {
    const user = this.users.find((u) => u.username === username);
    if (!user) return false;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return false;

    return user;
  }
  getUserByUsername(username: string) {
    const user = this.users.findIndex((u) => u.username === username);
    return user;
  }
  async editUserById(id: string, updates: Partial<IUser>) {
    const foundIndex = this.users.findIndex((user) => user.id === id);
    if (foundIndex === -1) return false;
    let hashedpassword = undefined;
    if (updates.password) {
      hashedpassword = await bcrypt.hash(updates.password, 12);
    }

    const updatedUser = {
      ...this.users[foundIndex],
      username: updates.username ?? this.users[foundIndex].username,
      password: hashedpassword
        ? hashedpassword
        : this.users[foundIndex].password,
      firstname: updates.firstname ?? this.users[foundIndex].firstname,
      lastname: updates.lastname ?? this.users[foundIndex].lastname,
    };
    this.users = [
      ...this.users.slice(0, foundIndex),
      updatedUser,
      ...this.users.slice(foundIndex + 1),
    ];
    return updatedUser;
  }
}

export default new UserModel();
