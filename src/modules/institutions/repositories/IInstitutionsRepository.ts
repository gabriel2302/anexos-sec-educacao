import ICreateInstitutionDTO from '../dtos/ICreateInstitutionDTO';
import Institution from '../infra/typeorm/entities/Institution';

export default interface IInstitutionsRepository {
  create(data: ICreateInstitutionDTO): Promise<Institution>;
  save(institution: Institution): Promise<Institution>;
  findById(id: string): Promise<Institution | undefined>;
  findByName(name: string): Promise<Institution | undefined>;
  findAll(): Promise<Institution[]>;
}
