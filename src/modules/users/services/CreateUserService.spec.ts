import FakeInstitutionsRepository from '@modules/institutions/repositories/fakes/FakeInstitutionsRepository';
import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeInstitutionsRepository: FakeInstitutionsRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeInstitutionsRepository = new FakeInstitutionsRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeInstitutionsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const institution = await fakeInstitutionsRepository.create({
      director: 'diretor',
      learning_kind: 'tipo de ensino',
      name: 'name',
    });
    const user = await createUser.execute({
      username: 'usuario',
      password: 'password',
      passwordConfirmation: 'password',
      institution_id: institution.id,
      role: 'user',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user with default role', async () => {
    const institution = await fakeInstitutionsRepository.create({
      director: 'diretor',
      learning_kind: 'tipo de ensino',
      name: 'name',
    });
    const user = await createUser.execute({
      username: 'usuario',
      password: 'password',
      passwordConfirmation: 'password',
      institution_id: institution.id,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same username from another', async () => {
    await fakeUsersRepository.create({
      username: 'usuario',
      password: 'password',
      institution_id: 'instituition_id',
      role: 'user',
    });

    await expect(
      createUser.execute({
        username: 'usuario',
        password: 'password',
        passwordConfirmation: 'password',
        institution_id: 'instituition_id',
        role: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with institution inexistent', async () => {
    await expect(
      createUser.execute({
        username: 'usuario',
        password: 'password',
        passwordConfirmation: 'password',
        institution_id: 'instituition_id',
        role: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user if password and password confirmation does not match', async () => {
    const institution = await fakeInstitutionsRepository.create({
      director: 'diretor',
      learning_kind: 'tipo de ensino',
      name: 'name',
    });

    await expect(
      createUser.execute({
        username: 'usuario',
        password: 'password',
        passwordConfirmation: 'not-match',
        institution_id: institution.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
