import { inject, injectable } from 'tsyringe';

import IClassroomsRepository from '../repositories/IClassroomsRepository';
import Classroom from '../infra/typeorm/entities/Classroom';

interface IRequest {
  id: string;
}

@injectable()
class FindClassroomService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Classroom | undefined> {
    const classroom = await this.classroomsRepository.findById(id);
    return classroom;
  }
}

export default FindClassroomService;
