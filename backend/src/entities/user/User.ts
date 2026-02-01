import { UserId } from "./UserId";

export class User {
  constructor(
    public readonly id: UserId,
    public username: string,
    public email: string,
    public emailVerified: boolean,
    public image?: string,
    public isActive: boolean = true,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  verifyEmail() {
    this.emailVerified = true;
  }

  updateProfile(data: { username?: string; image?: string }) {
    if (data.username) this.username = data.username;
    if (data.image) this.image = data.image;
  }
}