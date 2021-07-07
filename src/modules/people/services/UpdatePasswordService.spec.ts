import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakePeopleRepository from '../repositories/fakes/FakePeopleRepository';
import UpdatePasswordService from './UpdatePasswordService';

let fakePeopleRepository: FakePeopleRepository;
let updatePassword: UpdatePasswordService;
let fakeHashProvider: FakeHashProvider;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakePeopleRepository = new FakePeopleRepository();
    updatePassword = new UpdatePasswordService(
      fakePeopleRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the password', async () => {
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

    const updatedPassword = await updatePassword.execute({
      old_password: 'enrollment',
      password: 'new_password',
      password_confirmation: 'new_password',
      person_id: person.id,
    });

    expect(updatedPassword.password).toBe('new_password');
  });

  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updatePassword.execute({
        old_password: 'password',
        password: 'new_password',
        password_confirmation: 'new_password',
        person_id: 'non-existent-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with a wrong old password', async () => {
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

    await expect(
      updatePassword.execute({
        old_password: 'wrong-password',
        password: 'new_password',
        password_confirmation: 'new_password',
        person_id: person.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with a different password and password confirmation', async () => {
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

    await expect(
      updatePassword.execute({
        old_password: 'enrollment',
        password: 'new_password',
        password_confirmation: 'new_password2',
        person_id: person.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
