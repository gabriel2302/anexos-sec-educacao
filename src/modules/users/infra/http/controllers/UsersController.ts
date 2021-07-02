import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListAllUsersService from '@modules/users/services/ListAllUsersService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, role, password, passwordConfirmation, institution_id } =
      request.body;

    const createUser = container.resolve(CreateUserService);

    const newUser = await createUser.execute({
      username,
      role,
      password,
      passwordConfirmation,
      institution_id,
    });

    return response.json(classToClass(newUser));
  }

  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const users = container.resolve(ListAllUsersService);
    const userList = await users.execute();
    return response.json(classToClass(userList));
  }
}
