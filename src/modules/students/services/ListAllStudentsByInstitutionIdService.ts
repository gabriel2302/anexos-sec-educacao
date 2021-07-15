import { inject, injectable } from 'tsyringe';
import Student from '../infra/typeorm/entities/Student';
import IStudentsRepository from '../repositories/IStudentsRepository';

type IRequest = {
  role?: string;
  institution: string;
};

@injectable()
class ListAllStudentsByInstitutionIdService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  public async execute({ institution }: IRequest): Promise<Student[]> {
    const students = await this.studentsRepository.findAllByInstitutionId(
      institution,
    );
    return students;
  }
}

export default ListAllStudentsByInstitutionIdService;
