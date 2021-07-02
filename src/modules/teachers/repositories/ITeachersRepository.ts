import ICreateTeacherDTO from '../dtos/ICreateTeacherDTO';
import Teacher from '../infra/typeorm/entities/Teacher';

export default interface ITeachersRepository {
  findById(id: string): Promise<Teacher | undefined>;
  findAll(): Promise<Teacher[]>;
  create(data: ICreateTeacherDTO): Promise<Teacher>;
  save(teacher: Teacher): Promise<Teacher>;
  deleteById(id: string): Promise<void>;
}
