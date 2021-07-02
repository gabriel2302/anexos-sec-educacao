import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IInstitutionsRepository from '@modules/institutions/repositories/IInstitutionsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  username: string;
  role?: string;
  institution_id: string;
  password: string;
  passwordConfirmation: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('InstitutionsRepository')
    private institutionRepository: IInstitutionsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    username,
    role = 'user',
    password,
    passwordConfirmation,
    institution_id,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByUser(username);
    if (checkUserExists) {
      throw new AppError('User already exists');
    }
    if (password !== passwordConfirmation) {
      throw new AppError('password  and passwordConfirmation must be equals');
    }
    const checkInstitutionExists = await this.institutionRepository.findById(
      institution_id,
    );

    if (!checkInstitutionExists) {
      throw new AppError('Institution does not exists');
    }

    // TODO: - Verificar se a instituicao e a mesma do usuario logado

    const hashedPassword = await this.hashProvider.generateHash(password);
    const newUser = await this.usersRepository.create({
      username,
      role,
      institution_id,
      password: hashedPassword,
    });

    return newUser;
  }
}

export default CreateUserService;
