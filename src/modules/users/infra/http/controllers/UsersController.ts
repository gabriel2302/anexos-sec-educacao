import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, role, password, passwordConfirmation } = request.body;

    const createUser = container.resolve(CreateUserService);

    const newUser = await createUser.execute({
      username,
      role,
      password,
      passwordConfirmation,
    });

    return response.json(classToClass(newUser));
  }
}
