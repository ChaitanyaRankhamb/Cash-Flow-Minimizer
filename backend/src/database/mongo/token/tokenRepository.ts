import { Types } from "mongoose";

import { UserId } from "../../../entities/user/UserId";
import { UserTokenModel, type UserTokenDocument } from "./userToken.schema";

export interface UserTokenRepository {
  createTokenSession(
    userId: UserId,
    token: string,
    expireAt: Date
  ): Promise<void>;

  deleteTokenSession(userId: UserId): Promise<void>;
}

export class MongoUserTokenRepository implements UserTokenRepository {
  async createTokenSession(
    userId: UserId,
    token: string,
    expireAt: Date
  ): Promise<void> {
    await UserTokenModel.create({
      userId: new Types.ObjectId(userId.toString()),
      token,
      expireAt,
    });
  }

  async deleteTokenSession(userId: UserId): Promise<void> {
    await UserTokenModel.deleteMany({
      userId: new Types.ObjectId(userId.toString()),
    });
  }
}

export const userTokenRepository = new MongoUserTokenRepository();
