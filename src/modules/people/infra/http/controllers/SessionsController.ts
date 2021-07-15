import AuthenticatePersonService from '@modules/people/services/AuthenticatePersonService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;
    const authenticatePerson = container.resolve(AuthenticatePersonService);
    const { person, token } = await authenticatePerson.execute({
      username,
      password,
    });

    return response.json({ user: classToClass(person), token });
  }
}
