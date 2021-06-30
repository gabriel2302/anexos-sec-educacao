import ICreateInstitutionDTO from '@modules/institutions/dtos/ICreateInstitutionDTO';
import IInstitutionRepository from '@modules/institutions/repositories/IInstitutionsRepository';
import { getRepository, Repository } from 'typeorm';
import Institution from '../entities/Institution';

class InstitutionsRepository implements IInstitutionRepository {
  private ormRepository: Repository<Institution>;

  constructor() {
    this.ormRepository = getRepository(Institution);
  }

  public async create({
    name,
    director,
    learning_kind,
  }: ICreateInstitutionDTO): Promise<Institution> {
    const institution = this.ormRepository.create({
      name,
      director,
      learning_kind,
    });
    await this.ormRepository.save(institution);
    return institution;
  }

  public async save(institution: Institution): Promise<Institution> {
    return this.ormRepository.save(institution);
  }

  public async findById(id: string): Promise<Institution | undefined> {
    const institution = this.ormRepository.findOne(id);
    return institution;
  }

  public async findByName(name: string): Promise<Institution | undefined> {
    const institution = this.ormRepository.findOne({
      where: { name },
    });
    return institution;
  }

  public async findAll(): Promise<Institution[]> {
    const institutions = this.ormRepository.find();
    return institutions;
  }
}

export default InstitutionsRepository;
