import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUser(username);
    if (!user) {
      throw new AppError('Incorrect username/password combination', 401);
    }
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!passwordMatched) {
      throw new AppError('Incorrect username/password combination', 401);
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn,
    });
    console.log(token);
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
