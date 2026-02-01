import { User } from "./User";
import { UserId } from "./UserId";

export interface CreateUserData {
  username: string;
  email: string;
  emailVerified?: boolean;
  image?: string;
  isActive?: boolean;
  passwordHash: string;
}

export interface UserRepository {
  createUser(data: CreateUserData): Promise<User>;

  updateUser(user: User): Promise<User>;

  deleteUser(id: UserId): Promise<void>;

  findUserByID(id: UserId): Promise<User | null>;

  findUserByUsername(username: string): Promise<User | null>;

  findUserByEmail(email: string): Promise<User | null>;
}
