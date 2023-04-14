import { EmailAlreadyExists } from "../auth/errors/EmailAlreadyExists";
import { UsernameAlreadyExists } from "../auth/errors/UsernameAlreadyExists";
import { encryptPassword } from "../auth/passwordUtils";
import { InvalidOperation } from "../posts/errors/InvalidOperation";
import { CurrentUser } from "../types/express";
import { EditUser } from "./dto/EditUser";
import { UserNotFound } from "./errors/UserNotFound";
import { UserModel } from "./userModel"

export const userProfile = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new UserNotFound();
  }
  return user;
}

export const editProfile = async (currentUser: CurrentUser, id: string, newUser: EditUser) => {
  if (id !== currentUser.id){
    throw new InvalidOperation('Invalid Operation');
  }

  const user = await UserModel.findById(id);

  if (!user) {
    throw new UserNotFound();
  }

  const email = newUser.email ? newUser.email : user.email;
  const username = newUser.username ? newUser.username : user.username;

  // check if email and username are available
  if (email !== user.email){
    const emailExists = await getUserByEmail(email);
    if (emailExists) throw new EmailAlreadyExists('Email already exists');
  }

  if (username !== user.username){
    const usernameExists = await getUserByUsername(username);
    if (usernameExists) throw new UsernameAlreadyExists('Username already exists');
  }
  
  const password = newUser.password ? encryptPassword(newUser.password): user.password;
  user.username = username;
  user.email = email;
  user.password = password;
  user.save();
}

export const getUserByUsername = async (username: string) => {
  const user = await UserModel.findOne({ username });
  return user;
}

export const getUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
}