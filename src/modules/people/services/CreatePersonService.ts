import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/people/providers/HashProvider/models/IHashProvider';
import IInstitutionsRepository from '@modules/institutions/repositories/IInstitutionsRepository';
import IPeopleRepository from '../repositories/IPeopleRepository';
import Person from '../infra/typeorm/entities/Person';

interface IRequest {
  role?: string;
  password: string;
  enrollment: string;
  functional_situation: string;
  name: string;
  occupation: string;
  office: string;
  institution: string;
}

@injectable()
class CreatePersonService {
  constructor(
    @inject('PeopleRepository')
    private peopleRepository: IPeopleRepository,

    @inject('InstitutionsRepository')
    private institutionRepository: IInstitutionsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    role = 'user',
    enrollment,
    functional_situation,
    name,
    occupation,
    office,
    institution,
  }: IRequest): Promise<Person> {
    const checkUserExists = await this.peopleRepository.findByEnrollment(
      enrollment,
    );
    if (checkUserExists) {
      throw new AppError('User enrollment already exists');
    }
    const checkInstitutionExists = await this.institutionRepository.findById(
      institution,
    );

    if (!checkInstitutionExists) {
      throw new AppError('Institution does not exists');
    }
    if (checkInstitutionExists.id !== institution) {
      throw new AppError(
        'Institution id must be equal to institution user',
        403,
      );
    }

    // TODO: - Verificar se a instituicao e a mesma do usuario logado

    const hashedPassword = await this.hashProvider.generateHash(enrollment);

    // TODO: Tirar o id da instituicao da rota e pegar do usuario logado
    const newPerson = await this.peopleRepository.create({
      username: enrollment,
      role,
      institution_id: institution,
      password: hashedPassword,
      enrollment,
      functional_situation,
      name,
      occupation,
      office,
    });

    return newPerson;
  }
}

export default CreatePersonService;
