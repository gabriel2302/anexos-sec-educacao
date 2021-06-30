import { container } from 'tsyringe';
import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';

import IInstitutionsRepository from '@modules/institutions/repositories/IInstitutionsRepository';
import InstitutionsRepository from '@modules/institutions/infra/typeorm/repositories/InstitutionsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IStudentsRepository>(
  'StudentsRepository',
  StudentsRepository,
);

container.registerSingleton<IInstitutionsRepository>(
  'InstitutionsRepository',
  InstitutionsRepository,
);
