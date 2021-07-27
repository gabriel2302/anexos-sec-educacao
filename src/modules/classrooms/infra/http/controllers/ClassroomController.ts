import CreateClassroomService from '@modules/classrooms/services/CreateClassroomService';
import ListAllClassroomsService from '@modules/classrooms/services/ListAllClassroomsService';
import UpdateInstitutionService from '@modules/institutions/services/UpdateInstitutionService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ClassroomController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, year, shift, people } = request.body;
    const { institution } = request.person;
    const createClass = container.resolve(CreateClassroomService);
    const newClass = await createClass.execute({
      name,
      year,
      shift,
      people,
      institution,
    });
    console.log('newClassControler: ', newClass);
    return response.json(classToClass(newClass));
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
