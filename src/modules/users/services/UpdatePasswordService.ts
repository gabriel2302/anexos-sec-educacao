import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

@injectable()
class UpdatePasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    password,
    old_password,
    password_confirmation,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    if (password !== password_confirmation) {
      throw new AppError('Password and Password Confirmation must be equals');
    }

    const checkOldPassword = await this.hashProvider.compareHash(
      old_password,
      user.password,
    );

    if (!checkOldPassword) {
      throw new AppError('Old password does not match.');
    }
    user.password = await this.hashProvider.generateHash(password);

    return this.usersRepository.save(user);
  }
}

export default UpdatePasswordService;
