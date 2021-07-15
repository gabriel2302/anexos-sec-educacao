import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPeopleRepository from '../repositories/IPeopleRepository';
import Person from '../infra/typeorm/entities/Person';

@injectable()
class ShowProfileService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
  ) {}

  public async execute(person_id: string): Promise<Person> {
    const person = await this.peopleRepository.findById(person_id);
    if (!person) {
      throw new AppError('Person not found');
    }
    return person;
  }
}

export default ShowProfileService;
