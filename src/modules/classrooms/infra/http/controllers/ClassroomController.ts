import CreateClassroomService from '@modules/classrooms/services/CreateClassroomService';
import FindClassroomService from '@modules/classrooms/services/FindClassroomService';
import ListAllClassroomsService from '@modules/classrooms/services/ListAllClassroomsService';
import UpdateInstitutionService from '@modules/institutions/services/UpdateInstitutionService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ClassroomController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findClassroom = container.resolve(FindClassroomService);

    const classroom = await findClassroom.execute({ id });

    return response.json(classroom);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, year, shift, people } = request.body;
    const { institution } = request.person;
    const createClass = container.resolve(CreateClassroomService);
    const classroom = await createClass.execute({
      name,
      year,
      shift,
      people,
      institution,
    });
    return response.json(classToClass(classroom));
  }

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
export default ClassroomController;
