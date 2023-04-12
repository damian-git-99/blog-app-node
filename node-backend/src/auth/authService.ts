import { User, UserModel } from '../user/userModel';
import { getUserByEmail, getUserByUsername } from '../user/userService';
import { generateToken } from './JwtUtils';
import { UserLogin } from './dto/UserLogin';
import { BadCredential } from './errors/BadCredentials';
import { EmailAlreadyExists } from './errors/EmailAlreadyExists';
import { UsernameAlreadyExists } from './errors/UsernameAlreadyExists';
import { encryptPassword, comparePasswords } from './passwordUtils';

export const registerUser = async (user: User) => {
  const userExistsByEmail = await getUserByEmail(user.email);
  if (userExistsByEmail) {
    throw new EmailAlreadyExists(user.email);
  }

  const userExistsByUsername = await getUserByUsername(user.username);
  if (userExistsByUsername) {
    throw new UsernameAlreadyExists(user.username);
  }

  const hashedPassword = encryptPassword(user.password);
  return await UserModel.create({ ...user, password: hashedPassword });
}

export const login = async (user: UserLogin) => {
  const userExists = await getUserByEmail(user.email);
  if (!userExists) {
    throw new BadCredential();
  }
  if(!comparePasswords(user.password, userExists.password)){
    throw new BadCredential();
  }
  
  return {
    token: generateToken({ id: userExists.id, email: user.email }),
    email: userExists.email,
    id: userExists.id,
    username: userExists.username
  }
}
