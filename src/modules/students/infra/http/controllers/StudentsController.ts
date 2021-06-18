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
}
