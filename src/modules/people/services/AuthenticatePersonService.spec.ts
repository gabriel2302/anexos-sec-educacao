import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakePeopleRepository from '../repositories/fakes/FakePeopleRepository';
import AuthenticatePersonService from './AuthenticatePersonService';

let fakePeopleRepository: FakePeopleRepository;
let fakeHashProvider: FakeHashProvider;
let authenticatePerson: AuthenticatePersonService;

describe('AuthenticatePerson', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticatePerson = new AuthenticatePersonService(
      fakePeopleRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const person = await fakePeopleRepository.create({
      username: 'enrollment',
      password: 'enrollment',
      institution_id: 'instituition_id',
      role: 'user',
      enrollment: 'enrollment',
      functional_situation: 'functional_situation',
      name: 'any_name',
      occupation: 'any_occupation',
      office: 'any_office',
    });

    const response = await authenticatePerson.execute({
      username: 'enrollment',
      password: 'enrollment',
    });

    expect(response).toHaveProperty('token');
    expect(response.person).toEqual(person);
  });

  it('should not be able to authenticate with non existing person', async () => {
    await expect(
      authenticatePerson.execute({
        username: 'usuario2',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakePeopleRepository.create({
      username: 'enrollment',
      password: 'enrollment',
      institution_id: 'instituition_id',
      role: 'user',
      enrollment: 'enrollment',
      functional_situation: 'functional_situation',
      name: 'any_name',
      occupation: 'any_occupation',
      office: 'any_office',
    });

    await expect(
      authenticatePerson.execute({
        username: 'enrollment',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
