import { injectable, inject } from 'tsyringe';
import IStudentsRepository from '../repositories/IStudentsRepository';
import Student from '../infra/typeorm/entities/Student';

@injectable()
class ListAllStudentsService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  public async execute(): Promise<Student[]> {
    const students = await this.studentsRepository.findAll();
    return students;
  }
}

export default ListAllStudentsService;
