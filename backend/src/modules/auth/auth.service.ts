import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { userRepository } from "../../database/mongo/user/userRepository";
import { User } from "../../entities/user/User";
import type { UserResponse } from "./auth.types";
import { generateJwtToken, verifyToken } from "../../lib/jwt";
import { UserTokenModel } from "../../database/mongo/token/userToken.schema";
import { userTokenRepository } from "../../database/mongo/token/tokenRepository";

import { UserId } from "../../entities/user/UserId";

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
  req: Request,
  res: Response
): Promise<loginReturn | null> => {
  if (!email || !password)
    throw new Error("Credentials not received.");

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
  await userTokenRepository.deleteTokenSession(user.id);

  // Clear any existing token cookie
  res.clearCookie("token");

  // Object.keys(req.cookies).forEach((cookieName) => {
  //   if (cookieName === "token") {
  //     res.clearCookie(cookieName);
  //   }
  // });

  // Set new token cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
  const decode = verifyToken(token);
  console.log(decode);

  // stores token into the session
  await userTokenRepository.createTokenSession(
    user.id,
    token,
    new Date(Date.now() + 24 * 60 * 60 * 1000) // expire at one day
  );

  return {
    user,
    token,
    message: "login successfully!",
  };
};
