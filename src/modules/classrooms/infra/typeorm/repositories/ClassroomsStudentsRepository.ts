import ICreateClassroomStudentsDTO from '@modules/classrooms/dtos/ICreateClassroomStudentsDTO';
import IClassroomsStudentsRepository from '@modules/classrooms/repositories/IClassroomsStudentsRepository';
import { getRepository, Repository } from 'typeorm';

import ClassroomStudents from '../entities/ClassroomsStudents';

class ClassroomsStudentsRepository implements IClassroomsStudentsRepository {
  private ormRepository: Repository<ClassroomStudents>;

  constructor() {
    this.ormRepository = getRepository(ClassroomStudents);
  }

  public async create({
    classroom_id,
    students,
  }: ICreateClassroomStudentsDTO): Promise<ClassroomStudents> {
    const classroomStudents = this.ormRepository.create({
      students: [
        { id: '6f6b3ac0-0ed2-408f-b0df-001c65a51746' },
        { id: '533b8f7b-094c-4f2e-b3ae-40a294bebea5' },
      ],
      classroom_id,
    });
    await this.ormRepository.save(classroomStudents);
    return classroomStudents;
  }

  public async save(
    classroomStudents: ClassroomStudents,
  ): Promise<ClassroomStudents> {
    return this.ormRepository.save(classroomStudents);
  }

  public async findById(id: string): Promise<ClassroomStudents | undefined> {
    const classroom = this.ormRepository.findOne({
      relations: ['classroom_people', 'institution'],
      where: { id },
    });
    return classroom;
  }

  public async findAll(): Promise<ClassroomStudents[]> {
    const classrooms = await this.ormRepository.find({
      relations: ['institution', 'classroom_people'],
    });
    return classrooms;
  }
}

export default ClassroomsStudentsRepository;
