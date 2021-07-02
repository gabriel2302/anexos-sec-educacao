import CreateTeacherService from '@modules/teachers/services/CreateTeacherService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class TeachersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      enrollment,
      office,
      occupation,
      functional_situation,
      institution_id,
    } = request.body;
    const createTeacher = container.resolve(CreateTeacherService);
    const newTeacher = await createTeacher.execute({
      enrollment,
      functional_situation,
      institution_id,
      name,
      occupation,
      office,
    });
    return response.json(classToClass(newTeacher));
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const { name, director, learning_kind } = request.body;
  //   const { id } = request.params;
  //   const updateInstitution = container.resolve(UpdateTeacherservice);
  //   const institution = await updateInstitution.execute({
  //     name,
  //     director,
  //     learning_kind,
  //     id,
  //   });
  //   return response.json(classToClass(institution));
  // }

  // public async findAll(
  //   request: Request,
  //   response: Response,
  // ): Promise<Response> {
  //   const listAllTeachers = container.resolve(ListAllTeachersService);
  //   const Teachers = await listAllTeachers.execute();
  //   return response.json(classToClass(Teachers));
  // }
}
export default TeachersController;
