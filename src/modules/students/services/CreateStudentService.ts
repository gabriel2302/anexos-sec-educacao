import { inject, injectable } from 'tsyringe';
import Student from '@modules/students/infra/typeorm/entities/Student';
import IInstitutionsRepository from '@modules/institutions/repositories/IInstitutionsRepository';
import AppError from '@shared/errors/AppError';
import IStudentsRepository from '../repositories/IStudentsRepository';

interface IRequest {
  name: string;
  birthdate: Date;
  institution: string;
}

@injectable()
class CreateStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,

    @inject('InstitutionsRepository')
    private institutionRepository: IInstitutionsRepository,
  ) {}

  public async execute({
    name,
    birthdate,
    institution,
  }: IRequest): Promise<Student> {
    const checkInstitutionExists = await this.institutionRepository.findById(
      institution,
    );
    if (!checkInstitutionExists) {
      throw new AppError('Institution does not exists');
    }
    const student = await this.studentsRepository.create({
      name,
      birthdate,
      institution_id: institution,
    });
    return student;
  }
}

export default CreateStudentService;
