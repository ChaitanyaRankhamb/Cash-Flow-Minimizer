/** API response shape for user (no password, id as string) */
export interface UserResponse {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
