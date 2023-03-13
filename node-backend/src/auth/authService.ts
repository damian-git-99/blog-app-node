import { User, UserModel } from '../user/userModel';
import { generateToken } from './JwtUtils';
import { BadCredential } from './errors/BadCredentials';
import { EmailAlreadyExists } from './errors/EmailAlreadyExists';
import { encryptPassword, comparePasswords } from './passwordUtils';

export const registerUser = async (user: User) => {
  const userExists = await findUserByEmail(user.email);
  if (userExists) {
    throw new EmailAlreadyExists(user.email);
  }
  const hashedPassword = encryptPassword(user.password);
  return await UserModel.create({ ...user, password: hashedPassword });
}

export const login = async (user: User) => {
  const userExists = await findUserByEmail(user.email);
  if (!userExists) {
    throw new BadCredential();
  }
  if(!comparePasswords(user.password, userExists.password)){
    throw new BadCredential();
  }
  
  return {
    token: generateToken({ id: userExists.id, email: user.email })
  }
}

const findUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
}
