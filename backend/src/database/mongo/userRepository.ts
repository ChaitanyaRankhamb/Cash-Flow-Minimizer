import { User } from "../../entities/user/User";
import { UserId } from "../../entities/user/UserId";

import type {
  UserRepository as IUserRepository,
  CreateUserData,
} from "../../entities/user/UserRepository";

import { UserModel, type UserDocument } from "./userSchema";

function docToUser(doc: UserDocument): User {
  return new User(
    new UserId(doc._id.toString()),
    doc.username,
    doc.email,
    doc.emailVerified,
    doc.image,
    doc.isActive,
    doc.createdAt,
    doc.updatedAt
  );
}

export class MongoUserRepository implements IUserRepository {
  async createUser(data: CreateUserData): Promise<User> {
    const doc = await UserModel.create({
      username: data.username,
      email: data.email,
      emailVerified: data.emailVerified ?? false,
      ...(data.image !== undefined && { image: data.image }),
      isActive: data.isActive ?? true,
      password: data.passwordHash,
    });
    return docToUser(doc);
  }

  async updateUser(user: User): Promise<User> {
    const doc = await UserModel.findByIdAndUpdate(
      user.id.toString(),
      {
        username: user.username,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        isActive: user.isActive,
      },
      { new: true }
    );
    if (!doc) throw new Error("User not found");
    return docToUser(doc);
  }

  async deleteUser(id: UserId): Promise<void> {
    await UserModel.findByIdAndDelete(id.toString());
  }

  async findUserByID(id: UserId): Promise<User | null> {
    const doc = await UserModel.findById(id.toString());
    return doc ? docToUser(doc) : null;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const doc = await UserModel.findOne({ username });
    return doc ? docToUser(doc) : null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email: email.toLowerCase() });
    return doc ? docToUser(doc) : null;
  }
}

export const userRepository = new MongoUserRepository();
