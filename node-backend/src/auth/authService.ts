import { User, UserModel } from '../user/userModel';
import { EmailAlreadyExists } from './errors/EmailAlreadyExists';
import { encryptPassword } from './passwordUtils';

export const registerUser = async (user: User) => {
  const userExists = await findUserByEmail(user.email);
  if (userExists) {
    throw new EmailAlreadyExists(user.email);
  }
  const hashedPassword = encryptPassword(user.password);
  return await UserModel.create({ ...user, password: hashedPassword });
}

const findUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
}
