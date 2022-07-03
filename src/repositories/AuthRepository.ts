import database from "../config/database";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import { CustomError } from "../models/CustomError";
import { User } from "../models/User";

export default class AuthRepository implements IAuthRepository {
  async create(data: User): Promise<User> {
    try {
      const repository = database.getRepository(User);
      const user = repository.create(data);
      await repository.save(user);
      return user;
    } catch (error) {
      throw new CustomError('Problems with in the Auth repository layer, review the create method', 500, error);
    }
  }

  async get(email: string): Promise<User> {
    try {
      const repository = database.getRepository(User);
      const user = await repository.findOneBy({ email: email });
      return user;
    } catch (error) {
      console.error(error);
      throw new CustomError('Problems with in the Auth repository layer, review the get method', 500, error);
    }
  }
}