import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPeopleRepository from '../repositories/IPeopleRepository';
import Person from '../infra/typeorm/entities/Person';

type IRequest = {
  role?: string;
};

@injectable()
class ListAllPeopleService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
  ) {}

  public async execute({ role }: IRequest): Promise<Person[]> {
    if (role !== 'superadm') {
      throw new AppError('Forbidden', 403);
    }
    const people = await this.peopleRepository.findAll();
    return people;
  }
}

export default ListAllPeopleService;
