import { User, UserModel } from '../user/userModel';


export const registerUser = async (user: User) => {
  // todo check if user is already registered
  // todo encode password
  // todo save user
  return await UserModel.create({ ...user });
}
