import Person from '../infra/typeorm/entities/Person';

import ICreatePersonDTO from '../dtos/ICreatePersonDTO';

export default interface IPeopleRepository {
  create(data: ICreatePersonDTO): Promise<Person>;
  save(user: Person): Promise<Person>;
  findByEnrollment(enrollment: string): Promise<Person | undefined>;
  findById(id: string): Promise<Person | undefined>;
  findAll(): Promise<Person[]>;
}
