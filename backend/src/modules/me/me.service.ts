// user.service.ts

import { userRepository } from "../../database/mongo/user/userRepository";
import { User } from "../../entities/user/User";
import { UserId } from "../../entities/user/UserId";


export const getMeService = async (
  userId: UserId
): Promise<User | null> => {

  const user = await userRepository.findUserByID(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user ? user : null;
}
