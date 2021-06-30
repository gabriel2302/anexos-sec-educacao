import { injectable, inject } from 'tsyringe';
import Institution from '../infra/typeorm/entities/Institution';
import IInstitutionsRepository from '../repositories/IInstitutionsRepository';

@injectable()
class ListAllInstitutionsService {
  constructor(
    @inject('InstitutionsRepository')
    private institutionsRepository: IInstitutionsRepository,
  ) {}

  public async execute(): Promise<Institution[]> {
    const institutions = await this.institutionsRepository.findAll();
    return institutions;
  }
}

export default ListAllInstitutionsService;
