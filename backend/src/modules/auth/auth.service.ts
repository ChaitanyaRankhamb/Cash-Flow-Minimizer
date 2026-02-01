import bcrypt from "bcryptjs";
import { userRepository } from "../../database/mongo/userRepository";
import { User } from "../../entities/user/User";
import type { UserResponse } from "./auth.types";
import { generateJwtToken } from "../../lib/jwt";
import { UserTokenModel } from "../../database/mongo/userToken.schema";
import { userTokenRepository } from "../../database/mongo/tokenRepository";

import { UserId } from "../../entities/user/UserId";
import { resolve } from "path";

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

interface loginReturn {
  user: User;
  token: string;
  message: string;
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

export const loginService = async (
  email: string,
  password: string,
  deviceId: string,
): Promise<loginReturn | null> => {
  if (!email || !password || !deviceId) throw new Error("Credentials not received.");

  const user = await userRepository.findUserByEmailWithPassword(email);

  if (!user) {
    throw new Error("User not found!");
  }

  // check password
  const isMatch: boolean = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("User credentials are invalid!");
  }

  // if user exist, issue the jwt token
  const token = generateJwtToken({
    userId: user.id.toString(),
    email: user.email,
  });

  // delete previous token details from database
  await userTokenRepository.deleteTokenSession(
    user.id,
    deviceId,
  );

  // stores token into the session
  await userTokenRepository.createTokenSession(
    user.id,
    deviceId,
    token,
    new Date(Date.now() + 24 * 3600 * 1000), // expire at one day
  );

  return {
    user,
    token,
    message: "login successfully!",
  };
};
