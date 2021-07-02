import { uuid } from 'uuidv4';

import Institution from '@modules/institutions/infra/typeorm/entities/Institution';
import ICreateInstitutionDTO from '@modules/institutions/dtos/ICreateInstitutionDTO';
import IInstitutionsRepository from '../IInstitutionsRepository';

class FakeInstitutionsRepository implements IInstitutionsRepository {
  private institutions: Institution[] = [];

  public async findById(id: string): Promise<Institution | undefined> {
    const findInstitution = this.institutions.find(
      institution => institution.id === id,
    );
    return findInstitution;
  }

  public async create(
    institutionData: ICreateInstitutionDTO,
  ): Promise<Institution> {
    const institution = new Institution();
    Object.assign(institution, { id: uuid() }, institutionData);
    this.institutions.push(institution);
    return institution;
  }

  public async save(institution: Institution): Promise<Institution> {
    const findIndex = this.institutions.findIndex(
      findInstitution => findInstitution.id === institution.id,
    );
    this.institutions[findIndex] = institution;
    return institution;
  }

  public async findAll(): Promise<Institution[]> {
    return this.institutions;
  }

  public async findByName(name: string): Promise<Institution | undefined> {
    const findInstitution = this.institutions.find(
      institution => institution.name === name,
    );
    return findInstitution;
  }
}

export default FakeInstitutionsRepository;
