import FakeInstitutionsRepository from '@modules/institutions/repositories/fakes/FakeInstitutionsRepository';
import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakePeopleRepository from '../repositories/fakes/FakePeopleRepository';
import CreatePersonService from './CreatePersonService';

let fakePeopleRepository: FakePeopleRepository;
let fakeHashProvider: FakeHashProvider;
let fakeInstitutionsRepository: FakeInstitutionsRepository;
let createPerson: CreatePersonService;

describe('CreatePerson', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();
    fakeInstitutionsRepository = new FakeInstitutionsRepository();
    fakeHashProvider = new FakeHashProvider();
    createPerson = new CreatePersonService(
      fakePeopleRepository,
      fakeInstitutionsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new people', async () => {
    const institution = await fakeInstitutionsRepository.create({
      director: 'diretor',
      learning_kind: 'tipo de ensino',
      name: 'name',
    });
    const person = await createPerson.execute({
      password: 'enrollment',
      institution_id: institution.id,
      role: 'user',
      enrollment: 'enrollment',
      functional_situation: 'functional_situation',
      name: 'any_name',
      occupation: 'any_occupation',
      office: 'any_office',
      institution: institution.id,
    });

    expect(person).toHaveProperty('id');
  });

  it('should be able to create a new user with default role', async () => {
    const institution = await fakeInstitutionsRepository.create({
      director: 'diretor',
      learning_kind: 'tipo de ensino',
      name: 'name',
    });
    const person = await createPerson.execute({
      password: 'enrollment',
      institution_id: institution.id,
      enrollment: 'enrollment',
      functional_situation: 'functional_situation',
      name: 'any_name',
      occupation: 'any_occupation',
      office: 'any_office',
      institution: institution.id,
    });

    expect(person).toHaveProperty('id');
    expect(person.role).toBe('user');
  });

  it('should not be able to create a new person with same username from another', async () => {
    const institution = await fakeInstitutionsRepository.create({
      director: 'diretor',
      learning_kind: 'tipo de ensino',
      name: 'name',
    });
    await fakePeopleRepository.create({
      password: 'enrollment',
      institution_id: institution.id,
      enrollment: 'enrollment',
      functional_situation: 'functional_situation',
      name: 'any_name',
      occupation: 'any_occupation',
      office: 'any_office',
      username: 'enrollment',
      role: 'user',
    });

    await expect(
      createPerson.execute({
        password: 'enrollment',
        institution_id: 'instituition_id',
        enrollment: 'enrollment',
        functional_situation: 'functional_situation',
        name: 'any_name',
        occupation: 'any_occupation',
        office: 'any_office',
        institution: institution.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new person if institution id its different of user institution_id', async () => {
    const institution1 = await fakeInstitutionsRepository.create({
      director: 'diretor',
      learning_kind: 'tipo de ensino',
      name: 'name',
    });
    const institution2 = await fakeInstitutionsRepository.create({
      director: 'diretor',
      learning_kind: 'tipo de ensino',
      name: 'name',
    });

    await expect(
      createPerson.execute({
        password: 'enrollment',
        institution_id: institution1.id,
        enrollment: 'enrollment',
        functional_situation: 'functional_situation',
        name: 'any_name',
        occupation: 'any_occupation',
        office: 'any_office',
        institution: institution2.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new person with institution inexistent', async () => {
    await expect(
      createPerson.execute({
        password: 'enrollment',
        institution_id: 'instituition_id',
        enrollment: 'enrollment',
        functional_situation: 'functional_situation',
        name: 'any_name',
        occupation: 'any_occupation',
        office: 'any_office',
        institution: 'any_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
