import FakeInstitutionsRepository from '@modules/institutions/repositories/fakes/FakeInstitutionsRepository';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeTeachersRepository from '../repositories/fakes/FakeTeachersRepository';
import CreateTeacherService from './CreateTeacherService';

let fakeUsersRepository: FakeUsersRepository;
let fakeTeachersRepository: FakeTeachersRepository;
let fakeInstitutionsRepository: FakeInstitutionsRepository;
let fakeHashProvider: FakeHashProvider;
let createTeacher: CreateTeacherService;

describe('CreateTeacher', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeInstitutionsRepository = new FakeInstitutionsRepository();
    fakeTeachersRepository = new FakeTeachersRepository();
    fakeHashProvider = new FakeHashProvider();
    createTeacher = new CreateTeacherService(
      fakeTeachersRepository,
      fakeUsersRepository,
      fakeInstitutionsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new teacher', async () => {
    const institution = await fakeInstitutionsRepository.create({
      director: 'diretor',
      learning_kind: 'tipo de ensino',
      name: 'name',
    });
    const teacher = await createTeacher.execute({
      enrollment: 'enrollment',
      functional_situation: 'active',
      institution_id: institution.id,
      name: 'name',
      occupation: 'occupation',
      office: 'office',
    });

    expect(teacher).toHaveProperty('id');
  });

  it('should be able to create a new user when a teacher is created', async () => {
    const institution = await fakeInstitutionsRepository.create({
      director: 'diretor',
      learning_kind: 'tipo de ensino',
      name: 'name',
    });

    const teacher = await createTeacher.execute({
      enrollment: 'enrollment',
      functional_situation: 'active',
      institution_id: institution.id,
      name: 'name',
      occupation: 'occupation',
      office: 'office',
    });
    const hashedPassword = await fakeHashProvider.generateHash(
      teacher.enrollment,
    );
    const user = await fakeUsersRepository.create({
      institution_id: teacher.institution_id,
      password: hashedPassword,
      username: teacher.enrollment,
    });

    expect(teacher.enrollment).toEqual(user.password);
    expect(teacher.enrollment).toBe(user.username);
    expect(teacher.institution_id).toEqual(user.institution_id);
    expect(
      fakeHashProvider.compareHash(user.password, teacher.enrollment),
    ).toBeTruthy();
  });

  it('should not be able to create a new teacher with institution inexistent', async () => {
    await expect(
      createTeacher.execute({
        enrollment: 'enrollment',
        functional_situation: 'active',
        institution_id: 'inexistent_id',
        name: 'name',
        occupation: 'occupation',
        office: 'office',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new teacher with enrollment already in use', async () => {
    const institution = await fakeInstitutionsRepository.create({
      director: 'diretor',
      learning_kind: 'tipo de ensino',
      name: 'name',
    });

    await fakeTeachersRepository.create({
      enrollment: 'enrollment',
      functional_situation: 'active',
      institution_id: institution.id,
      name: 'name',
      occupation: 'occupation',
      office: 'office',
    });

    await expect(
      createTeacher.execute({
        enrollment: 'enrollment',
        functional_situation: 'active',
        institution_id: institution.id,
        name: 'name',
        occupation: 'occupation',
        office: 'office',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
