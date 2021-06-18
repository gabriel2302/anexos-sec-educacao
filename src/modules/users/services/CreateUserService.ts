import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  username: string;
  role?: string;
  password: string;
  passwordConfirmation: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    username,
    role = 'user',
    password,
    passwordConfirmation,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByUser(username);
    if (checkUserExists) {
      throw new AppError('User already exists');
    }
    if (password !== passwordConfirmation) {
      throw new AppError('password  and passwordConfirmation must be equals');
    }
    const hashedPassword = await this.hashProvider.generateHash(password);
    const newUser = await this.usersRepository.create({
      username,
      role,
      password: hashedPassword,
    });

    return newUser;
  }
}

export default CreateUserService;
