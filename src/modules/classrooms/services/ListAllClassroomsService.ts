import { injectable, inject } from 'tsyringe';
import Classroom from '../infra/typeorm/entities/Classroom';
import IClassroomsRepository from '../repositories/IClassroomsRepository';

@injectable()
class ListAllClassroomsService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,
  ) {}

  public async execute(): Promise<Classroom[]> {
    // TODO: pegar o id do usuário no controller e verificar se ele é superadm
    const classrooms = await this.classroomsRepository.findAll();
    return classrooms;
  }
}

export default ListAllClassroomsService;
