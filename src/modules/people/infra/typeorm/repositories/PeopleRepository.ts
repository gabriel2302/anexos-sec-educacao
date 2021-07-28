import { getRepository, Repository } from 'typeorm';

import IPeopleRepository from '@modules/people/repositories/IPeopleRepository';
import ICreatePersonDTO from '@modules/people/dtos/ICreatePersonDTO';
import Person from '../entities/Person';

interface IFindPeople {
  id: string;
}

class PeopleRepository implements IPeopleRepository {
  private ormRepository: Repository<Person>;

  constructor() {
    this.ormRepository = getRepository(Person);
  }

  public async create(personData: ICreatePersonDTO): Promise<Person> {
    const person = this.ormRepository.create(personData);
    await this.ormRepository.save(person);
    return person;
  }

  public async save(person: Person): Promise<Person> {
    return this.ormRepository.save(person);
  }

  public async findByEnrollment(
    enrollment: string,
  ): Promise<Person | undefined> {
    const person = await this.ormRepository.findOne({
      where: { enrollment },
    });
    return person;
  }

  public async findAllById(id: string): Promise<Person[]> {
    const people = await this.ormRepository.find({
      where: { institution_id: id },
      relations: ['institution', 'person'],
    });
    return people;
  }

  public async findById(id: string): Promise<Person | undefined> {
    const person = await this.ormRepository.findOne(id);
    return person;
  }

  public async findAll(): Promise<Person[]> {
    const persons = await this.ormRepository.find({
      relations: ['institution'],
    });
    return persons;
  }

  public async findAllPeopleById(peopleIds: IFindPeople[]): Promise<Person[]> {
    const people = await this.ormRepository.findByIds(peopleIds);
    return people;
  }
}

export default PeopleRepository;
