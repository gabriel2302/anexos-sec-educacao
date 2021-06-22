import Student from '@modules/students/infra/typeorm/entities/Student';
import ICreateStudentsDTO from '../dtos/ICreateStudentsDTO';

export default interface IStudentsRepository {
  create(data: ICreateStudentsDTO): Promise<Student>;
  findAll(): Promise<Student[]>;
}
