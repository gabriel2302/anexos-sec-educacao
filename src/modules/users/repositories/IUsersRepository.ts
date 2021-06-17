import User from '../infra/typeorm/entities/User';

import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<User>;
  save(user: User): Promise<User>;
}
