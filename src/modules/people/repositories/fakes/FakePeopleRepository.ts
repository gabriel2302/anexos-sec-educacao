import { v4 as uuid } from 'uuid';

import Person from '@modules/people/infra/typeorm/entities/Person';
import ICreatePersonDTO from '@modules/people/dtos/ICreatePersonDTO';
import IPeopleRepository from '../IPeopleRepository';

class FakePeopleRepository implements IPeopleRepository {
  private people: Person[] = [];

  public async findById(id: string): Promise<Person | undefined> {
    const findPerson = this.people.find(person => person.id === id);
    return findPerson;
  }

  public async create(personData: ICreatePersonDTO): Promise<Person> {
    const person = new Person();
    Object.assign(person, { id: uuid() }, personData);
    this.people.push(person);
    return person;
  }

  public async save(person: Person): Promise<Person> {
    const findIndex = this.people.findIndex(
      findPerson => findPerson.id === person.id,
    );
    this.people[findIndex] = person;
    return person;
  }

  public async findAll(): Promise<Person[]> {
    return this.people;
  }

  public async findAllById(id: string): Promise<Person[]> {
    const people = this.people.filter(person => person.institution_id === id);
    return people;
  }

  public async findByEnrollment(
    enrollment: string,
  ): Promise<Person | undefined> {
    const findIndex = this.people.findIndex(
      findPerson => findPerson.enrollment === enrollment,
    );
    const person = this.people[findIndex];
    return person;
  }
}

export default FakePeopleRepository;
