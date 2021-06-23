import Student from '@modules/students/infra/typeorm/entities/Student';
import ICreateStudentsDTO from '../dtos/ICreateStudentsDTO';

export default interface IStudentsRepository {
  create(data: ICreateStudentsDTO): Promise<Student>;
  findAll(): Promise<Student[]>;
  findById(studentId: string): Promise<Student | undefined>;
  deleteById(studentId: string): Promise<void>;
}
