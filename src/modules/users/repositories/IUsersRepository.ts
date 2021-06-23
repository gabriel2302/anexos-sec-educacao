import User from '../infra/typeorm/entities/User';

import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<User>;
  save(user: User): Promise<User>;
  findByUser(username: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
}
