import { v4 as uuid } from 'uuid';
import ICreateStudentsDTO from '@modules/students/dtos/ICreateStudentsDTO';
import IStudentsRepository from '../IStudentsRepository';
import Student from '../../infra/typeorm/entities/Student';

class FakeStudentsRepository implements IStudentsRepository {
  private students: Student[] = [];

  public async findById(id: string): Promise<Student | undefined> {
    const findStudent = this.students.find(student => student.id === id);
    return findStudent;
  }

  public async create(data: ICreateStudentsDTO): Promise<Student> {
    const student = new Student();
    Object.assign(student, { id: uuid() }, data);
    this.students.push(student);
    return student;
  }

  public async save(student: Student): Promise<Student> {
    const findIndex = this.students.findIndex(
      findStudent => findStudent.id === student.id,
    );
    this.students[findIndex] = student;
    return student;
  }

  public async findAll(): Promise<Student[]> {
    return this.students;
  }

  public async findAllByInstitutionId(id: string): Promise<Student[]> {
    const students = this.students.filter(
      student => student.institution_id === id,
    );
    return students;
  }

  public async deleteById(id: string): Promise<void> {
    const findIndex = this.students.findIndex(
      findStudent => findStudent.id === id,
    );
    this.students.splice(this.students.indexOf(this.students[findIndex]), 1);
  }
}

export default FakeStudentsRepository;
