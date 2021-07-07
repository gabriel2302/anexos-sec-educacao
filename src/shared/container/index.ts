import { container } from 'tsyringe';
import '@modules/people/providers';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';

import IInstitutionsRepository from '@modules/institutions/repositories/IInstitutionsRepository';
import InstitutionsRepository from '@modules/institutions/infra/typeorm/repositories/InstitutionsRepository';

import IPeopleRepository from '@modules/people/repositories/IPeopleRepository';
import PeopleRepository from '@modules/people/infra/typeorm/repositories/PeopleRepository';

container.registerSingleton<IStudentsRepository>(
  'StudentsRepository',
  StudentsRepository,
);

container.registerSingleton<IInstitutionsRepository>(
  'InstitutionsRepository',
  InstitutionsRepository,
);

container.registerSingleton<IPeopleRepository>(
  'PeopleRepository',
  PeopleRepository,
);
