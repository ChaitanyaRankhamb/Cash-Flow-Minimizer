import bcrypt from "bcryptjs";
import { userRepository } from "../../database/mongo/userRepository";
import { User } from "../../entities/user/User";
import type { UserResponse } from "./auth.types";

export function userToResponse(user: User): UserResponse {
  return {
    id: user.id.toString(),
    username: user.username,
    email: user.email,
    emailVerified: user.emailVerified,
    ...(user.image !== undefined && { image: user.image }),
    isActive: user.isActive,
    ...(user.createdAt !== undefined && { createdAt: user.createdAt }),
    ...(user.updatedAt !== undefined && { updatedAt: user.updatedAt }),
  };
}

export const registerService = async (
  username: string,
  email: string,
  password: string
): Promise<UserResponse> => {
  const existingUsername = await userRepository.findUserByUsername(username);
  if (existingUsername) {
    throw new Error("Username already exists");
  }

  const existingEmail = await userRepository.findUserByEmail(email);
  if (existingEmail) {
    throw new Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await userRepository.createUser({
    username,
    email,
    emailVerified: false,
    isActive: true,
    passwordHash: hashedPassword,
  });

  return userToResponse(user);
};

export default registerService;
