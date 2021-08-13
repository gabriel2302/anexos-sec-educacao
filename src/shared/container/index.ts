import { container } from 'tsyringe';
import '@modules/people/providers';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';

import IInstitutionsRepository from '@modules/institutions/repositories/IInstitutionsRepository';
import InstitutionsRepository from '@modules/institutions/infra/typeorm/repositories/InstitutionsRepository';

import IPeopleRepository from '@modules/people/repositories/IPeopleRepository';
import PeopleRepository from '@modules/people/infra/typeorm/repositories/PeopleRepository';

import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';
import ClassroomsRepository from '@modules/classrooms/infra/typeorm/repositories/ClassroomsRepository';
import IClassroomsStudentsRepository from '@modules/classrooms/repositories/IClassroomsStudentsRepository';
import ClassroomsStudentsRepository from '@modules/classrooms/infra/typeorm/repositories/ClassroomsStudentsRepository';

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

container.registerSingleton<IClassroomsRepository>(
  'ClassroomsRepository',
  ClassroomsRepository,
);

container.registerSingleton<IClassroomsStudentsRepository>(
  'ClassroomsStudentsRepository',
  ClassroomsStudentsRepository,
);
