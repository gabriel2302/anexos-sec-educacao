import { inject, injectable } from 'tsyringe';

import IHashProvider from '@modules/people/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import Person from '@modules/people/infra/typeorm/entities/Person';
import IPeopleRepository from '../repositories/IPeopleRepository';

interface IRequest {
  person_id: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

@injectable()
class UpdatePasswordService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    person_id,
    password,
    old_password,
    password_confirmation,
  }: IRequest): Promise<Person> {
    const person = await this.peopleRepository.findById(person_id);
    if (!person) {
      throw new AppError('Person not found');
    }

    if (password !== password_confirmation) {
      throw new AppError('Password and Password Confirmation must be equals');
    }

    const checkOldPassword = await this.hashProvider.compareHash(
      old_password,
      person.password,
    );

    if (!checkOldPassword) {
      throw new AppError('Old password does not match.');
    }
    person.password = await this.hashProvider.generateHash(password);

    return this.peopleRepository.save(person);
  }
}

export default UpdatePasswordService;
