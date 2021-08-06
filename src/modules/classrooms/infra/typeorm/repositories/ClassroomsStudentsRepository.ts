import ICreateClassroomStudentsDTO from '@modules/classrooms/dtos/ICreateClassroomStudentsDTO';
import IClassroomsStudentsRepository from '@modules/classrooms/repositories/IClassroomsStudentsRepository';
import { getRepository, Repository } from 'typeorm';
import Classroom from '../entities/Classroom';
import ClassroomStudents from '../entities/ClassroomsStudents';

class ClassroomsRepository implements IClassroomsStudentsRepository {
  private ormRepository: Repository<ClassroomStudents>;

  constructor() {
    this.ormRepository = getRepository(ClassroomStudents);
  }

  public async create({
    classroom_id,
    students,
  }: ICreateClassroomStudentsDTO): Promise<ClassroomStudents> {
    const classroomStudents = this.ormRepository.create({
      classroom_id,
      student,
    });
    await this.ormRepository.save(classroom);
    return classroom;
  }

  public async save(classroom: Classroom): Promise<Classroom> {
    return this.ormRepository.save(classroom);
  }

  public async findById(id: string): Promise<Classroom | undefined> {
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
