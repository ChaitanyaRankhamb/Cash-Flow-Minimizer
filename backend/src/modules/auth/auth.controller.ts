import { Request, Response } from "express";
import { registerService, loginService, userToResponse } from "./auth.service";
import { User } from "../../entities/user/User";

interface loginReturn {
  user: User;
  token: string;
  message: string;
  cookie: string;
}

export const registerController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "Credentials not found!" });
      return;
    }

    const user = await registerService(username, email, password);

    res
      .status(201)
      .json({ message: "User registered successfully", user: user });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const loginController = async (
  req: Request,
  res: Response,
): Promise<loginReturn | void> => {

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Credentials not found!" });
    return;
  }

  try {
    const result = await loginService(email, password, req, res);

    if (!result) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    res.status(200).json({
      message: result.message,
      user: userToResponse(result.user),
      token: result.token,
      cookie: req.cookies.token,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    return;
  }
};
