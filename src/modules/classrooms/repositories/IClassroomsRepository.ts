import ICreateClassroomDTO from '../dtos/ICreateClassroomDTO';
import Classroom from '../infra/typeorm/entities/Classroom';

export default interface IClassroomsRepository {
  create(data: ICreateClassroomDTO): Promise<Classroom>;
  save(classroom: Classroom): Promise<Classroom>;
  findById(id: string): Promise<Classroom | undefined>;
  findByName(name: string): Promise<Classroom | undefined>;
  findAll(): Promise<Classroom[]>;
}
