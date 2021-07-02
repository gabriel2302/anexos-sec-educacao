import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IInstitutionsRepository from '@modules/institutions/repositories/IInstitutionsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import Teacher from '../infra/typeorm/entities/Teacher';
import ITeachersRepository from '../repositories/ITeachersRepository';

interface IRequest {
  name: string;
  enrollment: string;
  office: string;
  occupation: string;
  functional_situation: string;
  institution_id: string;
}

@injectable()
class CreateTeacherService {
  constructor(
    @inject('TeachersRepository')
    private teachersRepository: ITeachersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('InstitutionsRepository')
    private institutionsRepository: IInstitutionsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    enrollment,
    occupation,
    office,
    functional_situation,
    institution_id,
  }: IRequest): Promise<Teacher> {
    const checkInstitutionExists = await this.institutionsRepository.findById(
      institution_id,
    );

    if (!checkInstitutionExists) {
      throw new AppError('Institution does not exist.');
    }

    const checkTeacherExists = await this.teachersRepository.findByEnrollment(
      enrollment,
    );

    if (checkTeacherExists) {
      throw new AppError('Teacher Enrollment already in use');
    }

    const teacher = await this.teachersRepository.create({
      name,
      enrollment,
      occupation,
      office,
      functional_situation,
      institution_id,
    });

    const hashedPassword = await this.hashProvider.generateHash(
      teacher.enrollment,
    );

    await this.usersRepository.create({
      username: teacher.enrollment,
      institution_id,
      password: hashedPassword,
      teacher_id: teacher.id,
      role: 'user',
    });
    return teacher;
  }
}

export default CreateTeacherService;
