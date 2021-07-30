// import CreateClassroomService from '@modules/classrooms/services/CreateClassroomService';
import FindClassroomService from '@modules/classrooms/services/FindClassroomService';
import ListAllClassroomsService from '@modules/classrooms/services/ListAllClassroomsService';
import UpdateInstitutionService from '@modules/institutions/services/UpdateInstitutionService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ClassroomStudentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findClassroom = container.resolve(FindClassroomService);

    const classroom = await findClassroom.execute({ id });

    return response.json(classroom);
  }

  // public async create(request: Request, response: Response): Promise<Response> {
  // const { classroom_id, students } = request.body;
  // const { institution } = request.person;
  // const createClassroomStudents = container.resolve(
  // CreateClassroomStudentsService,
  // );
  // const students = await createClassroomStudents.execute({
  // institution,
  // classroom_id,
  // students,
  // });
  // return response.json(classToClass(students));
  // }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, director, learning_kind } = request.body;
    const { id } = request.params;
    const updateInstitution = container.resolve(UpdateInstitutionService);
    const institution = await updateInstitution.execute({
      name,
      director,
      learning_kind,
      id,
    });
    return response.json(classToClass(institution));
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listAllClassrooms = container.resolve(ListAllClassroomsService);
    const classrooms = await listAllClassrooms.execute();
    return response.json(classToClass(classrooms));
  }
}
export default ClassroomStudentsController;
