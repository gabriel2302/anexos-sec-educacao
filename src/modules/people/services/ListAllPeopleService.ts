import { inject, injectable } from 'tsyringe';
import IPeopleRepository from '../repositories/IPeopleRepository';
import Person from '../infra/typeorm/entities/Person';

@injectable()
class ListAllPeopleService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,
  ) {}

  public async execute(): Promise<Person[]> {
    const people = await this.peopleRepository.findAll();
    return people;
  }
}

export default ListAllPeopleService;
