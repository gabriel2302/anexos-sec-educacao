import { uuid } from 'uuidv4';
import Teacher from '@modules/teachers/infra/typeorm/entities/Teacher';
import ICreateTeacherDTO from '../../dtos/ICreateTeacherDTO';
import ITeachersRepository from '../ITeachersRepository';

class FakeTeachersRepository implements ITeachersRepository {
  private teachers: Teacher[] = [];

  public async findById(id: string): Promise<Teacher | undefined> {
    const findTeacher = this.teachers.find(teacher => teacher.id === id);
    return findTeacher;
  }

  public async create(data: ICreateTeacherDTO): Promise<Teacher> {
    const teacher = new Teacher();
    Object.assign(teacher, { id: uuid() }, data);
    this.teachers.push(teacher);
    return teacher;
  }

  public async save(teacher: Teacher): Promise<Teacher> {
    const findIndex = this.teachers.findIndex(
      findTeacher => findTeacher.id === teacher.id,
    );
    this.teachers[findIndex] = teacher;
    return teacher;
  }

  public async findAll(): Promise<Teacher[]> {
    return this.teachers;
  }

  public async deleteById(id: string): Promise<void> {
    const findIndex = this.teachers.findIndex(
      findTeachers => findTeachers.id === id,
    );
    this.teachers.splice(this.teachers.indexOf(this.teachers[findIndex]), 1);
  }
}

export default FakeTeachersRepository;
