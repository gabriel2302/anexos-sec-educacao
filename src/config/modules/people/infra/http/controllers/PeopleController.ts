import CreatePersonService from '@modules/people/services/CreatePersonService';
import ListAllPeopleByIdService from '@modules/people/services/ListAllPeopleByIdService';
import ListAllPeopleService from '@modules/people/services/ListAllPeopleService';
import UpdatePersonService from '@modules/people/services/UpdatePersonService';
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
    const { role } = request.person;
    const people = container.resolve(ListAllPeopleService);
    const peopleList = await people.execute({ role });
    return response.json(classToClass(peopleList));
  }

  public async listAllById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { role, institution } = request.person;
    const people = container.resolve(ListAllPeopleByIdService);
    const peopleList = await people.execute({ role, institution });
    return response.json(classToClass(peopleList));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, office, occupation, enrollment } = request.body;
    const person = container.resolve(UpdatePersonService);
    const updatePerson = await person.execute({
      person_id: id,
      name,
      office,
      enrollment,
      occupation,
    });
    return response.json(classToClass(updatePerson));
  }
}
