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
    // TODO: pegar o id do usuário no controller e verificar se ele é superadm
    const institutions = await this.institutionsRepository.findAll();
    return institutions;
  }
}

export default ListAllInstitutionsService;
