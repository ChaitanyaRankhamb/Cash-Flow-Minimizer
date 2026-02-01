import { Request, Response } from "express";
import registerService from "./auth.service";

const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

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

export default registerController;
