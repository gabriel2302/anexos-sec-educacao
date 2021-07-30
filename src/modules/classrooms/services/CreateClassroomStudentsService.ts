// import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
// import AppError from '@shared/errors/AppError';
// import { inject, injectable } from 'tsyringe';
// import ClassroomsStudents from '../infra/typeorm/entities/ClassroomsStudents';
// import IClassroomsRepository from '../repositories/IClassroomsRepository';

interface IStudent {
  id: string;
}

interface IRequest {
  institution: string;
  classroom_id: string;
  students: IStudent[];
}

// @injectable()
// class CreateClassroomStudentsService {
// constructor(
// @inject('ClassroomsRepository')
// private classroomsRepository: IClassroomsRepository,

// @inject('StudentsRepository')
// private studentsRepository: IStudentsRepository,
// ) {}

// public async execute({
// classroom_id,
// students,
// }: IRequest): Promise<ClassroomsStudents> {
// const checkClassroomExists = await this.classroomsRepository.findById(
// classroom_id,
// );
// if (!checkClassroomExists) {
// throw new AppError(`Classroom it not exists`);
// }
// const studentsIds = students.map(student => ({
// id: student.id,
// }));

// const originalStudents = await this.studentsRepository.findAllPeopleById(
// studentsIds,
// );

// const classroomStudents = students.map(student => {
// const originalStudent = originalStudents.find(
// findStudent => findStudent.id === student.id,
// );

// if (!originalStudent) {
// throw new AppError('Teacher not found');
// }
// return {
// student_id: originalStudent.id,
// };
// });

// const classroomsStudents = await this.classroomsRepository.create({
// students: classroomStudents,

// institution_id: institution,
// });

// return classroomsStudents;
// }
// }

// sexport default CreateClassroomStudentsService;
