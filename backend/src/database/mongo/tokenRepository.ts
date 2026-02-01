import { Types } from "mongoose";

import { UserId } from "../../entities/user/UserId";
import { UserTokenModel, type UserTokenDocument } from "./userToken.schema";

/**
 * Repository Interface (recommended but optional)
 */
export interface UserTokenRepository {
  createTokenSession(
    userId: UserId,
    deviceId: string,
    token: string,
    expireAt: Date
  ): Promise<void>;

  deleteTokenSession(userId: UserId, deviceId: string): Promise<void>;
}

/**
 * MongoDB Implementation
 */
export class MongoUserTokenRepository implements UserTokenRepository {
  /**
   * Create a new token session for a user
   */
  async createTokenSession(
    userId: UserId,
    deviceId: string,
    token: string,
    expireAt: Date
  ): Promise<void> {
    await UserTokenModel.create({
      userId: new Types.ObjectId(userId.toString()),
      deviceId,
      token,
      expireAt,
    });
  }

  /**
   * Delete all token sessions for a user
   * (logout from all devices)
   */
  async deleteTokenSession(userId: UserId, deviceId: string): Promise<void> {
    await UserTokenModel.deleteMany({
      userId: new Types.ObjectId(userId.toString()),
      deviceId,
    });
  }
}

/**
 * Singleton export
 */
export const userTokenRepository = new MongoUserTokenRepository();