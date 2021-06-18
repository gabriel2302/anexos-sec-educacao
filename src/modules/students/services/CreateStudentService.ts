import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  birthdate: string;
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
