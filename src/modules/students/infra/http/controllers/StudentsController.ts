import CreateStudentService from '@modules/students/services/CreateStudentService';
import DeleteStudentByIdService from '@modules/students/services/DeleteStudentByIdService';
import ListAllStudentsService from '@modules/students/services/ListAllStudentsService';
import UpdateStudentService from '@modules/students/services/UpdateStudentService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class StudentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, birthdate } = request.body;
    const createStudent = container.resolve(CreateStudentService);
    const newStudent = await createStudent.execute({
      name,
      birthdate,
    });
    return response.json(classToClass(newStudent));
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listAllStudents = container.resolve(ListAllStudentsService);
    const students = await listAllStudents.execute();
    return response.json(classToClass(students));
  }

  public async deleteById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const deleteProduct = container.resolve(DeleteStudentByIdService);
    await deleteProduct.execute(id);
    return response.status(204).json();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, birthdate } = request.body;
    const { id } = request.params;
    const updateStudent = container.resolve(UpdateStudentService);
    const student = await updateStudent.execute({ name, birthdate, id });
    return response.json(classToClass(student));
  }
}
