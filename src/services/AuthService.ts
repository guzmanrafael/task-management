import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { injectable } from 'tsyringe';
import { generateToken } from '../config/jwt';
import { IAuthService } from '../interfaces/IAuthService';
import { CustomError } from '../models/CustomError';
import { User } from '../models/User';
import AuthRepository from '../repositories/AuthRepository';

@injectable()
export default class AuthService implements IAuthService {
  authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async signUp(data: User): Promise<any> {
    const userExist = await this.authRepository.get(data.email);

    if (userExist) {
      throw new CustomError('User already exists', 409, '');
    }

    const hashPassword = hashSync(data.password, genSaltSync(10));

    data.password = hashPassword;
    let user = await this.authRepository.create(data);
    delete user.password;
    return user;
  }

  async signIn(data: User): Promise<any> {
    const userExist = await this.authRepository.get(data.email);
    if (!userExist) {
      throw new CustomError('User does not exist', 409, '');
    }

    const validPassword = compareSync(data.password, userExist.password);
    if (!validPassword) {
      throw new CustomError('Invalid password', 403, '');
    }

    const userToEncode = {
      username: userExist.email,
      id: userExist.id
    };

    const token = generateToken(userToEncode);
    return { token, user: userToEncode };
  }
}

