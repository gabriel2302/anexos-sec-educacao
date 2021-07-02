import ICreateTeacherDTO from '@modules/teachers/dtos/ICreateTeacherDTO';
import ITeachersRepository from '@modules/teachers/repositories/ITeachersRepository';
import { getRepository, Repository } from 'typeorm';
import Teacher from '../entities/Teacher';

class TeachersRepository implements ITeachersRepository {
  private ormRepository: Repository<Teacher>;

  constructor() {
    this.ormRepository = getRepository(Teacher);
  }

  public async findById(id: string): Promise<Teacher | undefined> {
    const teacher = await this.ormRepository.findOne(id);
    return teacher;
  }

  public async findAll(): Promise<Teacher[]> {
    const teachers = await this.ormRepository.find();
    return teachers;
  }

  public async findByEnrollment(
    enrollment: string,
  ): Promise<Teacher | undefined> {
    const teacher = this.ormRepository.findOne({
      where: { enrollment },
      relations: ['institution'],
    });
    return teacher;
  }

  public async create(teacherData: ICreateTeacherDTO): Promise<Teacher> {
    const teacher = this.ormRepository.create(teacherData);
    await this.ormRepository.save(teacher);
    return teacher;
  }

  public async save(teacher: Teacher): Promise<Teacher> {
    return this.ormRepository.save(teacher);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default TeachersRepository;
