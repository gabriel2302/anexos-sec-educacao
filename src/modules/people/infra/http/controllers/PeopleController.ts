import CreatePersonService from '@modules/people/services/CreatePersonService';
import ListAllPeopleService from '@modules/people/services/ListAllPeopleService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PeopleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { institution } = request.person;
    const {
      role,
      password,
      name,
      enrollment,
      office,
      occupation,
      functional_situation,
    } = request.body;

    const createPerson = container.resolve(CreatePersonService);

    const newPerson = await createPerson.execute({
      role,
      password,
      name,
      enrollment,
      office,
      occupation,
      functional_situation,
      institution,
    });

    return response.json(classToClass(newPerson));
  }

  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const people = container.resolve(ListAllPeopleService);
    const peopleList = await people.execute();
    return response.json(classToClass(peopleList));
  }
}
