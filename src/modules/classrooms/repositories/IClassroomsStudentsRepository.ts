import ICreateClassroomDTO from '../dtos/ICreateClassroomDTO';
import Classroom from '../infra/typeorm/entities/Classroom';
import ClassroomStudents from '../infra/typeorm/entities/ClassroomsStudents';

export default interface IClassroomsStudentsRepository {
  create(data: ICreateClassroomDTO): Promise<ClassroomStudents>;
  save(classroomStudents: Classroom): Promise<ClassroomStudents>;
  findById(id: string): Promise<ClassroomStudents | undefined>;
  findAll(): Promise<ClassroomStudents[]>;
}
