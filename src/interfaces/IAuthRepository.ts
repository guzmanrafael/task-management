import { User } from "../models/User";

export interface IAuthRepository {
    create(user: User): Promise<User>;

    get(email: string): Promise<User>;
  }
  