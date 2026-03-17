export interface IUser {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: "user" | "admin";
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
