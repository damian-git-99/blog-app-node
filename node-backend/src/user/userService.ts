import { UserNotFound } from "./errors/UserNotFound";
import { UserModel } from "./userModel"

export const userProfile = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new UserNotFound();
  }
  return user;
}