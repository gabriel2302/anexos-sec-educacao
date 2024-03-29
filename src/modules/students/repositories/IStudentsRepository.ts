import Student from '@modules/students/infra/typeorm/entities/Student';
import ICreateStudentsDTO from '../dtos/ICreateStudentsDTO';

export default interface IStudentsRepository {
  create(data: ICreateStudentsDTO): Promise<Student>;
  save(student: Student): Promise<Student>;
  findAll(): Promise<Student[]>;
  findById(studentId: string): Promise<Student | undefined>;
  findAllByInstitutionId(id: string): Promise<Student[]>;
  deleteById(studentId: string): Promise<void>;
}
