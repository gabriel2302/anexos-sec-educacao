import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPeopleRepository from '../repositories/IPeopleRepository';
import Person from '../infra/typeorm/entities/Person';

type IRequest = {
  role?: string;
  institution: string;
};

@injectable()
class ListAllPeopleByIdService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
  ) {}

  public async execute({ role, institution }: IRequest): Promise<Person[]> {
    if (role !== 'adm') {
      throw new AppError('Forbidden', 403);
    }
    const people = await this.peopleRepository.findAllById(institution);
    return people;
  }
}

export default ListAllPeopleByIdService;
