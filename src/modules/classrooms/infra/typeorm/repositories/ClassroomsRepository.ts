import ICreateClassroomDTO from '@modules/classrooms/dtos/ICreateClassroomDTO';
import IClassroomRepository from '@modules/classrooms/repositories/IClassroomsRepository';
import { getRepository, Repository } from 'typeorm';
import Classroom from '../entities/Classroom';

class ClassroomsRepository implements IClassroomRepository {
  private ormRepository: Repository<Classroom>;

  constructor() {
    this.ormRepository = getRepository(Classroom);
  }

  public async create({
    people,
    institution_id,
    name,
    shift,
    year,
  }: ICreateClassroomDTO): Promise<Classroom> {
    const classroom = this.ormRepository.create({
      name,
      shift,
      year,
      institution_id,
      classroom_people: people,
    });
    await this.ormRepository.save(classroom);
    return classroom;
  }

  public async save(classroom: Classroom): Promise<Classroom> {
    return this.ormRepository.save(classroom);
  }

  public async findById(id: string): Promise<Classroom | undefined> {
    // const classroom = await this.ormRepository
    //   .createQueryBuilder('classrooms_people')
    //   .where('classrooms_people.id = :id', {
    //     id,
    //   })
    //   .innerJoinAndSelect('classrooms_persons', 'persons')
    //   .getOne()

    const classroom = this.ormRepository.findOne({
      relations: ['classroom_people', 'institution'],
      where: { id },
    });
    return classroom;
  }

  public async findByName(name: string): Promise<Classroom | undefined> {
    const classroom = this.ormRepository.findOne({
      where: { name },
    });
    return classroom;
  }

  public async findAll(): Promise<Classroom[]> {
    const classrooms = await this.ormRepository.find({
      relations: ['institution', 'classroom_people'],
    });
    return classrooms;
  }
}

export default ClassroomsRepository;
