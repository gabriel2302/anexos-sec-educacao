import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import { getRepository, Repository } from 'typeorm';
import Student from '@modules/students/infra/typeorm/entities/Student';
import ICreateStudentsDTO from '@modules/students/dtos/ICreateStudentsDTO';

interface IFindStudent {
  id: string;
}

class StudentsRepository implements IStudentsRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  public async create({
    name,
    birthdate,
    institution_id,
  }: ICreateStudentsDTO): Promise<Student> {
    const student = this.ormRepository.create({
      birthdate,
      name,
      institution_id,
    });
    await this.ormRepository.save(student);
    return student;
  }

  public async save(student: Student): Promise<Student> {
    return this.ormRepository.save(student);
  }

  public async findAll(): Promise<Student[]> {
    const students = this.ormRepository.find({
      relations: ['institution'],
    });
    return students;
  }

  public async findAllByInstitutionId(id: string): Promise<Student[]> {
    const students = await this.ormRepository.find({
      where: { institution_id: id },
      relations: ['institution'],
    });
    return students;
  }

  public async findAllPeopleById(
    studentsIds: IFindStudent[],
  ): Promise<Student[]> {
    const students = await this.ormRepository.findByIds(studentsIds);
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
