import { Types } from "mongoose";

import { UserId } from "../../../entities/user/UserId";
import { UserTokenModel, type UserTokenDocument } from "./userToken.schema";

export interface UserTokenRepository {
  createTokenSession(
    userId: UserId,
    token: string,
    deviceId: string,
    expireAt: Date
  ): Promise<void>;

  deleteTokenSession(userId: UserId, deviceId: string): Promise<void>;
}

export class MongoUserTokenRepository implements UserTokenRepository {
  async createTokenSession(
    userId: UserId,
    token: string,
    deviceId: string,
    expireAt: Date
  ): Promise<void> {
    await UserTokenModel.create({
      userId: new Types.ObjectId(userId.toString()),
      token,
      deviceId,
      expireAt,
    });
  }

  async deleteTokenSession(userId: UserId, deviceId: string): Promise<void> {
    await UserTokenModel.deleteMany({
      userId: new Types.ObjectId(userId.toString()),
      deviceId,
    });
  }
}

export const userTokenRepository = new MongoUserTokenRepository();
