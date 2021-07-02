import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdatePasswordService from './UpdatePasswordService';

let fakeUsersRepository: FakeUsersRepository;
let updatePassword: UpdatePasswordService;
let fakeHashProvider: FakeHashProvider;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updatePassword = new UpdatePasswordService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      username: 'usuario',
      password: 'password',
      institution_id: 'instituition_id',
      role: 'user',
    });

    const updatedPassword = await updatePassword.execute({
      old_password: 'password',
      password: 'new_password',
      password_confirmation: 'new_password',
      user_id: user.id,
    });

    expect(updatedPassword.password).toBe('new_password');
  });

  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updatePassword.execute({
        old_password: 'password',
        password: 'new_password',
        password_confirmation: 'new_password',
        user_id: 'non-existent-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with a wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      username: 'usuario',
      password: 'password',
      institution_id: 'instituition_id',
      role: 'user',
    });

    await expect(
      updatePassword.execute({
        old_password: 'wrong-password',
        password: 'new_password',
        password_confirmation: 'new_password',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with a different password and password confirmation', async () => {
    const user = await fakeUsersRepository.create({
      username: 'usuario',
      password: 'password',
      institution_id: 'instituition_id',
      role: 'user',
    });

    await expect(
      updatePassword.execute({
        old_password: 'password',
        password: 'new_password',
        password_confirmation: 'new_password2',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
