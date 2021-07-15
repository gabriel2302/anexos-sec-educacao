import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IStudentsRepository from '../repositories/IStudentsRepository';

@injectable()
class DeleteStudentByIdService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  public async execute(student_id: string): Promise<void> {
    const student = await this.studentsRepository.findById(student_id);
    if (!student) {
      throw new AppError('Student not found');
    }
    await this.studentsRepository.deleteById(student.id);
  }
}

export default DeleteStudentByIdService;
