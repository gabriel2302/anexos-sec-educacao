import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import UpdatePasswordService from '@modules/users/services/UpdatePasswordService';

export default class ProfileController {
  // public async show(request: Request, response: Response): Promise<Response> {
  //   const user_id = request.user.id;

  //   const showProfile = container.resolve(ShowProfileService);

  //   const user = await showProfile.execute({ user_id });

  //   return response.json(classToClass(user));
  // }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { old_password, password, password_confirmation } = request.body;

    const updateProfile = container.resolve(UpdatePasswordService);

    const user = await updateProfile.execute({
      user_id,
      old_password,
      password,
      password_confirmation,
    });

    return response.json(classToClass(user));
  }
}