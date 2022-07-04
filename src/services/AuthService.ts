import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { injectable } from 'tsyringe';
import { INVALID_PASSWORD, USER_ALREADY_EXISTS, USER_DOES_NOT_EXIST } from '../commons/errors';
import { generateToken } from '../config/jwt';
import { IAuthService } from '../interfaces/IAuthService';
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

    if (userExist) USER_ALREADY_EXISTS();

    const hashPassword = hashSync(data.password, genSaltSync(10));

    data.password = hashPassword;
    let user = await this.authRepository.create(data);
    delete user.password;
    return user;
  }

  async signIn(data: User): Promise<any> {
    const userExist = await this.authRepository.get(data.email);
    if (!userExist) USER_DOES_NOT_EXIST();

    const validPassword = compareSync(data.password, userExist.password);
    if (!validPassword) INVALID_PASSWORD();

    const userToEncode = {
      email: userExist.email,
      id: userExist.id
    };

    const token = generateToken(userToEncode);
    return { token, user: userToEncode };
  }
}
