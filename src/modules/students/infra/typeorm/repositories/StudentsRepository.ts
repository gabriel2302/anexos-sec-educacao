import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import { getRepository, Repository } from 'typeorm';
import Student from '@modules/students/infra/typeorm/entities/Student';
import ICreateStudentsDTO from '@modules/students/dtos/ICreateStudentsDTO';

class StudentsRepository implements IStudentsRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  public async create({
    name,
    birthdate,
  }: ICreateStudentsDTO): Promise<Student> {
    const student = this.ormRepository.create({
      birthdate,
      name,
    });
    await this.ormRepository.save(student);
    return student;
  }

  public async findAll(): Promise<Student[]> {
    const students = this.ormRepository.find();
    return students;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async findById(id: string): Promise<Student | undefined> {
    const student = await this.ormRepository.findOne(id);
    return student;
  }
}

export default StudentsRepository;
