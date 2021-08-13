import ICreateClassroomStudentsDTO from '../dtos/ICreateClassroomStudentsDTO';
import ClassroomStudents from '../infra/typeorm/entities/ClassroomsStudents';

export default interface IClassroomsStudentsRepository {
  create(data: ICreateClassroomStudentsDTO): Promise<ClassroomStudents>;
  save(classroomStudents: ClassroomStudents): Promise<ClassroomStudents>;
  findById(id: string): Promise<ClassroomStudents | undefined>;
  findAll(): Promise<ClassroomStudents[]>;
}
