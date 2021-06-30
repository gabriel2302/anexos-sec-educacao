import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Institution from '../infra/typeorm/entities/Institution';
import IInstitutionsRepository from '../repositories/IInstitutionsRepository';

type IRequest = {
  name: string;
  director: string;
  learning_kind: string;
};

@injectable()
class CreateInstitutionService {
  constructor(
    @inject('InstitutionsRepository')
    private institutionsRepository: IInstitutionsRepository,
  ) {}

  public async execute({
    name,
    director,
    learning_kind,
  }: IRequest): Promise<Institution> {
    const checkInstitutionExists = await this.institutionsRepository.findByName(
      name,
    );
    if (checkInstitutionExists) {
      throw new AppError(`Institution name's already in use`);
    }
    const institution = await this.institutionsRepository.create({
      name,
      director,
      learning_kind,
    });
    return institution;
  }
}

export default CreateInstitutionService;
