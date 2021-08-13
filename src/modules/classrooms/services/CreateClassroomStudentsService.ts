import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ClassroomsStudents from '../infra/typeorm/entities/ClassroomsStudents';
import IClassroomsRepository from '../repositories/IClassroomsRepository';
import IClassroomsStudentsRepository from '../repositories/IClassroomsStudentsRepository';

interface Student {
  id: string;
}

interface IRequest {
  classroom_id: string;
  students: Student[];
}

@injectable()
class CreateClassroomStudentsService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,

    @inject('ClassroomsStudentsRepository')
    private classroomsStudentsRepository: IClassroomsStudentsRepository,

    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  public async execute({
    classroom_id,
    students,
  }: IRequest): Promise<ClassroomsStudents> {
    const checkClassroomExists = await this.classroomsRepository.findById(
      classroom_id,
    );
    if (!checkClassroomExists) {
      throw new AppError(`Classroom it not exists`);
    }
    const studentsIds = students.map(student => ({
      id: student.id,
    }));

    const originalStudents = await this.studentsRepository.findAllPeopleById(
      studentsIds,
    );

    const classroomStudents = students.map(student => {
      const originalStudent = originalStudents.find(
        findStudent => findStudent.id === student.id,
      );

      if (!originalStudent) {
        throw new AppError('Teacher not found');
      }
      return {
        student_id: originalStudent.id,
      };
    });

    console.log(classroomStudents);

    const classroomsStudents = await this.classroomsStudentsRepository.create({
      students: classroomStudents,
      classroom_id,
    });
    console.log(classroomsStudents);
    return classroomsStudents;
  }
}

export default CreateClassroomStudentsService;
