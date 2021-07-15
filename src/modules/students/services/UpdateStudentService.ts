import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IStudentsRepository from '../repositories/IStudentsRepository';
import Student from '../infra/typeorm/entities/Student';

type IRequest = {
  id: string;
  name?: string;
  birthdate?: Date;
};
@injectable()
class UpdateStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  public async execute({ id, birthdate, name }: IRequest): Promise<Student> {
    const student = await this.studentsRepository.findById(id);
    if (!student) {
      throw new AppError('Student not found');
    }
    if (name) {
      student.name = name;
    }
    if (birthdate) {
      student.birthdate = birthdate;
    }
    await this.studentsRepository.save(student);
    return student;
  }
}

export default UpdateStudentService;
