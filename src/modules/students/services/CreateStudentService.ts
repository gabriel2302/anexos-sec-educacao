import { inject, injectable } from 'tsyringe';
import Student from '@modules/students/infra/typeorm/entities/Student';
import IStudentsRepository from '../repositories/IStudentsRepository';

interface IRequest {
  name: string;
  birthdate: Date;
}

@injectable()
class CreateStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  public async execute({ name, birthdate }: IRequest): Promise<Student> {
    const student = await this.studentsRepository.create({
      name,
      birthdate,
    });
    return student;
  }
}

export default CreateStudentService;
