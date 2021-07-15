import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import UpdatePasswordService from '@modules/people/services/UpdatePasswordService';
import ShowProfileService from '@modules/people/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.person.id;
    const showProfile = container.resolve(ShowProfileService);

    const person = await showProfile.execute(user_id);

    return response.json(classToClass(person));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const person_id = request.person.id;
    const { old_password, password, password_confirmation } = request.body;

    const updateProfile = container.resolve(UpdatePasswordService);

    const person = await updateProfile.execute({
      person_id,
      old_password,
      password,
      password_confirmation,
    });

    return response.json(classToClass(person));
  }
}
