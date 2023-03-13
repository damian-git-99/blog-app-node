import { User, UserModel } from '../user/userModel';
import { encryptPassword } from './passwordUtils';


export const registerUser = async (user: User) => {
  // todo check if user is already registered
  const hashedPassword = encryptPassword(user.password);
  return await UserModel.create({ ...user, password: hashedPassword });
}
