import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Institution from '../infra/typeorm/entities/Institution';
import IInstitutionsRepository from '../repositories/IInstitutionsRepository';

type IRequest = {
  id: string;
  name?: string;
  director?: string;
  learning_kind?: string;
};
@injectable()
class UpdateInstitutionService {
  constructor(
    @inject('InstitutionsRepository')
    private institutiosRepository: IInstitutionsRepository,
  ) {}

  public async execute({
    id,
    name,
    director,
    learning_kind,
  }: IRequest): Promise<Institution> {
    const institution = await this.institutiosRepository.findById(id);
    if (!institution) {
      throw new AppError('Institution not found');
    }

    if (name) {
      const checkInstitutionExists =
        await this.institutiosRepository.findByName(name);

      if (checkInstitutionExists && checkInstitutionExists.id !== id) {
        throw new AppError(`Institution name's already in use`);
      }
      institution.name = name;
    }
    if (director) {
      institution.director = director;
    }
    if (learning_kind) {
      institution.learning_kind = learning_kind;
    }
    await this.institutiosRepository.save(institution);
    return institution;
  }
}

export default UpdateInstitutionService;
